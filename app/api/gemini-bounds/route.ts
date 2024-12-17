import { generateObject, tool } from 'ai'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { langtail } from 'langtail/vercel-ai'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { query, image } = await req.json()

    const { object } = await generateObject({
      model: langtail('gemini-bounds'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Detect ${query || 'items'}, with no more than 20 items. Output a json list where each entry contains the 2D bounding box in "box_2d" and a text label in "label".`,
            },
            { type: 'image', image: image },
          ],
        },
      ],
      schema: z.object({
        annotations: z.array(
          z.object({
            box_2d: z.array(z.number()),
            label: z.string(),
          })
        ),
      }),
    })

    return NextResponse.json({ annotations: object.annotations })
  } catch (error) {
    console.error('Error in chat route:', error)
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin':
        process.env.ALLOWED_ORIGINS || 'http://localhost:3001',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}

// Your existing route handlers should also include CORS headers
export async function GET() {
  return NextResponse.json(
    {
      /* your response data */
    },
    {
      headers: {
        'Access-Control-Allow-Origin':
          process.env.ALLOWED_ORIGINS || 'http://localhost:3001',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  )
}
