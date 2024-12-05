import { useCallback } from "react";

import type useEditor from "../useEditor";

interface UseInsertDataProps {
  editor: ReturnType<typeof useEditor>;
  pasteOptimizeTreshold?: number;
}
const useInsertData = ({
  editor,
  pasteOptimizeTreshold,
}: UseInsertDataProps) => {
  const insertData = useCallback(
    (data: DataTransfer) => {
      const text = data.getData("text/plain");
      if (text) {
        if (pasteOptimizeTreshold && text.length > pasteOptimizeTreshold) {
          editor.optimize = true;
        }
        editor.insertText(text);
      }
    },
    [editor, pasteOptimizeTreshold]
  );

  return insertData;
};

export default useInsertData;
