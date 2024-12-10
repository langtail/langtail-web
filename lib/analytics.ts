import mixpanel from 'mixpanel-browser'

// Initialize Mixpanel
export const initMixpanel = () => {
  // Replace YOUR_PROJECT_TOKEN with your actual Mixpanel project token
  mixpanel.init('YOUR_PROJECT_TOKEN', {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: true,
    api_host: process.env.NEXT_PUBLIC_MIXPANEL_API_HOST,
  })
}

// Track page view
export const trackPageView = (pathname: string) => {
  mixpanel.track('Page View', {
    path: pathname,
  })
}

// Export Mixpanel instance for other tracking needs
export const analytics = mixpanel
