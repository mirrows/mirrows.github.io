import NavHeader from '@/components/Nav'
import type { AppProps } from 'next/app'
import '../public/common.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavHeader />
      <Component {...pageProps} />
    </>
  )
}
