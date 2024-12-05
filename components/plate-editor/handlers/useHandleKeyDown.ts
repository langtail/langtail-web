import { useCallback } from "react";

import type useEditor from "../useEditor";
import {
  countTabChars,
  getSelectionData,
  getTextFromNodes,
  movePointByCharacters,
} from "../utils";

interface UseHandleKeyDownProps {
  editor: ReturnType<typeof useEditor>;
  ignoreTabKey: boolean;
  insertSpaces: boolean;
  tabSize: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const useHandleKeyDown = ({
  editor,
  ignoreTabKey,
  insertSpaces,
  tabSize,
  onKeyDown,
}: UseHandleKeyDownProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Escape") {
        event.currentTarget.blur();
        return;
      }

      const { selection, selectionStart, selectionEnd, selectedText } =
        getSelectionData(editor);

      if (!selection) {
        console.warn("onKeyDown called without selection");
        return;
      }

      const tabString = insertSpaces ? " ".repeat(tabSize) : "\t";
      const tabCharacter = tabString[0] as string;

      const wholeText = getTextFromNodes(editor.children);
      const lineStartBeforeRangeOffset =
        selectionStart.offset === 0
          ? 0
          : wholeText.lastIndexOf("\n", selectionStart.offset - 1) + 1;
      const lineStartBeforeRange = {
        path: selectionStart.path,
        offset: lineStartBeforeRangeOffset,
      };
      const selectedFromLineStart =
        selectionStart.offset === 0 ||
        wholeText[selectionStart.offset - 1] === "\n";
      const selectedToLineEnd =
        selectionEnd.offset === wholeText.length ||
        wholeText[selectionEnd.offset] === "\n";
      const tabManipulation =
        selectedText.includes("\n") ||
        (selectedFromLineStart && selectedToLineEnd);
      const isBracketSelected = ["(", "{", "["].includes(selectedText);
      const isQuoteSelected = ['"', "'", "`"].includes(selectedText);

      const textBeforeSelection = wholeText.slice(
        lineStartBeforeRangeOffset,
        selectionStart.offset
      );
      const tabCharsAtStartCount = countTabChars(
        textBeforeSelection,
        tabCharacter
      );

      const wrapSelection = (start: string, end: string) => {
        if (!selectedText) {
          throw new Error("wrapSelection called when no text is selected");
        }

        editor.insertText(start + selectedText + end);
        try {
          editor.setSelection({
            focus: editor.after(selectionEnd),
            anchor: editor.after(selectionStart),
          });
        } catch (e) {
          console.error("Error setting selection", e);
        }
        event.preventDefault();
      };
      if (event.key === "Enter" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        editor.insertText("\n" + tabCharacter.repeat(tabCharsAtStartCount));
      } else if (event.key === "Tab" && !ignoreTabKey) {
        // Prevent focus change
        event.preventDefault();
        if (tabManipulation || event.shiftKey) {
          if (event.shiftKey) {
            const justTabsBeforeSelection =
              tabCharsAtStartCount === textBeforeSelection.length;
            let toRemoveFromStart = tabString.length;
            let charsRemovedCount = 0;
            if (selectedText) {
              editor.insertText(
                selectedText
                  .split("\n")
                  .map((line, idx) => {
                    const firstLine = idx === 0;
                    if (firstLine && !justTabsBeforeSelection) {
                      return line;
                    }
                    let editedLine = line;
                    for (let i = 0; i < tabString.length; i++) {
                      if (editedLine.startsWith(tabCharacter)) {
                        editedLine = editedLine.slice(1);
                        charsRemovedCount++;
                        if (firstLine) {
                          toRemoveFromStart--;
                        }
                      }
                    }
                    return editedLine;
                  })
                  .join("\n")
              );
            }
            const deleteCount = Math.min(
              tabCharsAtStartCount,
              toRemoveFromStart
            );
            if (deleteCount > 0) {
              editor.delete({
                at: {
                  anchor: lineStartBeforeRange,
                  focus: movePointByCharacters(
                    lineStartBeforeRange,
                    deleteCount
                  ),
                },
              });
              charsRemovedCount += deleteCount;
            }
            editor.setSelection({
              anchor: movePointByCharacters(selectionStart, -deleteCount),
              focus: movePointByCharacters(selectionEnd, -charsRemovedCount),
            });
          } else {
            if (selectedText) {
              editor.insertText(
                selectedText.replaceAll("\n", "\n" + tabString)
              );
            }
            editor.insertText(tabString, {
              at: lineStartBeforeRange,
            });
            editor.setSelection({
              anchor:
                selectedText && selectedFromLineStart
                  ? selectionStart
                  : movePointByCharacters(selectionStart, tabString.length),
              focus: movePointByCharacters(
                selectionEnd,
                selectedText.split("\n").length * tabString.length
              ),
            });
          }
        } else {
          editor.insertText(tabString);
        }
      } else if (selectedText) {
        if (event.key === "(" && !isBracketSelected) {
          wrapSelection("(", ")");
        } else if (event.key === "{" && !isBracketSelected) {
          wrapSelection("{", "}");
        } else if (event.key === "[" && !isBracketSelected) {
          wrapSelection("[", "]");
        } else if (event.key === "'" && !isQuoteSelected) {
          wrapSelection("'", "'");
        } else if (event.key === '"' && !isQuoteSelected) {
          wrapSelection('"', '"');
        } else if (event.key === "`" && !isQuoteSelected) {
          wrapSelection("`", "`");
        }
      }
    },
    [editor, ignoreTabKey, insertSpaces, tabSize, onKeyDown]
  );

  return handleKeyDown;
};

export default useHandleKeyDown;
