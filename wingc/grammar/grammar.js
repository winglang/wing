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

    _statement_delimiter: $ => ';',

    _statement: $ => choice(
      $.use_statement,
      $.variable_definition,
      $.assignment,
      $.function_definition,
      $.proc_definition,
      $.for_loop,
      $.if,
      $.expression_statement,
      $.block,
      $.return,
      $.class_definition,
    ),

    class_definition: $ => seq(
      'class',
      field('name', alias($._identifier, $.class_name)),
      field('implementation', $.class_implementation),
    ),

    class_implementation: $ => seq(
      '{',
      repeat(choice(
        $.function_definition,
        $.class_member,
      )),
      '}',
    ),

    class_member: $ => seq(
      field('name', $.variable_name),
      ':',
      field('type', $._type),
      ';',
    ),

    return: $ => seq(
      'return',
      optional(field('expression', $._expression)),
      ';'
    ),

    assignment: $ => seq(
      field('name', $.variable_name),
      '=',
      field('value', $._expression),
      ';'
    ),

    expression_statement: $=> seq(
      field('expression', $._expression),
      $._statement_delimiter
    ),

    _expression: $ => choice(
      $.binary_expression,
      $.unary_expression,
      $.new_expression,
      $._literal,
      $.reference,
      $.function_call,
      $.method_call,
      $.parenthesized_expression,
    ),

    for_loop: $ => seq(
      'for',
      field('iterator', alias($._identifier, $.symbol)),
      'in',
      field('iterable', $._expression),
      field('block', $.block),
    ),

    if: $ => seq(
      'if',
      field('condition', $._expression),
      field('block', $.block),
      optional(seq(
        'else',
        field('else_block', $.block),
      ))
    ),

    _literal: $ => choice(
      $.string,
      $.number,
      $.bool,
      $._duration,
    ),

    number: $ => /[1-9][0-9]*/,

    bool: $ => choice('true', 'false'),

    _duration: $ => choice(
      $.seconds,
      $.minutes,
      $.hours,
    ),

    seconds: $ => seq(
      field('number', $.number),
      's'
    ),

    hours: $ => seq(
      field('number', $.number),
      'h'
    ),

    minutes: $ => seq(
      field('number', $.number),
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
      field('call_name', $.reference),
      field('args', $.argument_list),
    ),

    method_call: $ => seq(
      field('object', $._expression),
      '.',
      field('call_name', $.reference),
      field('args', $.argument_list),
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

    // function_call_name: $ => seq(
    //   field('reference', $.reference),
    //   optional(seq('.', field('method_name', $.method_name))),
    // ),

    // proc_call_name: $ => seq(
    //   field('reference', alias($.reference, $.cloud_object)),
    //   '->',
    //   field('method_name', $.method_name)
    // ),

    method_name: $ => $._identifier,

    reference: $ => seq(
      optional(seq(
        field('namespace', $.namespace),
        '::'
      )),
      field('symbol', alias($._identifier, $.symbol)),
    ),

    use_statement: $ => seq(
      'use',
      field('module_name', alias($._identifier, $.module_name)),
      optional(seq(
        'from',
        field('parent_module', alias($._identifier, $.parent_module)),
      )),
      $._statement_delimiter
    ),


    variable_definition: $ => seq(
      field('name', $.variable_name),
      ':=',
      field('value', $._initial_value),
      $._statement_delimiter
    ),

    _initial_value: $ => $._expression,
    variable_name: $ => $._identifier,

    new_expression: $ => seq(
      'new',
      field('class', alias($._identifier, $.class_name)),
      field('args', $.argument_list),
      field('object_id', optional($.new_object_id)),
    ),

    new_object_id: $ => seq('as', $.string),

    positional_argument: $ => $._expression,

    keyword_argument: $ => prec(3, seq(
      alias($._identifier, $.keyword_argument_key),
      ':',
      alias($._expression, $.keyword_argument_value),
    )),

    namespace: $ => $._identifier,

    _type: $ => choice(
      $.primitive_type,
      alias($._identifier, $.class_type),
      $.function_type,
    ),

    function_type: $ => seq(
      field('parameter_types', $.parameter_type_list),
      optional(seq(
        '->',
        field('return_type', $._type)
      )),
    ),

    parameter_type_list: $ => seq(
      '(',
      commaSep($._type),
      ')',
    ),

    primitive_type: $ => choice(
      'number',
      'string',
      'bool',
      'duration',
    ),

    function_definition: $ => seq(
      'fn',
      field('name', $.function_name),
      field('parameter_list', $.parameter_list),
      optional(seq(
        '->',
        field('return_type', $._type)
      )),
      field('block', $.block),
    ),

    proc_definition: $ => seq(
      'proc',
      field('name', $.function_name),
      field('parameter_list', $.parameter_list),
      field('block', $.block),
    ),

    function_name: $ => $._identifier,

    parameter_definition: $ => seq(
      field('name', alias($._identifier, $.parameter)),
      ':',
      field('type', $._type),
    ),

    parameter_list: $ => seq(
      '(',
      commaSep($.parameter_definition),
      ')',
    ),

    block: $ => seq(
      '{',
      field('statements', repeat($._statement)),
      '}',
    ),

    unary_expression: $ => seq(
      field('op', choice('!', '+','-')), 
      field('arg', $._expression)
    ),

    unary_expression: $ => choice(...[
      ['+', PREC.UNARY],
      ['-', PREC.UNARY],
      ['!', PREC.UNARY],
      //['~', PREC.UNARY],
    ].map(([operator, precedence]) =>
      prec.left(precedence, seq(
        field('op', operator),
        field('arg', $._expression)
      ))
    )),    

    binary_expression: $ => { 
      const table = [
        ['+', PREC.ADD],
        ['-', PREC.ADD],
        ['*', PREC.MULTIPLY],
        ['/', PREC.MULTIPLY],
        ['%', PREC.MULTIPLY],
        ['||', PREC.LOGICAL_OR],
        ['&&', PREC.LOGICAL_AND],
        //['|', PREC.INCLUSIVE_OR],
        //['^', PREC.EXCLUSIVE_OR],
        //['&', PREC.BITWISE_AND],
        ['==', PREC.EQUAL],
        ['!=', PREC.EQUAL],
        ['>', PREC.RELATIONAL],
        ['>=', PREC.RELATIONAL],
        ['<=', PREC.RELATIONAL],
        ['<', PREC.RELATIONAL],
        //['<<', PREC.SHIFT],
        //['>>', PREC.SHIFT],
        //['>>>', PREC.SHIFT],
      ];
      
      return choice(...table.map(([operator, precedence]) => {
        return prec.left(precedence, seq(
          field('left', $._expression),
          field('op', operator),
          field('right', $._expression)
        ));
      }));
    },

    parenthesized_expression: $ => seq(
      '(',
      $._expression,
      ')',
    ),

  },

});

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}

function commaSep(rule) {
  return optional(commaSep1(rule));
}
