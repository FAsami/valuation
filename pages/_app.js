import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '../providers'
import 'antd/dist/reset.css'
import 'animate.css'
import Layout from '../components/Layout'
import { ConfigProvider } from 'antd'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#18c081',
              colorInfo: '#18c081',
            },
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
