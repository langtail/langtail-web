'use client'

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

import { assetPrefix } from '@/lib/utils'

export function AssetImage({ src, ...props }: AssetImageProps) {
  return (
    <img
      src={`${assetPrefix}${src}`}
      {...props}
      fetchPriority="high"
      loading="eager"
    />
  )
}
