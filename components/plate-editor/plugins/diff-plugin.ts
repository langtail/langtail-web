import { createPluginFactory, isText } from "@udecode/plate-common";
import { type Descendant, type Path } from "slate";

import { combineWithDiff } from "../textDiffer";
import { type LangtailPlateEditor } from "../types";

const decorateDiff =
  (editor: LangtailPlateEditor) =>
  ([node, path]: [Descendant, Path]) => {
    if (
      editor.initialText === undefined ||
      editor.suggestedText === undefined ||
      !isText(node)
    ) {
      return [];
    }

    // We assume node.text already contains the combined text
    // We recompute the diff to get the ranges
    const { segments } = combineWithDiff(
      editor.initialText,
      editor.suggestedText
    );

    return segments
      .filter((segment) => segment.type !== "unchanged")
      .map((segment) => ({
        anchor: { offset: segment.range[0], path },
        focus: { offset: segment.range[1], path },
        [segment.type]: true,
      }));
  };

const createDiffPlugin = createPluginFactory({
  key: "diff",
  decorate: decorateDiff,
});

export default createDiffPlugin;
