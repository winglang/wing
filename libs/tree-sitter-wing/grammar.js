const PREC = {
  LOGICAL_OR: 10,
  LOGICAL_AND: 20,
  INCLUSIVE_OR: 30,
  EXCLUSIVE_OR: 40,
  BITWISE_AND: 50,
  EQUAL: 60,
  RELATIONAL: 70,
  UNWRAP_OR: 80,
  SHIFT: 90,
  ADD: 100,
  MULTIPLY: 110,
  UNARY: 120,
  OPTIONAL_TEST: 130,
  POWER: 140,
  STRUCTURED_ACCESS: 150, // x[y]
  MEMBER: 160,
  CALL: 170,
  OPTIONAL_UNWRAP: 180,
};

module.exports = grammar({
  name: "wing",

  extras: ($) => [$.comment, /[\s\p{Zs}\uFEFF\u2060\u200B]/],

  word: ($) => $.identifier,

  externals: ($) => [$.AUTOMATIC_SEMICOLON, $.AUTOMATIC_BLOCK],

  precedences: ($) => [
    // Handle ambiguity in case of empty literal: `a = {}`
    // In this case tree-sitter doesn't know if it's a set or a map literal so just assume its a map
    [$.json_map_literal, $.map_literal, $.array_literal],
    [$.json_literal, $.structured_access_expression],
    [$.intrinsic, $.call],
  ],

  conflicts: ($) => [
    [$._reference_identifier, $._type_identifier],
    [$.parameter_definition, $._reference_identifier],

    // These modifier conflicts should be solved through GLR parsing
    [$.field_modifiers, $.method_modifiers],
    [$.class_modifiers, $.closure_modifiers, $.interface_modifiers],
    [$.inflight_method_signature, $.field_modifiers],
  ],

  supertypes: ($) => [$.expression, $._literal],

  rules: {
    // Basics
    source: ($) => repeat($._statement),
    block: ($) =>
      choice(braced(optional(repeat($._statement))), $.AUTOMATIC_BLOCK),
    _semicolon: ($) => choice(";", $.AUTOMATIC_SEMICOLON),
    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"))
      ),

    // Identifiers
    reference: ($) =>
      choice(
        $.nested_identifier,
        $._reference_identifier,
        $.structured_access_expression
      ),

    identifier: ($) => /([A-Za-z_$][A-Za-z_$0-9]*|[A-Z][A-Z0-9_]*)/,
    _type_identifier: ($) => alias($.identifier, $.type_identifier),
    _member_identifier: ($) => alias($.identifier, $.member_identifier),
    _reference_identifier: ($) => alias($.identifier, $.reference_identifier),

    custom_type: ($) =>
      prec.right(
        seq(
          field("object", $._type_identifier),
          // While the final "fields" identifier is optional in this grammar, upstream parsing will fail if it is not present
          repeat(seq(".", optional(field("fields", $._type_identifier))))
        )
      ),

    nested_identifier: ($) =>
      prec(
        PREC.MEMBER,
        seq(
          field(
            "object",
            choice(
              $.expression,
              // This is required because of ambiguity with using Json keyword for both instantiation of Json
              // and Identifier for static methods.
              $.json_container_type
            )
          ),
          field("accessor_type", $.accessor),
          // While the "property" identifier is optional in this grammar, upstream parsing will fail if it is not present
          optional(field("property", $._member_identifier))
        )
      ),

    accessor: ($) => choice(".", "?."),

    inflight_specifier: ($) => "inflight",

    _statement: ($) =>
      choice(
        $.test_statement,
        $.import_statement,
        $.expression_statement,
        $.variable_definition_statement,
        $.variable_assignment_statement,
        $.return_statement,
        $.class_definition,
        $.interface_definition,
        $.for_in_loop,
        $.while_statement,
        $.break_statement,
        $.continue_statement,
        $.if_statement,
        $.if_let_statement,
        $.struct_definition,
        $.enum_definition,
        $.try_catch_statement,
        $.compiler_dbg_env,
        $.super_constructor_statement,
        $.throw_statement
      ),

    import_statement: ($) =>
      seq(
        "bring",
        optional(field("module_name", choice($.identifier, $.string))),
        optional(seq("as", field("alias", $.identifier))),
        $._semicolon
      ),

    struct_definition: ($) =>
      seq(
        optional(field("access_modifier", $.access_modifier)),
        "struct",
        field("name", $.identifier),
        optional(seq("extends", commaSep(field("extends", $.custom_type)))),
        braced(repeat(field("field", $.struct_field)))
      ),
    struct_field: ($) =>
      seq(field("name", $.identifier), $._type_annotation, $._semicolon),

    enum_definition: ($) =>
      seq(
        optional(field("access_modifier", $.access_modifier)),
        "enum",
        field("enum_name", $.identifier),
        braced(commaSep(alias($.identifier, $.enum_field)))
      ),

    return_statement: ($) =>
      seq("return", optional(field("expression", $.expression)), $._semicolon),

    throw_statement: ($) =>
      seq("throw", optional(field("expression", $.expression)), $._semicolon),

    assignment_operator: ($) => choice("=", "+=", "-="),

    variable_assignment_statement: ($) =>
      seq(
        field("name", alias($.reference, $.lvalue)),
        field("operator", $.assignment_operator),
        field("value", $.expression),
        $._semicolon
      ),

    expression_statement: ($) => seq($.expression, $._semicolon),

    reassignable: ($) => "var",

    static: ($) => "static",

    variable_definition_statement: ($) =>
      seq(
        "let",
        optional(field("reassignable", $.reassignable)),
        field("name", $.identifier),
        optional($._type_annotation),
        "=",
        field("value", $.expression),
        $._semicolon
      ),

    _type_annotation: ($) => seq(":", field("type", $._type)),

    // Classes

    class_modifiers: ($) =>
      repeat1(choice($.access_modifier, $.inflight_specifier)),

    class_definition: ($) =>
      seq(
        optional(field("modifiers", $.class_modifiers)),
        "class",
        field("name", $.identifier),
        optional(seq("extends", field("parent", $.custom_type))),
        optional(seq("impl", field("implements", commaSep1($.custom_type)))),
        field("implementation", $.class_implementation)
      ),

    class_implementation: ($) =>
      braced(repeat(choice($.initializer, $.method_definition, $.class_field))),

    field_modifiers: ($) =>
      repeat1(
        choice(
          $.access_modifier,
          $.static,
          $.inflight_specifier,
          $.reassignable
        )
      ),

    class_field: ($) =>
      seq(
        optional(field("modifiers", $.field_modifiers)),
        field("name", $.identifier),
        $._type_annotation,
        optional(seq("=", field("initializer", $.expression))),
        $._semicolon
      ),

    /// Interfaces

    interface_modifiers: ($) =>
      repeat1(choice($.access_modifier, $.inflight_specifier)),

    interface_definition: ($) =>
      seq(
        optional(field("modifiers", $.interface_modifiers)),
        "interface",
        field("name", $.identifier),
        optional(seq("extends", field("extends", commaSep1($.custom_type)))),
        field("implementation", $.interface_implementation)
      ),

    interface_implementation: ($) =>
      braced(
        repeat(
          choice($.method_signature, $.inflight_method_signature, $.class_field)
        )
      ),

    inclusive_range: ($) => "=",

    loop_range: ($) =>
      seq(
        field("start", $.expression),
        "..",
        optional(field("inclusive", $.inclusive_range)),
        field("end", $.expression)
      ),

    for_in_loop: ($) =>
      seq(
        "for",
        field("iterator", $.identifier),
        "in",
        field("iterable", choice($.expression, $.loop_range)),
        field("block", $.block)
      ),

    while_statement: ($) =>
      seq("while", field("condition", $.expression), field("block", $.block)),

    break_statement: ($) => seq("break", $._semicolon),
    _super: ($) => "super",
    super_constructor_statement: ($) =>
      seq($._super, field("args", $.argument_list), $._semicolon),

    continue_statement: ($) => seq("continue", $._semicolon),

    if_let_statement: ($) =>
      seq(
        "if",
        "let",
        optional(field("reassignable", $.reassignable)),
        field("name", $.identifier),
        "=",
        field("value", $.expression),
        field("block", $.block),
        repeat(
          choice(
            field("elif_let_block", $.elif_let_block),
            field("elif_block", $.elif_block)
          )
        ),
        optional(seq("else", field("else_block", $.block)))
      ),

    elif_let_block: ($) =>
      seq(
        "elif",
        "let",
        optional(field("reassignable", $.reassignable)),
        field("name", $.identifier),
        "=",
        field("value", $.expression),
        field("block", $.block)
      ),

    if_statement: ($) =>
      seq(
        "if",
        field("condition", $.expression),
        field("block", $.block),
        repeat(field("elif_block", $.elif_block)),
        optional(seq("else", field("else_block", $.block)))
      ),

    elif_block: ($) =>
      seq("elif", field("condition", $.expression), field("block", $.block)),

    try_catch_statement: ($) =>
      seq(
        "try",
        field("block", $.block),
        optional(
          seq(
            "catch",
            optional(field("exception_identifier", $.identifier)),
            field("catch_block", $.block)
          )
        ),
        optional(seq("finally", field("finally_block", $.block)))
      ),

    expression: ($) =>
      choice(
        $.unwrap_or,
        $.binary_expression,
        $.unary_expression,
        $.new_expression,
        $._literal,
        $.reference,
        $.call,
        $.closure,
        $.await_expression,
        $.defer_expression,
        $._collection_literal,
        $.parenthesized_expression,
        $.json_literal,
        $.struct_literal,
        $.optional_test,
        $.compiler_dbg_panic,
        $.optional_unwrap,
        $.intrinsic
      ),

    intrinsic: ($) =>
      prec.right(
        seq(
          field("name", $.intrinsic_identifier),
          optional(field("args", $.argument_list))
        )
      ),
    intrinsic_identifier: ($) => /@[A-Za-z_$0-9]*/,

    // Primitives
    _literal: ($) =>
      choice(
        $.string,
        $.non_interpolated_string,
        $.number,
        $.bool,
        $.duration,
        $.nil_value
      ),

    number: ($) => choice($._integer, $._decimal),
    _integer: ($) => /\d[\d_]*/,
    _decimal: ($) => /\d[\d_]*\.\d[\d_]*/,

    bool: ($) => choice("true", "false"),

    duration: ($) =>
      choice(
        $.milliseconds,
        $.seconds,
        $.minutes,
        $.hours,
        $.days,
        $.months,
        $.years
      ),
    milliseconds: ($) => seq(field("value", $.number), "ms"),
    seconds: ($) => seq(field("value", $.number), "s"),
    minutes: ($) => seq(field("value", $.number), "m"),
    hours: ($) => seq(field("value", $.number), "h"),
    days: ($) => seq(field("value", $.number), "d"),
    months: ($) => seq(field("value", $.number), "mo"),
    years: ($) => seq(field("value", $.number), "y"),
    nil_value: ($) => "nil",
    non_interpolated_string: ($) =>
      seq(
        '#"',
        repeat(choice($._non_interpolated_string_fragment, $._escape_sequence)),
        '"'
      ),
    string: ($) =>
      seq(
        '"',
        repeat(
          choice(
            $._string_fragment,
            $._escape_sequence,
            $.template_substitution
          )
        ),
        '"'
      ),
    template_substitution: ($) => seq("{", $.expression, "}"),
    _string_fragment: ($) => token.immediate(prec(1, /[^{"\\]+/)),
    _non_interpolated_string_fragment: ($) =>
      token.immediate(prec(1, /[^"\\]+/)),
    _escape_sequence: ($) =>
      token.immediate(
        seq(
          "\\",
          choice(
            "{",
            /[^xu0-7]/,
            /[0-7]{1,3}/,
            /x[0-9a-fA-F]{2}/,
            /u[0-9a-fA-F]{4}/,
            /u\{[0-9a-fA-F]+\}/
          )
        )
      ),

    optional_test: ($) =>
      prec.right(PREC.OPTIONAL_TEST, seq($.expression, "?")),

    compiler_dbg_panic: ($) => "😱",
    compiler_dbg_env: ($) => seq("🗺️", optional(";")),

    call: ($) =>
      prec.left(
        PREC.CALL,
        seq(
          field("caller", choice($.expression, $.super_call)),
          field("args", $.argument_list)
        )
      ),

    super_call: ($) => seq($._super, ".", field("method", $.identifier)),

    argument_list: ($) =>
      seq(
        "(",
        commaSep(choice($.positional_argument, $.keyword_argument)),
        ")"
      ),

    positional_argument: ($) => $.expression,

    keyword_argument: ($) =>
      prec(
        3,
        seq(
          alias($.identifier, $.keyword_argument_key),
          ":",
          alias($.expression, $.keyword_argument_value)
        )
      ),

    new_expression: ($) =>
      prec.right(
        seq(
          "new",
          field("class", choice($.custom_type, $.mutable_container_type)),
          // While "args" is optional in this grammar, upstream parsing will fail if it is not present
          field("args", optional($.argument_list)),
          optional(seq("as", field("id", $.expression))),
          optional(seq("in", field("scope", $.expression)))
        )
      ),

    _type: ($) =>
      choice(
        $.custom_type,
        $.builtin_type,
        $._builtin_container_type,
        $.json_container_type,
        $.function_type,
        $.optional,
        $._parenthesized_type
      ),

    _parenthesized_type: ($) => seq("(", $._type, ")"),

    optional: ($) => seq($._type, "?"),

    function_type: ($) =>
      prec.right(
        seq(
          optional(field("inflight", $.inflight_specifier)),
          field("parameter_types", $.parameter_type_list),
          seq(":", field("return_type", $._type))
        )
      ),

    parameter_type_list: ($) => seq("(", commaSep($._type), ")"),

    builtin_type: ($) =>
      choice("num", "bool", "any", "str", "void", "duration"),

    initializer: ($) =>
      seq(
        optional(field("inflight", $.inflight_specifier)),
        "new",
        field("parameter_list", $.parameter_list),
        field("block", $.block)
      ),

    extern_modifier: ($) => seq("extern", $.string),

    _return_type: ($) => $._type_annotation,

    method_signature: ($) =>
      seq(
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        $._semicolon
      ),

    method_modifiers: ($) =>
      repeat1(
        choice(
          $.extern_modifier,
          $.access_modifier,
          $.static,
          $.inflight_specifier
        )
      ),

    method_definition: ($) =>
      seq(
        optional(field("modifiers", $.method_modifiers)),
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        choice(field("block", $.block), $._semicolon)
      ),

    inflight_method_signature: ($) =>
      seq(
        field("phase_modifier", $.inflight_specifier),
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        $._semicolon
      ),

    access_modifier: ($) => choice("pub", "protected", "internal"),

    variadic: ($) => "...",

    parameter_definition: ($) =>
      seq(
        optional(field("reassignable", $.reassignable)),
        optional(field("variadic", $.variadic)),
        field("name", $.identifier),
        optional($._type_annotation)
      ),

    parameter_list: ($) => seq("(", commaSep($.parameter_definition), ")"),

    immutable_container_type: ($) =>
      seq(
        field("collection_type", choice("Array", "Set", "Map", "Promise")),
        $._container_value_type
      ),

    mutable_container_type: ($) =>
      choice(
        seq(
          field("collection_type", choice("MutSet", "MutMap", "MutArray")),
          $._container_value_type
        )
      ),

    _builtin_container_type: ($) =>
      choice($.immutable_container_type, $.mutable_container_type),

    _container_value_type: ($) =>
      seq("<", field("type_parameter", $._type), ">"),

    unwrap_or: ($) =>
      prec.right(
        PREC.UNWRAP_OR,
        seq(
          field("left", $.expression),
          field("op", "??"),
          field("right", $.expression)
        )
      ),

    optional_unwrap: ($) =>
      prec.right(PREC.OPTIONAL_UNWRAP, seq($.expression, "!")),

    unary_expression: ($) => {
      /** @type {Array<[RuleOrLiteral, number]>} */
      const table = [
        // -- is invalid but we'll let the compiler catch it to not mistake it for multiple `-`s
        ["--", PREC.UNARY],
        ["-", PREC.UNARY],
        ["!", PREC.UNARY],
      ];

      return choice(
        ...table.map(([operator, precedence]) =>
          prec.left(
            precedence,
            seq(field("op", operator), field("arg", $.expression))
          )
        )
      );
    },

    binary_expression: ($) => {
      /** @type {Array<[RuleOrLiteral, number]>} */
      const table = [
        ["+", PREC.ADD],
        ["-", PREC.ADD],
        ["*", PREC.MULTIPLY],
        ["/", PREC.MULTIPLY],
        ["\\", PREC.MULTIPLY],
        ["%", PREC.MULTIPLY],
        ["**", PREC.POWER],
        ["||", PREC.LOGICAL_OR],
        ["&&", PREC.LOGICAL_AND],
        //['|', PREC.INCLUSIVE_OR],
        //['^', PREC.EXCLUSIVE_OR],
        //['&', PREC.BITWISE_AND],
        ["==", PREC.EQUAL],
        ["!=", PREC.EQUAL],
        [">", PREC.RELATIONAL],
        [">=", PREC.RELATIONAL],
        ["<=", PREC.RELATIONAL],
        ["<", PREC.RELATIONAL],
        //['<<', PREC.SHIFT],
        //['>>', PREC.SHIFT],
        //['>>>', PREC.SHIFT],
      ];

      return choice(
        ...table.map(([operator, precedence]) => {
          return prec.left(
            precedence,
            seq(
              field("left", $.expression),
              field("op", operator),
              field("right", $.expression)
            )
          );
        })
      );
    },

    closure_modifiers: ($) => repeat1(choice($.inflight_specifier)),

    closure: ($) =>
      seq(
        optional(field("modifiers", $.closure_modifiers)),
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        "=>",
        field("block", $.block)
      ),

    await_expression: ($) => prec.right(seq("await", $.expression)),
    defer_expression: ($) => prec.right(seq("defer", $.expression)),
    parenthesized_expression: ($) => seq("(", $.expression, ")"),

    _collection_literal: ($) => choice($.array_literal, $.map_literal),
    array_literal: ($) =>
      seq(
        optional(field("type", $._builtin_container_type)),
        bracketed(commaSep(field("element", $.expression)))
      ),
    map_literal: ($) =>
      seq(
        optional(field("type", $._builtin_container_type)),
        braced(commaSep(field("member", $.map_literal_member)))
      ),
    struct_literal: ($) =>
      seq(
        field("type", $.custom_type),
        braced(commaSep(field("fields", $.struct_literal_member)))
      ),

    map_literal_member: ($) => seq($.expression, "=>", $.expression),
    struct_literal_member: ($) => seq($.identifier, ":", $.expression),
    structured_access_expression: ($) =>
      prec.right(
        PREC.STRUCTURED_ACCESS,
        seq($.expression, "[", $.expression, "]")
      ),

    json_literal: ($) =>
      choice(
        seq(
          field("type", $.json_container_type),
          field("element", $.expression)
        ),
        field("element", $.json_map_literal)
      ),

    json_map_literal: ($) =>
      braced(commaSep(field("member", $.json_literal_member))),
    json_literal_member: ($) =>
      seq(choice($.identifier, $.string), ":", $.expression),

    json_container_type: ($) => $._json_types,

    _json_types: ($) => choice("Json", "MutJson"),

    test_statement: ($) =>
      seq("test", field("name", $.string), field("block", $.block)),
  },
});

/**
 * @param {Rule} rule
 */
function braced(rule) {
  return seq("{", rule, "}");
}

/*
 * @param {Rule} rule
 */
function bracketed(rule) {
  return seq("[", rule, "]");
}

/**
 * @param {Rule} rule
 */
function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)), optional(","));
}

/**
 * @param {Rule} rule
 */
function commaSep(rule) {
  return optional(commaSep1(rule));
}
