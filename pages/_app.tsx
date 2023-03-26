import type { AppProps } from 'next/app'
import '../public/common.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
