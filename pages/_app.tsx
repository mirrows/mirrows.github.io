import NavHeader from '@/components/Nav'
import { statisticVisitor, visitorsData } from '@/req/main'
import { stone } from '@/utils/global'
import type { AppProps } from 'next/app'
import { useEffect, useRef } from 'react'
import '../public/common.css'

export default function App({ Component, pageProps }: AppProps) {
  const statistics = () => {
    // if (process.env.NODE_ENV !== 'production') return
    visitorsData()
  }
  const stayTime = useRef(0)
  const visitorStatistic = () => {
    statisticVisitor(stayTime.current)
    stayTime.current = 0
  }
  useEffect(() => {
    statistics()
    const timer = setInterval(() => {
      stayTime.current = stayTime.current + 1
      stone.set({ stayTime: stayTime.current })
    }, 1000)
    window.addEventListener('beforeunload', visitorStatistic)
    return () => {
      clearInterval(timer)
      window.removeEventListener('beforeunload', visitorStatistic)
    }
  }, [])
  return (
    <>
      <NavHeader />
      <Component {...pageProps} />
    </>
  )
}
