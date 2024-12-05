import { createPluginFactory, isText } from "@udecode/plate-common";
import _ from "lodash";
import Prism from "prismjs";
import { type Descendant, type Path, type Range as SlateRange } from "slate";

import "prismjs/components/prism-markdown";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";

import { type LangtailPlateEditor } from "../types";

type Token = string | Prism.Token;

type Range = SlateRange & {
  [key: string]: boolean | { offset: number; path: Path };
};

const getLength = (token: Token): number => {
  if (typeof token === "string") {
    return token.length;
  }
  if (typeof token.content === "string") {
    return token.content.length;
  }
  if (token.content instanceof Prism.Token) {
    return getLength(token.content);
  }

  return token.content.reduce((l: number, t: Token) => l + getLength(t), 0);
};

interface decorationOptions {
  path: Path;
  offset: number;
}

const prismGrammars = {
  markdown: Prism.languages.markdown,
  typescript: Prism.languages.typescript,
  javascript: Prism.languages.javascript,
  python: Prism.languages.python,
};

const getSyntaxHighlightRanges = (
  code: string,
  syntax: keyof typeof prismGrammars,
  { path, offset }: decorationOptions
): Range[] => {
  const ranges: Range[] = [];

  const grammar = prismGrammars[syntax];
  if (!grammar) {
    console.warn(`No grammar found for ${syntax}`);
    return ranges;
  }

  const tokens = Prism.tokenize(code, grammar);
  let start = offset;

  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    if (typeof token !== "string") {
      ranges.push({
        anchor: { offset: start, path },
        focus: { offset: end, path },
        [_.camelCase(token.type as string)]: true,
      });
    }

    start = end;
  }

  return ranges;
};

const decorateMarkdown =
  (editor: LangtailPlateEditor) =>
  ([node, path]: [Descendant, Path]) => {
    const ranges: Range[] = [];

    if (editor.optimize || !isText(node)) {
      return ranges;
    }

    const grammar = Prism.languages.markdown;
    if (!grammar) {
      console.warn("No grammar found for markdown");
      return ranges;
    }

    const tokens = Prism.tokenize(node.text as string, grammar);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          anchor: { offset: start, path },
          focus: { offset: end, path },
          [_.camelCase(token.type as string)]: true,
        });

        if (token.type === "code") {
          const blockStart = node.text.indexOf("\n", start) + 1;
          const blockEnd = node.text.lastIndexOf("\n", end - 1);
          const codeBlock = node.text.slice(blockStart, blockEnd);
          const language = node.text
            .slice(start + 3, blockStart)
            .trim()
            .toLowerCase();
          const decorationOptions = { path, offset: blockStart };
          if (["js", "jsx", "javascript"].includes(language)) {
            const jsRanges = getSyntaxHighlightRanges(
              codeBlock,
              "javascript",
              decorationOptions
            );
            ranges.push(...jsRanges);
          } else if (["ts", "tsx", "typescript"].includes(language)) {
            const tsRanges = getSyntaxHighlightRanges(
              codeBlock,
              "typescript",
              decorationOptions
            );
            ranges.push(...tsRanges);
          } else if (["py", "python"].includes(language)) {
            const pyRanges = getSyntaxHighlightRanges(
              codeBlock,
              "python",
              decorationOptions
            );
            ranges.push(...pyRanges);
          } else if (["md", "markdown"].includes(language)) {
            const mdRanges = getSyntaxHighlightRanges(
              codeBlock,
              "markdown",
              decorationOptions
            );
            ranges.push(...mdRanges);
          } else {
            ranges.push({
              anchor: { offset: start, path },
              focus: { offset: end, path },
              unknownCode: true,
            });
          }
        }
      }

      start = end;
    }

    // Fix blockquote range
    for (let i = 0; i < ranges.length; i++) {
      const range: Range | undefined = ranges[i];
      if (range?.blockquote) {
        if (i === 0 || node.text[range.anchor.offset - 1] === "\n") {
          const newLineIdx = node.text.indexOf("\n", range.focus.offset);
          range.focus.offset =
            newLineIdx === -1 ? node.text.length : newLineIdx;
        }
      }
    }

    return ranges;
  };

const createMarkdownPlugin = createPluginFactory({
  decorate: decorateMarkdown,
  key: "markdown",
});

export default createMarkdownPlugin;
