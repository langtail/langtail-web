import React, { createContext, useCallback, useContext, useMemo } from "react";

import type useEditor from "./useEditor";
import { getTextFromNodes } from "./utils";

interface DiffContextValue {
  editor: ReturnType<typeof useEditor>;
  suggestedText: string | undefined;
  handleSuggestionAccepted: () => void;
  handleSuggestionRejected: () => void;
}

interface DiffProviderProps {
  children: React.ReactNode;
  editor: ReturnType<typeof useEditor>;
  suggestedText?: string;
  onSuggestionAccept?: () => void;
  onSuggestionReject?: () => void;
}

const DiffContext = createContext<DiffContextValue | undefined>(undefined);

export function DiffProvider({
  children,
  editor,
  suggestedText,
  onSuggestionAccept,
  onSuggestionReject,
}: DiffProviderProps) {
  const handleSuggestionAccepted = useCallback(() => {
    if (suggestedText) {
      editor.insertText(suggestedText, {
        at: {
          anchor: {
            path: [0, 0],
            offset: 0,
          },
          focus: {
            path: [0, 0],
            offset: getTextFromNodes(editor.children).length,
          },
        },
      });
      console.log("Suggestion inserted");
    }
    onSuggestionAccept?.();
  }, [editor, suggestedText, onSuggestionAccept]);

  const handleSuggestionRejected = useCallback(() => {
    onSuggestionReject?.();
  }, [onSuggestionReject]);

  const value = useMemo(
    () => ({
      editor,
      suggestedText,
      handleSuggestionAccepted,
      handleSuggestionRejected,
    }),
    [editor, suggestedText, handleSuggestionAccepted, handleSuggestionRejected]
  );

  return <DiffContext.Provider value={value}>{children}</DiffContext.Provider>;
}

export function useDiffContext() {
  const context = useContext(DiffContext);
  if (context === undefined) {
    throw new Error("useDiffContext must be used within a DiffProvider");
  }
  return context;
}
