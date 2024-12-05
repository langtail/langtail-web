// enables PlateEditor to turn on/off editor optimization and plugins

import { useEffect } from "react";

import type useEditor from "./useEditor";

interface UseDynamicEditorProps {
  editor: ReturnType<typeof useEditor>;
  optimize: boolean;
}

const useDynamicEditor = ({ editor, optimize }: UseDynamicEditorProps) => {
  // editor.* properties are read in plugins to determine if they should run
  editor.optimize = optimize;
  // editor.redecorate() is called to apply changes to the editor immediately
  useEffect(() => {
    editor.redecorate();
  }, [editor, optimize]);
};

export default useDynamicEditor;
