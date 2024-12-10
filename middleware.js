import { NextResponse } from 'next/server'

import requestIp from 'request-ip'

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/mp/:path*'],
}

// Proxies /product/:id to https://my-proxied-site.com/product/:id
export function mixpanelMiddleware(request) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(
    'X-REAL-IP',
    requestIp.getClientIp(request) || request.ip || ''
  )

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  })
}

export default mixpanelMiddleware
