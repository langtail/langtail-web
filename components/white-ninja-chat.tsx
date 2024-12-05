'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Send, Mic, MicOff } from 'lucide-react'
import { AssetImage } from './ui/asset-image'
import type { ChallengeResult } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { getApiUrl } from '@/lib/api-utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface WhiteNinjaChatProps {
  prompt: string
  results: ChallengeResult[]
  onSuggestPrompt?: (suggestion: string) => void
}

type NinjaState = 'idle' | 'thinking' | 'talking'

const frames = ['A', 'B', 'C']

// At the very top of the file, before any imports
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition
    webkitSpeechRecognition?: new () => SpeechRecognition
  }
}

// Add these type declarations at the top of the file
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: any) => void
  onend: () => void
  start: () => void
  stop: () => void
}

type SpeechRecognitionResult = {
  transcript: string
  [key: string]: any
}

type SpeechRecognitionEvent = {
  results: SpeechRecognitionResult[][]
  error?: string
}

type SpeechRecognitionErrorEvent = {
  error: string
}

export function WhiteNinjaChat({
  prompt,
  results,
  onSuggestPrompt,
}: WhiteNinjaChatProps) {
  const [initialSent, setInitialSent] = useState(false)
  const { messages, input, handleSubmit, isLoading, setInput, append } =
    useChat({
      api: getApiUrl('/api/chat'),
      body: { prompt, results },
      initialMessages: [
        {
          id: 'initial-message',
          role: 'assistant',
          content: `Greetings, seeker of prompt wisdom! 🥷

I'm here to help you craft effective prompts.`,
        },
      ],
      onToolCall: ({ toolCall }) => {
        if (toolCall.toolName === 'suggestPrompt' && onSuggestPrompt) {
          const suggestion = toolCall.args as { newPrompt: string }
          onSuggestPrompt(suggestion.newPrompt)

          return true
        }
      },
    })
  const [ninjaState, setNinjaState] = useState<NinjaState>('thinking')
  const [frame, setFrame] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const [hasScrolledForMessage, setHasScrolledForMessage] = useState<
    string | null
  >(null)
  const [userHasScrolled, setUserHasScrolled] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (initialSent) return

    if (prompt) {
      setInitialSent(true)
      setInput(
        `Hello! I had some challenges with this prompt:

"${prompt}"`
      )
    }
  }, [prompt])

  // Update ninja state based on chat status
  useEffect(() => {
    if (isLoading) {
      setNinjaState('thinking')
    } else if (
      messages.length > 0 &&
      messages[messages.length - 1].role === 'assistant'
    ) {
      setNinjaState('talking')
      setTimeout(() => setNinjaState('idle'), 2000)
    }
  }, [isLoading, messages])

  // Ninja animation
  useEffect(() => {
    if (ninjaState === 'idle') return

    const interval = setInterval(() => {
      setFrame((current) => (current + 1) % frames.length)
    }, 300)
    return () => clearInterval(interval)
  }, [ninjaState])

  // Add scroll event listener to detect user scrolling
  useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (!scrollArea) return

    const handleScroll = () => {
      setUserHasScrolled(true)
    }

    scrollArea.addEventListener('scroll', handleScroll)
    return () => scrollArea.removeEventListener('scroll', handleScroll)
  }, [])

  // Modified scroll behavior
  useEffect(() => {
    if (!messages.length) return

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || hasScrolledForMessage === lastMessage.id) return

    const scrollArea = scrollAreaRef.current
    const messagesEnd = messagesEndRef.current
    if (!scrollArea || !messagesEnd) return

    const isAtBottom =
      Math.abs(
        scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight
      ) < 10

    // Scroll only if:
    // 1. We haven't scrolled for this message yet, AND
    // 2. Either we're at the bottom OR it's a new assistant message and user hasn't manually scrolled
    if (isAtBottom || (lastMessage.role === 'assistant' && !userHasScrolled)) {
      messagesEnd.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      setHasScrolledForMessage(lastMessage.id)
    }

    // Reset userHasScrolled when a new message comes in
    if (lastMessage.role === 'user') {
      setUserHasScrolled(false)
    }
  }, [messages, hasScrolledForMessage, userHasScrolled])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('')

          setInput(transcript)
        }

        recognitionRef.current.onerror = (
          event: SpeechRecognitionErrorEvent
        ) => {
          console.error('Speech recognition error:', event.error)
          setIsRecording(false)
        }

        recognitionRef.current.onend = () => {
          setIsRecording(false)
        }
      }
    }
  }, [setInput])

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser')
      return
    }

    if (isRecording) {
      console.log('Stopping speech recognition...')
      recognitionRef.current.stop()
      setIsRecording(false)
    } else {
      try {
        console.log('Starting speech recognition...')
        recognitionRef.current.start()
        setIsRecording(true)
      } catch (error) {
        console.error('Failed to start recording:', error)
        setIsRecording(false)
      }
    }
  }

  console.log('messages', messages)

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <AssetImage
          src={`/images/white-ninja/standing${frames[frame]}.png`}
          alt="White ninja"
          className={cn(
            'w-12 h-12 transition-all duration-300',
            ninjaState === 'thinking' && 'scale-110',
            ninjaState === 'talking' && 'translate-y-[-2px]'
          )}
          style={{ imageRendering: 'pixelated' }}
        />
        <div>
          <h2 className="text-lg font-semibold">Prompt Sensei</h2>
          <p className="text-sm text-muted-foreground">
            {ninjaState === 'thinking'
              ? 'Thinking...'
              : 'Here to help you improve'}
          </p>
        </div>
      </div>

      <ScrollArea
        className="flex-1 pr-4 mb-4 h-full overflow-y-auto"
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === 'user'
                  ? 'justify-end'
                  : 'justify-start flex-col gap-2'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {message.toolInvocations
                  ?.filter(
                    (toolInvocation) =>
                      toolInvocation.toolName === 'proposeUserAction'
                  )
                  .map((toolInvocation) => (
                    <Button
                      key={toolInvocation.toolCallId}
                      variant="secondary"
                      size="sm"
                      className=""
                      onClick={(e) => {
                        e.preventDefault()
                        append({
                          role: 'user',
                          content: toolInvocation.args.shortTitle,
                        })
                      }}
                    >
                      {toolInvocation.args.shortTitle}
                    </Button>
                  ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start flex-col gap-2">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted/50">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} style={{ height: '1px' }} />
        </div>
      </ScrollArea>

      <div className="relative w-full bg-muted/50 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-primary">
        <form onSubmit={handleSubmit} className="w-full">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for help improving your prompt..."
            className="resize-none border-none focus:border-none focus:ring-0 focus:outline-none rounded-none pb-16 bg-transparent focus-within:border-none focus-visible:border-none  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 field-sizing:content min-h-0 pb-0 max-h-[100px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !isRecording) {
                e.preventDefault()
                handleSubmit(e as any)
              }
            }}
          />
          <div className=" p-3 flex justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    onClick={toggleRecording}
                    variant="ghost"
                    className={cn(
                      'h-8 w-8 hover:bg-muted relative',
                      isRecording && 'text-red-500'
                    )}
                  >
                    {isRecording ? (
                      <>
                        <Mic className="h-4 w-4" />
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      </>
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isRecording ? 'Stop recording' : 'Start voice recording'}
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:bg-muted"
                    disabled={isLoading || isRecording || input.length === 0}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </form>
      </div>
    </Card>
  )
}
