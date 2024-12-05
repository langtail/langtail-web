import { streamText, tool } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { langtail } from 'langtail/vercel-ai'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { messages, prompt, results } = await req.json()

    console.log('messages', messages, 'prompt', prompt, 'results', results)

    const response = await streamText({
      model: langtail('white-ninja'),
      temperature: 0.5,
      messages,
      tools: {
        // proposeUserAction: tool({
        //   description: `Suggest what the user might want to say next so they don't need to write it all themselves. We want to propose obvious user actions in the chat.`,
        //   parameters: z.object({
        //     shortTitle: z
        //       .string()
        //       .describe('A brief title for the proposed action'),
        //   }),
        // }),
        suggestPrompt: tool({
          description: 'Suggest a new prompt.',
          parameters: z.object({
            newPrompt: z.string().describe('The new prompt to suggest'),
          }),
        }),
      },
    })

    return response.toDataStreamResponse()
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    )
  }
}
