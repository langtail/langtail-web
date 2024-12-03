'use client'

import Image from 'next/image'

interface AssetImageProps
  extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  src: string
}

export function AssetImage({ src, ...props }: AssetImageProps) {
  const assetPrefix =
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`
      : `http://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`

  return (
    <Image
      src={`${assetPrefix}${src}`}
      {...props}
      width={props.width || 128}
      height={props.height || 128}
      unoptimized={false}
    />
  )
}
