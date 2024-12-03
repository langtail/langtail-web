'use client'

interface AssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const assetPrefix =
  process.env.NEXT_PUBLIC_NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`
    : `http://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`

export function AssetImage({ src, ...props }: AssetImageProps) {
  const assetPrefix =
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`
      : `http://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`

  return (
    <img
      src={`${assetPrefix}${src}`}
      {...props}
      fetchPriority="high"
      loading="eager"
      onLoad={(e) => {
        const img = e.target as HTMLImageElement
        img.style.removeProperty('visibility')
        props.onLoad?.(e)
      }}
      style={{ visibility: 'hidden', ...props.style }}
    />
  )
}
