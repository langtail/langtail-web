'use client'

import { useMemo, type FocusEventHandler } from 'react'
import { Plate } from '@udecode/plate-common'

import PreviewLeaf from './PreviewLeaf'
import { TextContainer, type Padding } from './TextContainer'

import './prism.css'

import useCopyHandler from './handlers/useCopyHandler'
import useHandleKeyDown from './handlers/useHandleKeyDown'
import useInsertData from './handlers/useInsertData'
import useOnValueChange from './handlers/useOnValueChange'
import useDynamicEditor from './useDynamicEditor'
import useEditor from './useEditor'
import { getInitialValue } from './utils'

export interface PlateEditorProps {
  ignoreTabKey?: boolean
  insertSpaces?: boolean
  tabSize?: number
  optimize?: boolean
  pasteOptimizeTreshold?: number
  className?: string
  placeholder?: string
  initialText?: string
  suggestedText?: string
  disabled?: boolean
  padding?: string | number | Padding<number | string>
  style?: React.CSSProperties
  autoFocus?: boolean
  plateEditor?: ReturnType<typeof useEditor>
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onBlur?: FocusEventHandler<HTMLDivElement>
  onTextChange?: (text: string) => void
}

export default function PlateEditor({
  ignoreTabKey = false,
  insertSpaces = true,
  tabSize = 2,
  optimize = false,
  pasteOptimizeTreshold,
  className,
  placeholder,
  initialText,
  disabled,
  padding,
  style,
  autoFocus = false,
  plateEditor,
  onKeyDown,
  onKeyUp,
  onBlur,
  onTextChange,
}: PlateEditorProps) {
  const initialValue = useMemo(() => {
    return getInitialValue(initialText ?? '')
  }, [initialText])

  const localEditor = useEditor()
  const editor = plateEditor ?? localEditor
  useDynamicEditor({
    editor,
    optimize,
  })

  const insertData = useInsertData({ editor, pasteOptimizeTreshold })
  editor.insertData = insertData
  const onValueChange = useOnValueChange({ onTextChange, optimize })
  const copyHandler = useCopyHandler()
  const handleKeyDown = useHandleKeyDown({
    editor,
    ignoreTabKey,
    insertSpaces,
    tabSize,
    onKeyDown,
  })

  return (
    <div
      onCopy={copyHandler}
      onCut={copyHandler}
      className="flex-1 flex-col h-full flex flex-col"
    >
      <Plate
        editor={editor}
        plugins={editor.customPlugins}
        onChange={onValueChange}
        initialValue={initialValue}
      >
        <TextContainer
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
          onKeyUp={onKeyUp}
          disabled={disabled}
          onBlur={onBlur}
          placeholder={placeholder}
          renderLeaf={PreviewLeaf}
          className={className}
          padding={padding}
          style={style}
        />
      </Plate>
    </div>
  )
}
