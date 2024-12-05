"use client";

import PlateEditor, { type PlateEditorProps } from "./PlateEditor";

const OPTIMIZE_TRESHOLD = 10000;

export interface OptimizedPlateEditorProps
  extends Omit<PlateEditorProps, "optimized" | "initialText"> {
  value: string; // used only to determine if the editor should be optimized & as an _initial_ value
}

const OptimizedPlateEditor = ({
  value,
  ...props
}: OptimizedPlateEditorProps) => {
  return (
    <PlateEditor
      optimize={value.length > OPTIMIZE_TRESHOLD}
      initialText={value}
      pasteOptimizeTreshold={OPTIMIZE_TRESHOLD}
      {...props}
    />
  );
};

export default OptimizedPlateEditor;
