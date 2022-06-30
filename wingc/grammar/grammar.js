module.exports = grammar({
  name: 'winglang',

  extras: $ => [
    $._comment,
    /[\s\p{Zs}\uFEFF\u2060\u200B]/,
  ],

  word: $ => $._identifier,

  rules: {
    source_file: $ => repeat($._statement),

    _identifier: $ => /([a-z_][A-Za-z_0-9]*|[A-Z][A-Z0-9_]*)/,

    _comment: $ => token(choice(
      seq('//', /.*/),
      seq(
        '/*',
        /[^*]*\*+([^/*][^*]*\*+)*/,
        '/'
      )
    )),

    _statement: $ => choice(
      $.use_statement,
      $.variable_definition,
      $.function_definition,
      $.proc_definition,
      $._expression
    ),

    _expression: $ => choice(
      $.new_expression,
      $._literal,
      $.reference,
      $.function_call,
      $.for_loop,

      // TODO
    ),

    for_loop: $ => seq(
      'for',
      $.variable_name,
      'in',
      field("iterable", $._expression),
      $.block,
    ),

    _literal: $ => choice(
      $.string,
      $.number,
      $._duration,
    ),

    number: $ => /[1-9][0-9]*/,

    _duration: $ => choice(
      $.seconds,
      $.hours,
      $.minutes,
    ),

    seconds: $ => seq(
      $.number,
      's'
    ),

    hours: $ => seq(
      $.number,
      'h'
    ),

    minutes: $ => seq(
      $.number,
      'm'
    ),

    string: $ => choice(
      seq(
        '"',
        repeat(choice(
          $._string_fragment,
          $._escape_sequence
        )),
        '"'
      ),
    ),

    // Workaround to https://github.com/tree-sitter/tree-sitter/issues/1156
    // We give names to the token() constructs containing a regexp
    // so as to obtain a node in the CST.
    //
    _string_fragment: $ =>
      token.immediate(prec(1, /[^"\\]+/)),

    _escape_sequence: $ => token.immediate(seq(
      '\\',
      choice(
        /[^xu0-7]/,
        /[0-7]{1,3}/,
        /x[0-9a-fA-F]{2}/,
        /u[0-9a-fA-F]{4}/,
        /u{[0-9a-fA-F]+}/
      )
    )),

    function_call: $ => seq(
      choice(
        $.function_call_name, 
        $.proc_call_name
      ),
      $.argument_list,
    ),

    argument_list: $ => seq(
      '(',
      choice(
        commaSep($.positional_argument),
        commaSep($.keyword_argument),
        seq(
          commaSep($.positional_argument),
          ',',
          commaSep($.keyword_argument),
        ),
      ),
      ')'
    ),

    function_call_name: $ => seq(
      $.reference,
      optional(seq('.', $.method_name)),
    ),

    proc_call_name: $ => seq(
      alias($.reference, $.cloud_object),
      '->',
      $.method_name,
    ),

    method_name: $ => $._identifier,

    reference: $ => seq(
      optional(seq(
        $.namespace,
        '::'
      )),
      alias($._identifier, $.symbol),
    ),

    use_statement: $ => seq(
      'use',
      alias($._identifier, $.module_name),
      optional(seq(
        'from',
        alias($._identifier, $.parent_module)
      ))
    ),


    variable_definition: $ => seq(
      $.variable_name,
      ':=',
      $.initial_value,
    ),

    initial_value: $ => $._expression,
    variable_name: $ => $._identifier,

    new_expression: $ => seq(
      $.class,
      $.argument_list,
      optional($.new_object_id),
    ),

    new_object_id: $ => seq('as', $.string),

    positional_argument: $ => $._expression,

    keyword_argument: $ => prec(3, seq(
      alias($._identifier, $.keyword_argument_key),
      ":",
      alias($._expression, $.keyword_argument_value),
    )),

    class: $ => seq(
      optional(seq(
        $.namespace,
        '::'
      )),
      $.class_name,
    ),

    class_name: $ => /[A-Z][a-zA-Z0-9_]*/,

    namespace: $ => $._identifier,

    type: $ => choice(
      $.primitive_type,
      $.class,
    ),

    primitive_type: $ => choice(
      'int',
      'float',
      'string',
      'bool',
    ),

    function_definition: $ => seq(
      'fn',
      $.function_name,
      $.parameter_list,
      $.block,
    ),

    proc_definition: $ => seq(
      'proc',
      $.function_name,
      $.parameter_list,
      $.block,
    ),

    function_name: $ => $._identifier,

    parameter_definition: $ => seq(
      $.parameter_name,
      ':',
      $.parameter_type
    ),

    parameter_list: $ => seq(
      '(',
      commaSep($.parameter_definition),
      ')',
    ),

    parameter_name: $ => $._identifier,
    parameter_type: $ => $.type,

    block: $ => seq(
      '{',
      repeat($._statement),
      '}',
    ),

  }
});


function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}