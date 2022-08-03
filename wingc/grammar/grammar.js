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
};

module.exports = grammar({
  name: "winglang",

  extras: ($) => [$.comment, /[\s\p{Zs}\uFEFF\u2060\u200B]/],

  word: ($) => $.identifier,

  precedences: ($) => [
    [$.nested_identifier, $.namespaced_identifier, $.method_call, $.reference]
  ],

  supertypes: ($) => [$.expression, $._type, $._literal],

  rules: {
    // Basics
    source: ($) => repeat($._statement),
    block: ($) => seq("{", repeat($._statement), "}"),
    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/"))
      ),

    // Identifiers
    reference: ($) =>
      choice($.identifier, $.namespaced_identifier, $.nested_identifier),

    identifier: ($) => /([A-Za-z_$][A-Za-z_$0-9]*|[A-Z][A-Z0-9_]*)/,

    namespaced_identifier: ($) =>
      seq(field("namespace", $.identifier), "::", field("name", choice($.identifier, $.nested_identifier))),

    nested_identifier: ($) =>
      seq(field("object", $.expression), ".", field("property", $.identifier)),

    _statement: ($) =>
      choice(
        $.block,
        $.use_statement,
        $.expression_statement,
        $.variable_definition_statement,
        $.variable_assignment_statement,
        $.return_statement,
        $.function_definition,
        $.inflight_function_definition,
        $.class_definition,
        $.for_in_loop,
        $.if_statement
      ),

    use_statement: ($) =>
      seq(
        "use",
        field("module_name", $.identifier),
        optional(
          seq(
            "from",
            field("parent_module", $.identifier)
          )
        ),
        ";"
      ),

    return_statement: ($) =>
      seq("return", optional(field("expression", $.expression)), ";"),

    variable_assignment_statement: ($) =>
      seq(field("name", $.reference), "=", field("value", $.expression), ";"),

    expression_statement: ($) => seq($.expression, ";"),

    variable_definition_statement: ($) =>
      seq(field("name", $.identifier), optional($._type_annotation), ":=", field("value", $.expression), ";"),
    
    _type_annotation: ($) => seq(":", field("type", $._type)),

    // Classes
    class_definition: ($) =>
      seq(
        "class",
        field("name", $.identifier),
        field("implementation", $.class_implementation)
      ),
    class_implementation: ($) =>
      seq("{", repeat(choice($.function_definition, $.class_member)), "}"),
    class_member: ($) =>
      seq(field("name", $.identifier), $._type_annotation, ";"),

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
        $.parenthesized_expression
      ),

    // Primitives
    _literal: ($) => choice($.string, $.number, $.bool, $.duration),

    number: ($) => /[1-9][0-9]*/,

    bool: ($) => choice("true", "false"),

    duration: ($) => choice($.seconds, $.minutes, $.hours),
    seconds: ($) => seq(field("value", $.number), "s"),
    minutes: ($) => seq(field("value", $.number), "m"),
    hours: ($) => seq(field("value", $.number), "h"),

    string: ($) =>
      choice(
        seq('"', repeat(choice($._string_fragment, $._escape_sequence)), '"')
      ),

    // Workaround to https://github.com/tree-sitter/tree-sitter/issues/1156
    // We give names to the token() constructs containing a regexp
    // so as to obtain a node in the CST.
    //
    _string_fragment: ($) => token.immediate(prec(1, /[^"\\]+/)),
    _escape_sequence: ($) =>
      token.immediate(
        seq(
          "\\",
          choice(
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
        field("class", $.identifier),
        field("args", $.argument_list),
        field("id", optional($.new_object_id))
      ),

    new_object_id: ($) => seq("as", $.string),

    _type: ($) =>
      choice(
        $.builtin_type,
        alias($.identifier, $.class_type),
        $.function_type
      ),

    function_type: ($) =>
      seq(
        field("parameter_types", $.parameter_type_list),
        optional(seq("->", field("return_type", $._type)))
      ),

    parameter_type_list: ($) => seq("(", commaSep($._type), ")"),

    builtin_type: ($) => 
      choice(
        "number", 
        "string", 
        "bool", 
        "duration",
        "nothing",
        "anything"
      ),

    function_definition: ($) =>
      seq(
        "function",
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        optional(seq("->", field("return_type", $._type))),
        $.block
      ),

    inflight_function_definition: ($) =>
      seq(
        "inflight",
        "function",
        field("name", $.identifier),
        field("parameter_list", $.parameter_list),
        $.block
      ),

    parameter_definition: ($) =>
      seq(
        field("name", $.identifier),
        $._type_annotation
      ),

    parameter_list: ($) => seq("(", commaSep($.parameter_definition), ")"),

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

    parenthesized_expression: ($) => seq("(", $.expression, ")"),
  },
});

function commaSep1(rule) {
  return seq(rule, repeat(seq(",", rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}
