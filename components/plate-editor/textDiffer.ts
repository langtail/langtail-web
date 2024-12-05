import {
  DIFF_DELETE,
  DIFF_EQUAL,
  DIFF_INSERT,
  diff_match_patch,
} from "diff-match-patch";

interface DiffSegment {
  type: "addition" | "deletion" | "unchanged";
  text: string;
  range: [number, number];
}

export const combineWithDiff = (
  initialText: string,
  suggestedText: string
): {
  combinedText: string;
  segments: DiffSegment[];
} => {
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(initialText, suggestedText);
  dmp.diff_cleanupSemantic(diffs);

  let combinedText = "";
  const segments: DiffSegment[] = [];
  let currentPosition = 0;

  diffs.forEach(([operation, text]) => {
    const start = currentPosition;
    const length = text.length;

    if (operation === DIFF_EQUAL) {
      combinedText += text;
      segments.push({
        type: "unchanged",
        text,
        range: [start, start + length],
      });
      currentPosition += length;
    } else if (operation === DIFF_DELETE) {
      combinedText += text;
      segments.push({
        type: "deletion",
        text,
        range: [start, start + length],
      });
      currentPosition += length;
    } else if (operation === DIFF_INSERT) {
      combinedText += text;
      segments.push({
        type: "addition",
        text,
        range: [start, start + length],
      });
      currentPosition += length;
    }
  });

  return { combinedText, segments };
};
