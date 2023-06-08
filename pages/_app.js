import '@/styles/globals.css'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useMemo } from 'react'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
// import tr from 'javascript-time-ago/locale/tr.json'
TimeAgo.addDefaultLocale(en)

export default function App({ Component, pageProps }) {
  const supabaseClient = useMemo(() => createPagesBrowserClient(), [])

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
