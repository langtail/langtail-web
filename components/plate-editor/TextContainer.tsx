import React, { useEffect } from 'react'
import {
  focusEditor,
  getEndPoint,
  PlateContent,
  usePlateSelectors,
  type PlateContentProps,
} from '@udecode/plate-common'

import { clsx as cn } from 'clsx'

export type Padding<T> = T | { top?: T; right?: T; bottom?: T; left?: T }

export interface TextContainerProps
  extends Omit<
    PlateContentProps,
    | 'spellCheck'
    | 'autoComplete'
    | 'autoCorrect'
    | 'autoCapitalize'
    | 'autoSave'
  > {
  padding?: string | number | Padding<number | string>
  style?: React.CSSProperties
}

const TextContainer = React.forwardRef<HTMLDivElement, TextContainerProps>(
  (
    { className, disabled, readOnly, padding, style, autoFocus, ...props },
    ref
  ) => {
    const contentStyle = {
      paddingTop: typeof padding === 'object' ? padding.top : padding,
      paddingRight: typeof padding === 'object' ? padding.right : padding,
      paddingBottom: typeof padding === 'object' ? padding.bottom : padding,
      paddingLeft: typeof padding === 'object' ? padding.left : padding,
      ...style,
    }

    const editorSelector = usePlateSelectors().editor()

    useEffect(() => {
      if (autoFocus && editorSelector) {
        setTimeout(() => {
          // in case you want select all text in the editor:
          // const range = getRange(editorSelector, [0])
          const end = getEndPoint(editorSelector, [0])
          focusEditor(editorSelector, end)
        }, 100)
      }
    }, [autoFocus, editorSelector])

    return (
      <div className="relative w-full flex-1">
        <PlateContent
          style={contentStyle}
          ref={ref}
          className={cn(
            'relative overflow-x-auto overflow-y-hidden whitespace-pre-wrap break-words',
            'w-full rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none',
            '[&_[data-slate-placeholder]]:!opacity-100 dark:[&_[data-slate-placeholder]]:text-muted-foreground',
            '[&_[data-slate-placeholder]]:top-[auto_!important] [&_strong]:font-bold',
            'font-mono caret-slate-700 dark:caret-slate-300',
            className as string
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          aria-disabled={disabled}
          autoFocus={autoFocus}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          autoSave="off"
          {...props}
        />
      </div>
    )
  }
)
TextContainer.displayName = 'Editor'

export { TextContainer }
