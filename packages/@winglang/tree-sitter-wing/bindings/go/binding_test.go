package tree_sitter_wing_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/winglang/tree-sitter-wing"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_wing.Language())
	if language == nil {
		t.Errorf("Error loading Wing grammar")
	}
}
