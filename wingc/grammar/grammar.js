const PREC = {
  LOGICAL_OR: 1,
  LOGICAL_AND: 2,
  INCLUSIVE_OR: 3,
  EXCLUSIVE_OR: 4,
  BITWISE_AND: 5,
  EQUAL: 6,
  RELATIONAL: 7,
  SHIFT: 8,
  ADD: 9,
  MULTIPLY: 10,
  UNARY: 11,
  NIL_COALESCING: 12,
};

module.exports = grammar({
  name: "winglang",

  extras: ($) => [$.comment, /[\s\p{Zs}\uFEFF\u2060\u200B]/],

  word: ($) => $.identifier,

  precedences: ($) => [
    [$.builtin_type, $.identifier],
    [$.field_nested_identifier, $.nested_identifier, $.reference],
    [$.map_literal, $.set_literal],
    [$.new_expression, $.function_call],
    [$.nested_identifier, $.method_call, $.reference],
  ],

  supertypes: ($) => [$.expression, $._literal],

  rules: {
    // Basics
    source: ($) => repeat($._statement),
    block: ($) => seq("{", optional(repeat($._statement)), "}"),
    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"))
      ),

    // Identifiers
    reference: ($) =>
      choice($.identifier, $.nested_identifier),

    identifier: ($) => /([A-Za-z_$][A-Za-z_$0-9]*|[A-Z][A-Z0-9_]*)/,

    field_nested_identifier: ($) =>
      prec.right(seq(
        field("object", $.identifier),
        repeat(seq(".", field("fields", $.identifier)))
      )),
    
    nested_identifier: ($) =>
      seq(
        field("object", $.expression),
        choice(".", "?."),
        field("property", $.identifier)
      ),

    _inflight_specifier: ($) => choice("inflight", "~"),

    _statement: ($) =>
      choice(
        $.short_import_statement,
        $.expression_statement,
        $.variable_definition_statement,
        $.variable_assignment_statement,
        $.return_statement,
        $.class_definition,
        $.resource_definition,
        $.for_in_loop,
        $.if_statement,
        $.struct_definition,
        // TODO Remove free functions whenever possible
        $.inflight_function_definition
      ),

    short_import_statement: ($) =>
      seq(
        "bring",
        field("module_name", choice($.identifier, $.string)),
        optional(seq("as", field("alias", $.identifier))),
        ";"
      ),

    struct_definition: ($) =>
      seq(
        "struct",
        field("name", $.identifier),
        optional(seq("extends", commaSep($.identifier))),
        "{",
        repeat($.struct_field),
        "}"
      ),
    struct_field: ($) =>
      seq(field("name", $.identifier), $._type_annotation, ";"),

    return_statement: ($) =>
      seq("return", optional(field("expression", $.expression)), ";"),

    variable_assignment_statement: ($) =>
      seq(field("name", $.reference), "=", field("value", $.expression), ";"),

    expression_statement: ($) => seq($.expression, ";"),

    variable_definition_statement: ($) =>
      seq(
        "let",
        field("name", $.identifier),
        optional($._type_annotation),
        "=",
        field("value", $.expression),
        ";"
      ),

    _type_annotation: ($) => seq(":", field("type", $._type)),

    // Classes
    class_definition: ($) =>
      seq(
        "class",
        field("name", $.identifier),
        optional(seq("extends", field("parent", $.identifier))),
        field("implementation", $.class_implementation)
      ),
    class_implementation: ($) =>
      seq(
        "{",
        repeat(
          choice(
            $.constructor,
            $.function_definition,
            $.inflight_function_definition,
            $.class_member,
            $.inflight_class_member
          )
        ),
        "}"
      ),
    class_member: ($) =>
      seq(
        optional(field("access_modifier", $.access_modifier)),
        field("name", $.identifier),
        $._type_annotation,
        ";"
      ),
    inflight_class_member: ($) =>
      seq(
        field("phase_modifier", $._inflight_specifier),
        optional(field("access_modifier", $.access_modifier)),
        field("name", $.identifier),
        $._type_annotation,
        ";"
      ),

    resource_definition: ($) =>
      seq(
        "resource",
        field("name", $.identifier),
        optional(seq("extends", field("parent", $.identifier))),
        field("implementation", $.resource_implementation)
      ),
    resource_implementation: ($) =>
      seq(
        "{",
        repeat(
          choice(
            $.constructor,
            $.function_definition,
            $.inflight_function_definition,
            $.class_member,
            $.inflight_class_member
          )
        ),
        "}"
      ),

    for_in_loop: ($) =>
      seq(
        "for",
        field("iterator", $.reference),
        "in",
        field("iterable", $.expression),
        field("block", $.block)
      ),

    if_statement: ($) =>
      seq(
        "if",
        field("condition", $.expression),
        field("block", $.block),
        optional(seq("else", field("else_block", $.block)))
      ),

    expression: ($) =>
      choice(
        $.binary_expression,
        $.unary_expression,
        $.new_expression,
        $._literal,
        $.reference,
        $.function_call,
        $.method_call,
        $.preflight_closure,
        $.inflight_closure,
        $.pure_closure,
        $.await_expression,
        $._collection_literal,
        $.parenthesized_expression,
        $.structured_access_expression
      ),

    // Primitives
    _literal: ($) => choice($.string, $.number, $.bool, $.duration),

    // TODO: Handle leading zeros
    number: ($) => /\d+/,

    bool: ($) => choice("true", "false"),

    duration: ($) => choice($.seconds, $.minutes, $.hours),
    seconds: ($) => seq(field("value", $.number), "s"),
    minutes: ($) => seq(field("value", $.number), "m"),
    hours: ($) => seq(field("value", $.number), "h"),

    string: ($) =>
      seq(
        '"',
        repeat(
          choice(
            $._template_string_fragment,
            $._escape_sequence,
            $.template_substitution
          )
        ),
        '"'
      ),
    _template_string_fragment: ($) => token.immediate(prec(1, /[^$"\\]+/)),
    template_substitution: ($) => seq("${", $.expression, "}"),
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

    function_call: ($) =>
      seq(field("call_name", $.reference), field("args", $.argument_list)),

    method_call: ($) =>
      seq(
        field("call_name", $.nested_identifier),
        field("args", $.argument_list)
      ),

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
      seq(
        "new",
        field("class", choice($.field_nested_identifier, $.builtin_container_type)),
        field("args", $.argument_list),
        field("id", optional($.new_object_id)),
        field("scope", optional($.new_object_scope))
      ),

    new_object_id: ($) => seq("as", $.string),

    new_object_scope: ($) => prec.right(seq("in", $.expression)),

    _type: ($) =>
      choice(
        seq($.field_nested_identifier, optional("?")),
        seq($.builtin_type, optional("?")),
        seq($.builtin_container_type, optional("?")),
        $.function_type
      ),

    function_type: ($) =>
      prec.right(
        seq(
          optional(field("inflight", $._inflight_specifier)),
          field("parameter_types", $.parameter_type_list),
          optional(seq("->", field("return_type", $._type)))
        )
      ),

    parameter_type_list: ($) => seq("(", commaSep($._type), ")"),

    builtin_type: ($) => choice("num", "nil", "bool", "any", "str", "void"),

    constructor: ($) =>
      seq(
        "init",
        field("parameter_list", $.parameter_list),
        field("block", $.block)
      ),

    function_definition: ($) =>
      seq(
        optional(field("access_modifier", $.access_modifier)),
        optional("async"),
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional(field("return_type", $._type_annotation)),
        field("block", $.block)
      ),

    inflight_function_definition: ($) =>
      seq(
        field("phase_modifier", $._inflight_specifier),
        optional(field("access_modifier", $.access_modifier)),
        optional("async"),
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        field("block", $.block)
      ),

    access_modifier: ($) => choice("public", "private", "protected"),

    parameter_definition: ($) =>
      seq(field("name", $.identifier), $._type_annotation),

    parameter_list: ($) => seq("(", commaSep($.parameter_definition), ")"),

    builtin_container_type: ($) =>
      seq(
        field(
          "collection_type",
          choice(
            "Set",
            "Map",
            "Array",
            "MutSet",
            "MutMap",
            "MutArray",
            "Promise"
          )
        ),
        "<",
        field("type_parameter", $._type),
        ">"
      ),

    unary_expression: ($) =>
      choice(
        ...[
          ["+", PREC.UNARY],
          ["-", PREC.UNARY],
          ["!", PREC.UNARY],
          //['~', PREC.UNARY],
        ].map(([operator, precedence]) =>
          prec.left(
            precedence,
            seq(field("op", operator), field("arg", $.expression))
          )
        )
      ),

    binary_expression: ($) => {
      const table = [
        ["+", PREC.ADD],
        ["-", PREC.ADD],
        ["*", PREC.MULTIPLY],
        ["/", PREC.MULTIPLY],
        ["%", PREC.MULTIPLY],
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
        ["??", PREC.NIL_COALESCING],
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

    preflight_closure: ($) => anonymousClosure($, "->"),
    inflight_closure: ($) => anonymousClosure($, "~>"),
    pure_closure: ($) => anonymousClosure($, "=>"),

    await_expression: ($) => prec.right(seq("await", $.expression)),
    parenthesized_expression: ($) => seq("(", $.expression, ")"),

    _collection_literal: ($) =>
      choice($.array_literal, $.set_literal, $.map_literal),
    array_literal: ($) => seq("[", commaSep($.expression), "]"),
    set_literal: ($) => seq("{", commaSep($.expression), "}"),
    map_literal: ($) => seq("{", commaSep($.map_literal_member), "}"),

    map_literal_member: ($) =>
      seq(choice($.identifier, $.string), ":", $.expression),
    structured_access_expression: ($) =>
      prec.right(seq($.expression, "[", $.expression, "]")),
  },
});

function anonymousClosure($, arrow) {
  return seq(
    optional("async"),
    field("parameter_list", $.parameter_list),
    optional(field("return_type", $._type_annotation)),
    arrow,
    field("block", $.block)
  );
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)), optional(","));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}
