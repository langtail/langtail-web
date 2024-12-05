import {
  useCallback,
  type ClipboardEvent,
  type ClipboardEventHandler,
} from "react";

import { htmlElementToText } from "./html-to-text";

const useCopyHandler = () => {
  const copyHandler: ClipboardEventHandler<HTMLDivElement> = useCallback(
    (event: ClipboardEvent<HTMLDivElement>) => {
      const htmlContent = event.clipboardData.getData("text/html");

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      doc.querySelectorAll(".no-copy").forEach((element) => {
        element.remove();
      });

      const serializer = new XMLSerializer();
      const newHtmlContent = serializer.serializeToString(doc);

      event.clipboardData.setData("text/html", newHtmlContent);

      const plainText = htmlElementToText(doc.body);
      event.clipboardData.setData("text/plain", plainText);

      event.preventDefault();
    },
    []
  );
  return copyHandler;
};

export default useCopyHandler;
