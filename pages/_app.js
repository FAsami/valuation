import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@/providers'
import 'antd/dist/reset.css'
import Layout from '@/components/Layout'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  )
}
