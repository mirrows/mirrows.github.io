import NavHeader from '@/components/Nav'
import { statisticVisitor, visitorsData } from '@/req/main'
import { stone } from '@/utils/global'
import type { AppProps } from 'next/app'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import '../public/common.css'

const Div = styled.div`
  .hidden{
    display: none;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  const statistics = () => {
    // if (process.env.NODE_ENV !== 'production') return
    visitorsData()
  }
  const stayTime = useRef(0)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const canvasObj = useRef<{ ruin: () => void; }>()
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
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <NavHeader />
      <Component {...pageProps} />
      <Div>
        <div className="ps_mask hidden">
          <div className="loading_wrap">
            <img src="https://empty.t-n.top/pub_lic/2023_04_29/pic1682756884211870.gif" alt="loading img" />
          </div>
        </div>
      </Div>
    </>
  )
}
