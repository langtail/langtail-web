import {
  type TRenderLeafProps,
  type TText,
  type Value,
} from "@udecode/plate-common";

import { clsx as cn } from "clsx";

interface CustomLeafProps extends TText {
  blockquote?: boolean;
  code?: boolean;
  codeSnippet?: boolean;
  unknownCode?: boolean;
  bold?: boolean;
  hr?: boolean;
  italic?: boolean;
  list?: boolean;
  title?: boolean;
  keyword?: boolean;
  punctuation?: boolean;
  string?: boolean;
  className?: boolean;
  operator?: boolean;
  builtin?: boolean;
  function?: boolean;
  number?: boolean;
  templateString?: boolean;
  boolean?: boolean;
  functionVariable?: boolean;
  comment?: boolean;
  addition?: boolean;
  deletion?: boolean;
}

function PreviewLeaf({
  attributes,
  children,
  leaf,
}: TRenderLeafProps<Value, CustomLeafProps>) {
  const styles: Array<string | false | undefined> = [
    // markdown
    leaf.bold && "font-bold dark:text-green-400",
    leaf.italic && "italic dark:text-purple-400",
    leaf.blockquote && "italic dark:text-slate-600",
    leaf.codeSnippet &&
      "rounded-sm dark:bg-indigo-900 bg-indigo-100 font-mono text-amber-600 dark:text-amber-400",
    leaf.unknownCode && "font-mono text-amber-600 dark:text-amber-400",
    leaf.list && "dark:text-green-100",
    leaf.title && "dark:text-pink-400",
    leaf.hr && "",
    // prism highlighting (uses prism.css)
    leaf.keyword && "token keyword",
    leaf.punctuation && "token punctuation",
    leaf.string && "token string",
    leaf.className && "token class-name",
    leaf.operator && "token operator",
    leaf.builtin && "token builtin",
    leaf.function && "token function",
    leaf.number && "token number",
    leaf.templateString && "token template-string",
    leaf.boolean && "token boolean",
    leaf.functionVariable && "token function-variable",
    leaf.comment && "token comment",
    // diff
    leaf.addition &&
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-800/50 dark:text-indigo-400 font-semibold",
    leaf.deletion &&
      "bg-red-50 text-red-700 dark:bg-[rgba(255,0,0,0.1)] dark:text-gray-500 line-through",
  ];

  return (
    <span {...attributes} className={cn(...styles)}>
      {children}
    </span>
  );
}

export default PreviewLeaf;
