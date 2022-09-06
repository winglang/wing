; Variables

(variable_definition_statement 
  name: (identifier) @variable
)
(namespaced_identifier 
  namespace: (identifier) @type
  name: (identifier) @variable
)
(reference (identifier)) @variable
(reference (nested_identifier property: (identifier))) @property

; Classes

(class_type) @type
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
(method_call 
  call_name: (nested_identifier
    property: (identifier) @function.method 
  ) 
)

; Functions

(keyword_argument_key) @variable.parameter
(function_call 
  call_name: (reference) @function.method
)

; Primitives

[
 (number)
 (duration)
] @number
(string) @string
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
  "::"
] @punctuation.delimiter

[
  "as"
  "bring"
  "class"
  "else"
  "for"
  "if"
  "in"
  "inflight"
  "new"
  "return"
] @keyword