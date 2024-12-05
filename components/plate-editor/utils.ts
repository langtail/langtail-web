import { type TEditor } from "@udecode/plate-common";
import {
  type Descendant,
  type Element,
  type Location,
  type Point,
  type Text,
} from "slate";

export const getTextFromNodes = (nodes: Descendant[]): string =>
  nodes
    .map((node) =>
      (node as Element).children.map((child) => (child as Text).text).join("")
    )
    .join("");

type SelectionData =
  | {
      selection: Location;
      selectionStart: Point;
      selectionEnd: Point;
      selectedText: string;
    }
  | {
      selection: null;
      selectionStart: undefined;
      selectionEnd: undefined;
      selectedText: undefined;
    };

export const getSelectionData = (editor: TEditor): SelectionData => {
  if (!editor.selection) {
    return {
      selection: null,
      selectionStart: undefined,
      selectionEnd: undefined,
      selectedText: undefined,
    };
  }

  const selection = editor.selection;
  const selectionStart = editor.start(selection);
  const selectionEnd = editor.end(selection);
  const selectedText = getTextFromNodes(editor.fragment(selection));

  return {
    selection,
    selectionStart,
    selectionEnd,
    selectedText,
  };
};

export const replaceStringRange = (
  originalString: string,
  startIndex: number,
  endIndex: number,
  replacement: string
): string => {
  const before = originalString.substring(0, startIndex);
  const after = originalString.substring(endIndex);
  return before + replacement + after;
};

export const countTabChars = (str: string, tabChar: string): number => {
  let count = 0;
  for (const char of str) {
    if (char === tabChar) {
      count++;
    } else {
      break;
    }
  }
  return count;
};

export const movePointByCharacters = (
  point: Point,
  characters: number
): Point => {
  return {
    path: point.path,
    offset: point.offset + characters,
  };
};

export const getInitialValue = (text: string) => [
  {
    id: 1,
    type: "p",
    children: [{ text }],
  },
];
