; Classes

(custom_type) @type
(class_field 
  name: (identifier) @member
) 
(class_definition 
  name: (identifier) @type
)
(method_definition
  name: (identifier) @function
)

; Functions

(keyword_argument_key) @variable.parameter
(call 
  caller: (reference 
  	(nested_identifier 
    	property: (member_identifier) @function.method)) 
)
(call 
  caller: (reference 
  	(reference_identifier) @function.method)
)

; Primitives

[
 (number)
 (duration)
] @constant.builtin
(string) @string
(bool) @constant.builtin
(builtin_type) @type.builtin
(json_container_type) @type.builtin

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
  "??"
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
  "new"
  "let"
  "new"
  "return"
  (inflight_specifier)
] @keyword

(identifier) @variable
(reference_identifier) @variable
(member_identifier) @property