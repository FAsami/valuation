import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@/providers'
import 'antd/dist/reset.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  )
}
