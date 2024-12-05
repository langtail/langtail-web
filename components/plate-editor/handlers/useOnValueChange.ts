import { useCallback } from "react";
import _ from "lodash";

import { getTextFromNodes } from "../utils";

interface UseOnValueChangeProps {
  onTextChange?: (text: string) => void;
  optimize?: boolean;
}

const useOnValueChange = ({
  onTextChange,
  optimize,
}: UseOnValueChangeProps) => {
  const onValueChange = useCallback(
    _.debounce(
      (
        value: {
          id: number;
          type: string;
          children: {
            text: string;
          }[];
        }[]
      ) => {
        const text = getTextFromNodes(value);
        /*
      In case we want to extract variables from the editor content using handlebars-tokenizer:

      const tokens = handlebarsTokenize(text)
      const editableVariables = tokens
        .filter((token) => token.type === "hbsVariableEditable")
        .map((token) => token.content)
      const uniqueVariables = [...new Set(editableVariables)]
      console.log("variables used in editor", uniqueVariables)
      */
        if (onTextChange) {
          onTextChange(text);
        }
      },
      optimize ? 300 : 0
    ),
    [onTextChange, optimize]
  );
  return onValueChange;
};

export default useOnValueChange;
