// allows you to access the editor instance outside of the PlateEditor component
// you can use functions like editor.insertText, getSelectionData(editor) etc.
// pass the editor to PlateEditor component as the plateEditor prop
import { useMemo } from "react";
import { createPlateEditor, createPlugins } from "@udecode/plate-common";

import createDiffPlugin from "./plugins/diff-plugin";
import createMarkdownPlugin from "./plugins/markdown-plugin";

const markdownPlugin = createMarkdownPlugin();
const diffPlugin = createDiffPlugin();

type SlateValue = {
  id: number;
  type: string;
  children: {
    text: string;
  }[];
}[];
export type Editor = ReturnType<typeof createPlateEditor<SlateValue>> & {
  customPlugins: ReturnType<typeof createPlugins>;
};

const plugins = createPlugins([markdownPlugin, diffPlugin]);
export const createEditor = (): Editor => {
  const editor = createPlateEditor<SlateValue>({ plugins });
  editor.customPlugins = plugins;
  return editor as Editor;
};

export default function useEditor(): Editor {
  return useMemo(createEditor, []);
}
