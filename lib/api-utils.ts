/**
 * Creates a full URL for API requests by combining the base URL with the provided path
 */
export function getApiUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL === '1'
      ? `https://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`
      : `http://${process.env.NEXT_PUBLIC_PROJECT_PRODUCTION_URL}`

  // Ensure path starts with slash and remove any duplicate slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

/**
 * Wrapper around fetch that automatically handles API URL prefixing
 */
export async function apiFetch(path: string, options?: RequestInit) {
  const url = getApiUrl(path)
  return fetch(url, options)
}
