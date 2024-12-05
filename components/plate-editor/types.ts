import { type TEditor } from "@udecode/plate-common";

export interface LangtailPlateEditor extends TEditor {
  optimize?: boolean;
  suggestedText?: string;
  initialText?: string;
}
