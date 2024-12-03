'use client'

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function AssetImage({ src, ...props }: AssetImageProps) {
  const assetPrefix =
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`
      : `http://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`

  return <img src={`${assetPrefix}${src}`} {...props} />
}
