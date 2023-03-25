class C4 { x:num; } // class with field and no init
//    ^^ Unknown symbol "init"
new C4();

class C5 {} // class with argument and no init
new C5(1);
//     ^ Class should be called with no arguments.