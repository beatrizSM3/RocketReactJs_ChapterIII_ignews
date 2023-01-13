
import type { AppProps } from 'next/app'
import { Header } from '../components/Header/header'
import '../styles/global.scss'
import {SessionProvider as NextAuthProvider} from 'next-auth/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
        <NextAuthProvider session={pageProps.session} basePath={process.env.NEXTAUTH_URL}>
            <Header/>
            <Component {...pageProps} />
        </NextAuthProvider>
  )
}
