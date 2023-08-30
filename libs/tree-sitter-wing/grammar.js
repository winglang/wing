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
  MEMBER: 150,
  CALL: 160,
};

module.exports = grammar({
  name: "wing",

  extras: ($) => [$.comment, /[\s\p{Zs}\uFEFF\u2060\u200B]/],

  word: ($) => $.identifier,

  externals: ($) => [$.AUTOMATIC_SEMICOLON, $.AUTOMATIC_BLOCK],

  precedences: ($) => [
    // Handle ambiguity in case of empty literal: `a = {}`
    // In this case tree-sitter doesn't know if it's a set or a map literal so just assume its a map
    [$.json_map_literal, $.map_literal, $.set_literal],
    [$.json_literal, $.structured_access_expression],
  ],

  conflicts: ($) => [
    [$._reference_identifier, $._type_identifier],
    [$.parameter_definition, $._reference_identifier]
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
          field("accessor_type", $._accessor),
          // While the "property" identifier is optional in this grammar, upstream parsing will fail if it is not present
          optional(field("property", $._member_identifier))
        )
      ),

    _accessor: ($) => choice(".", "?."),

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
        $.resource_definition,
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
        $.throw_statement,
      ),

    import_statement: ($) =>
      seq(
        "bring",
        field("module_name", choice($.identifier, $.string)),
        optional(seq("as", field("alias", $.identifier))),
        $._semicolon
      ),

    struct_definition: ($) =>
      seq(
        "struct",
        field("name", $.identifier),
        optional(seq("extends", commaSep(field("extends", $.custom_type)))),
        braced(repeat(field("field", $.struct_field)))
      ),
    struct_field: ($) =>
      seq(field("name", $.identifier), $._type_annotation, $._semicolon),

    enum_definition: ($) =>
      seq(
        "enum",
        field("enum_name", $.identifier),
        braced(commaSep(alias($.identifier, $.enum_field)))
      ),

    return_statement: ($) =>
      seq("return", optional(field("expression", $.expression)), $._semicolon),

    throw_statement: ($) =>
      seq("throw", optional(field("expression", $.expression)), $._semicolon),

    variable_assignment_statement: ($) =>
      seq(
        field("name", alias($.reference, $.lvalue)),
        "=",
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
    class_definition: ($) =>
      seq(
        $.inflight_specifier,
        "class",
        field("name", $.identifier),
        optional(seq("extends", field("parent", $.custom_type))),
        optional(seq("impl", field("implements", commaSep1($.custom_type)))),
        field("implementation", $.class_implementation)
      ),

    class_implementation: ($) =>
      braced(
        repeat(
          choice(
            $.initializer,
            $.method_definition,
            $.inflight_method_definition,
            $.class_field
          )
        )
      ),

    class_field: ($) =>
      seq(
        optional(field("access_modifier", $.access_modifier)),
        optional(field("static", $.static)),
        optional(field("phase_modifier", $.inflight_specifier)),
        optional(field("reassignable", $.reassignable)),
        field("name", $.identifier),
        $._type_annotation,
        optional(seq("=", field("initializer", $.expression))),
        $._semicolon
      ),

    resource_definition: ($) =>
      seq(
        "class",
        field("name", $.identifier),
        optional(seq("extends", field("parent", $.custom_type))),
        optional(seq("impl", field("implements", commaSep1($.custom_type)))),
        field("implementation", $.resource_implementation)
      ),
    resource_implementation: ($) =>
      braced(
        repeat(
          choice(
            $.initializer,
            $.method_definition,
            $.inflight_method_definition,
            $.class_field
          )
        )
      ),

    interface_definition: ($) =>
      seq(
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
    super_constructor_statement: ($) => seq($._super, field("args", $.argument_list), $._semicolon),

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
        repeat(field("elif_let_block", $.elif_let_block)),
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
        $.binary_expression,
        $.unary_expression,
        $.new_expression,
        $._literal,
        $.reference,
        $.call,
        $.preflight_closure,
        $.inflight_closure,
        $.await_expression,
        $.defer_expression,
        $._collection_literal,
        $.parenthesized_expression,
        $.json_literal,
        $.struct_literal,
        $.optional_test,
        $.compiler_dbg_panic,
      ),

    // Primitives
    _literal: ($) =>
      choice($.string, $.number, $.bool, $.duration, $.nil_value),

    number: ($) => choice($._integer, $._decimal),
    _integer: ($) => choice("0", /[1-9]\d*/),
    _decimal: ($) => choice(/0\.\d+/, /[1-9]\d*\.\d+/),

    bool: ($) => choice("true", "false"),

    duration: ($) => choice($.milliseconds, $.seconds, $.minutes, $.hours, $.days, $.months, $.years),
    milliseconds: ($) => seq(field("value", $.number), "ms"),
    seconds: ($) => seq(field("value", $.number), "s"),
    minutes: ($) => seq(field("value", $.number), "m"),
    hours: ($) => seq(field("value", $.number), "h"),
    days: ($) => seq(field("value", $.number), "d"),
    months: ($) => seq(field("value", $.number), "mo"),
    years: ($) => seq(field("value", $.number), "y"),
    nil_value: ($) => "nil",
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
    template_substitution: ($) => seq("${", $.expression, "}"),
    _string_fragment: ($) => token.immediate(prec(1, /[^$"\\]+/)),
    _escape_sequence: ($) =>
      token.immediate(
        seq(
          "\\",
          choice(
            "$",
            /[^xu0-7]/,
            /[0-7]{1,3}/,
            /x[0-9a-fA-F]{2}/,
            /u[0-9a-fA-F]{4}/,
            /u{[0-9a-fA-F]+}/
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
        seq(field("caller", choice($.expression, $.super_call)), field("args", $.argument_list))
      ),

    super_call: ($) => seq($._super, ".", field("method", $.identifier)),

    argument_list: ($) =>
      seq(
        "(",
        choice(
          commaSep($.positional_argument),
          commaSep($.keyword_argument),
          seq(
            commaSep($.positional_argument),
            ",",
            commaSep($.keyword_argument)
          )
        ),
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
          optional(seq("in", field("scope", $.expression))),
        )
      ),

    _type: ($) =>
      choice(
        $.custom_type,
        $.builtin_type,
        $._builtin_container_type,
        $.json_container_type,
        $.function_type,
        $.optional
      ),

    optional: ($) => seq($._type, "?"),

    function_type: ($) =>
      prec.right(
        seq(
          optional(field("inflight", $.inflight_specifier)),
          field("parameter_types", $.parameter_type_list),
          optional(seq(":", field("return_type", $._type)))
        )
      ),

    parameter_type_list: ($) => seq("(", commaSep($._type), ")"),

    builtin_type: ($) =>
      choice("num", "bool", "any", "str", "void", "duration"),

    initializer: ($) =>
      seq(
        optional(field("inflight", $.inflight_specifier)),
        "init",
        field("parameter_list", $.parameter_list),
        field("block", $.block)
      ),

    extern_modifier: ($) => seq("extern", $.string),

    _return_type: ($) => $._type_annotation,

    method_signature: ($) =>
      seq(
        optional(field("async", $.async_modifier)),
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        $._semicolon
      ),

    method_definition: ($) =>
      seq(
        optional(field("extern_modifier", $.extern_modifier)),
        optional(field("access_modifier", $.access_modifier)),
        optional(field("static", $.static)),
        optional(field("async", $.async_modifier)),
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

    inflight_method_definition: ($) =>
      seq(
        optional(field("extern_modifier", $.extern_modifier)),
        optional(field("access_modifier", $.access_modifier)),
        optional(field("static", $.static)),
        field("phase_modifier", $.inflight_specifier),
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        choice(field("block", $.block), $._semicolon)
      ),

    async_modifier: ($) => "async",

    access_modifier: ($) => choice("public", "private", "protected"),

    variadic: ($) => "...",

    parameter_definition: ($) =>
      seq(
        optional(field("reassignable", $.reassignable)),
        optional(field("variadic", $.variadic)),
        field("name", $.identifier),
        optional($._type_annotation),
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
        ["??", PREC.UNWRAP_OR],
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

    preflight_closure: ($) =>
      seq(
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        "=>",
        field("block", $.block)
      ),

    inflight_closure: ($) =>
      seq(
        $.inflight_specifier,
        field("parameter_list", $.parameter_list),
        optional($._return_type),
        "=>",
        field("block", $.block)
      ),

    await_expression: ($) => prec.right(seq("await", $.expression)),
    defer_expression: ($) => prec.right(seq("defer", $.expression)),
    parenthesized_expression: ($) => seq("(", $.expression, ")"),

    _collection_literal: ($) =>
      choice($.array_literal, $.set_literal, $.map_literal),
    array_literal: ($) =>
      seq(
        optional(field("type", $._builtin_container_type)),
        "[",
        commaSep(field("element", $.expression)),
        "]"
      ),
    set_literal: ($) =>
      seq(
        optional(field("type", $._builtin_container_type)),
        braced(commaSep(field("element", $.expression)))
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

    map_literal_member: ($) =>
      seq(choice($.string), "=>", $.expression),
    struct_literal_member: ($) => seq($.identifier, ":", $.expression),
    structured_access_expression: ($) =>
      prec.right(seq($.expression, "[", $.expression, "]")),

    json_literal: ($) =>
      choice(
        seq(field("type", $.json_container_type), field("element", $.expression)),
        field("element", $.json_map_literal)
      ),

    json_map_literal: ($) => braced(commaSep(field("member", $.json_literal_member))),
    json_literal_member: ($) => seq(choice($.identifier, $.string), ":", $.expression),

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
  return choice(seq("{", rule, "}"));
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
