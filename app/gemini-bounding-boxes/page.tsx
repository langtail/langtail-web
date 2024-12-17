import type { Metadata } from 'next'
import { assetPrefix } from '@/lib/utils'
import { GeminiBoundingBoxesClient } from './gemini-bounding-boxes-client'

export const metadata: Metadata = {
  title: 'Gemini Bounding Boxes: Object Detection with Gemini 2.0 | Langtail',
  description:
    "Upload images and detect objects using Google's Gemini 2.0 Flash experimental model. Get precise bounding boxes and labels for any object in your images.",
  keywords: [
    'object detection',
    'Gemini 2.0',
    'bounding boxes',
    'image analysis',
    'AI vision',
    'Google Gemini',
    'computer vision',
    'image recognition',
  ],
  authors: [{ name: 'Langtail Team' }],
  alternates: {
    canonical: `${process.env.CANONICAL_URL}/gemini-bounding-boxes`,
  },
  openGraph: {
    title: 'Gemini Bounding Boxes: Object Detection with Gemini 2.0 | Langtail',
    description:
      "Upload images and detect objects using Google's Gemini 2.0 Flash experimental model. Get precise bounding boxes and labels for any object in your images.",
    url: 'https://langtail.com/gemini-bounding-boxes',
    siteName: 'Langtail',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${assetPrefix}/images/gemini-bounds/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Langtail - Gemini Bounding Boxes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Bounding Boxes: Object Detection with Gemini 2.0 | Langtail',
    description:
      "Upload images and detect objects using Google's Gemini 2.0 Flash experimental model. Get precise bounding boxes and labels for any object in your images.",
    creator: '@langtail',
    images: [`${assetPrefix}/images/gemini-bounds/og.jpg`],
  },
}

export default function GeminiBoundingBoxesPage() {
  return <GeminiBoundingBoxesClient />
}
