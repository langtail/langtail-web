import { FocusEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { useDiffContext } from './diff-context'
import OptimizedPlateEditor, {
  type OptimizedPlateEditorProps,
} from './OptimizedPlateEditor'
import { combineWithDiff } from './textDiffer'
import useEditor from './useEditor'

import { cn } from '@/lib/utils'

type ReadOnlyDiffPlateEditorProps = Omit<
  OptimizedPlateEditorProps,
  'disabled' | 'onTextChange' | 'value' | 'highlightHandlebars'
> & {
  initialText: string
  suggestedText: string
}

export const ReadOnlyDiffPlateEditor = ({
  initialText,
  suggestedText,
  ...props
}: ReadOnlyDiffPlateEditorProps) => {
  const value = useMemo(() => {
    const { combinedText } = combineWithDiff(initialText, suggestedText)
    return combinedText
  }, [initialText, suggestedText])
  const key = useMemo(() => Math.random(), [value])

  // use custom editor, so we can add properties for the diff plugin
  const editor = useEditor()
  editor.initialText = initialText
  editor.suggestedText = suggestedText

  return (
    <OptimizedPlateEditor
      key={key}
      value={value}
      plateEditor={editor}
      {...props}
      disabled
      onTextChange={undefined}
    />
  )
}

type DiffPlateEditorProps = Omit<
  OptimizedPlateEditorProps,
  'suggestedText' | 'plateEditor'
>

const DiffPlateEditor = ({
  value,
  autoFocus,
  ...props
}: DiffPlateEditorProps) => {
  const {
    editor,
    handleSuggestionAccepted,
    handleSuggestionRejected,
    suggestedText,
  } = useDiffContext()
  const [localAutoFocus, setLocalAutoFocus] = useState(autoFocus)
  const [isContainerFocused, setIsContainerFocused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const diffEnabled = suggestedText !== undefined

  useEffect(() => {
    // focus the container (to enable hotkeys) when a new text is suggested
    if (diffEnabled) {
      containerRef.current?.focus({
        preventScroll: true,
      })
    }
  }, [diffEnabled, suggestedText])

  const handleFocus: FocusEventHandler<HTMLDivElement> = () => {
    setIsContainerFocused(true)
  }

  const handleBlur: FocusEventHandler<HTMLDivElement> = () => {
    setIsContainerFocused(false)
  }

  useEffect(() => {
    // get focus after suggestion is accepted/rejected
    setLocalAutoFocus(!diffEnabled)
  }, [diffEnabled])

  useHotkeys('ctrl+shift+z,meta+shift+z', handleSuggestionAccepted, {
    enabled: diffEnabled && isContainerFocused,
    enableOnContentEditable: true,
    preventDefault: true,
  })
  useHotkeys('ctrl+z,meta+z', handleSuggestionRejected, {
    enabled: diffEnabled && isContainerFocused,
    enableOnContentEditable: true,
    preventDefault: true,
  })

  return (
    <>
      {diffEnabled && (
        <div
          ref={containerRef}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="outline-none flex flex-1 h-full flex-col"
        >
          <ReadOnlyDiffPlateEditor
            initialText={value}
            suggestedText={suggestedText}
            {...props}
          />
        </div>
      )}
      <div
        className={cn('flex-1 flex-col h-full flex', {
          hidden: diffEnabled,
        })}
      >
        <OptimizedPlateEditor
          plateEditor={editor}
          value={value}
          autoFocus={localAutoFocus}
          {...props}
        />
      </div>
    </>
  )
}

export default DiffPlateEditor
