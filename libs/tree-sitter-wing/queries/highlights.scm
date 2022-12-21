; Variables

(variable_definition_statement 
  name: (identifier) @variable
)
(reference (identifier)) @variable
(reference (nested_identifier property: (identifier))) @property

; Classes

(custom_type) @type
(class_member 
  name: (identifier) @member
) 
(class_definition 
  name: (identifier) @type
)
(function_definition
  name: (identifier) @function
)
(inflight_function_definition
  name: (identifier) @function
)

; Functions

(keyword_argument_key) @variable.parameter
(call 
  caller: (reference) @function.method
)

; Primitives

[
 (number)
 (duration)
] @constant.builtin
(string) @string
(bool) @constant.builtin
(builtin_type) @type.builtin

; Special

(comment) @comment

[
  "("
  ")"
  "{"
  "}"
]  @punctuation.bracket

[
  "-"
  "+"
  "*"
  "/"
  "%"
  "<"
  "<="
  "="
  "=="
  "!"
  "!="
  ">"
  ">="
  "&&"
  "||"
] @operator

[
  ";"
  "."
  ","
] @punctuation.delimiter

[
  "as"
  "bring"
  "class"
  "else"
  "for"
  "if"
  "in"
  "init"
  "inflight"
  "let"
  "new"
  "return"
] @keyword