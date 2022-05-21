import '../styles/globals.css'
import type { AppProps } from 'next/app'

import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import client from '../apollo-client'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Home/Header/Header.component'
import { ApolloProvider } from '@apollo/client'
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <div className="h-screen overscroll-y-auto bg-slate-200">
          <Header />

          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
