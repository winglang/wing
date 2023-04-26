// Adapted from https://github.com/tree-sitter/tree-sitter-javascript/blob/master/src/scanner.c

#include "tree_sitter/parser.h"
#include <wctype.h>

enum TokenType {
  AUTOMATIC_SEMICOLON,
};

void *tree_sitter_wing_external_scanner_create() { return NULL; }
void tree_sitter_wing_external_scanner_destroy(void *p) {}
void tree_sitter_wing_external_scanner_reset(void *p) {}
unsigned tree_sitter_wing_external_scanner_serialize(void *p, char *buffer) { return 0; }
void tree_sitter_wing_external_scanner_deserialize(void *p, const char *b, unsigned n) {}

// static void advance(TSLexer *lexer) { lexer->advance(lexer, false); }
static void skip(TSLexer *lexer) { lexer->advance(lexer, true); }

static bool scan_whitespace_and_comments(TSLexer *lexer) {
  for (;;) {
    while (iswspace(lexer->lookahead)) {
      skip(lexer);
    }

    if (lexer->lookahead == '/') {
      skip(lexer);

      if (lexer->lookahead == '/') {
        skip(lexer);
        while (lexer->lookahead != 0 && lexer->lookahead != '\n') {
          skip(lexer);
        }
      } else if (lexer->lookahead == '*') {
        skip(lexer);
        while (lexer->lookahead != 0) {
          if (lexer->lookahead == '*') {
            skip(lexer);
            if (lexer->lookahead == '/') {
              skip(lexer);
              break;
            }
          } else {
            skip(lexer);
          }
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}

static bool scan_automatic_semicolon(TSLexer *lexer) {
  lexer->result_symbol = AUTOMATIC_SEMICOLON;
  lexer->mark_end(lexer);

  for (;;) {
    if (lexer->lookahead == 0) return true;
    if (lexer->lookahead == '}') return true;
    if (lexer->is_at_included_range_start(lexer)) return true;
    if (lexer->lookahead == '\n') break;
    if (!iswspace(lexer->lookahead)) return false;
    skip(lexer);
  }

  skip(lexer);

  if (!scan_whitespace_and_comments(lexer)) return false;

  switch (lexer->lookahead) {
    case ',':
    case '.':
    case ':':
    case ';':
    case '*':
    case '%':
    case '>':
    case '<':
    case '=':
    case '[':
    case '(':
    case '?':
    case '^':
    case '|':
    case '&':
    case '/':
      return false;

    // Insert a semicolon before `--` and `++`, but not before binary `+` or `-`.
    case '+':
      skip(lexer);
      return lexer->lookahead == '+';
    case '-':
      skip(lexer);
      return lexer->lookahead == '-';

    // Don't insert a semicolon before `!=`, but do insert one before a unary `!`.
    case '!':
      skip(lexer);
      return lexer->lookahead != '=';
  }

  return true;
}

bool tree_sitter_wing_external_scanner_scan(void *payload, TSLexer *lexer,
                                                  const bool *valid_symbols) {
  if (valid_symbols[AUTOMATIC_SEMICOLON]) {
    bool ret = scan_automatic_semicolon(lexer);
    return ret;
  }

  return false;
}