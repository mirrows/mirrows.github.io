import NavHeader from '@/components/Nav'
import { ipQuery, statisticVisitor, visitorsData } from '@/req/main'
import { stone } from '@/utils/global'
import type { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import '../public/common.css';
import LazyImage from '@/components/LazyImage'
import { useRouter } from 'next/router'
import { useLazyImgs } from '@/utils/imgTool'
import { IPDetail } from '@/types/global'

const Div = styled.div`
  .hidden{
    opacity: 0;
    z-index: -10;
    transition: 2s;
    // display: none;
  }
  .disappear{
    opacity: 0;
    z-index: -9;
  }
`



export default function App({ Component, pageProps }: AppProps) {
  const statistics = async () => {
    // if (process.env.NODE_ENV !== 'production') return
    let detail = sessionStorage.detail
    if (!detail) {
      const data = await ipQuery()
      detail = data
      sessionStorage.setItem('detail', JSON.stringify(detail))
    } else {
      try {
        detail = JSON.parse(detail)
      } catch {
        const data: IPDetail = await ipQuery()
        detail = data
        sessionStorage.setItem('detail', JSON.stringify(detail))
      }
    }
    if (!detail.ip) return
    const data = await visitorsData(detail.ip)
    const preview = {
      ip: detail?.ip,
      data: data.data,
    }
    stone.set({ preview })
    stone.emit('ip', { data, detail })
  }
  const stayTime = useRef(0)
  const visitorStatistic = () => {
    const ip = stone.data.preview?.ip
    ip && statisticVisitor(ip, stayTime.current)
    stayTime.current = 0
  }
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const loadingStart = () => {
    setLoading(true)
  }
  const loadingEnd = () => {
    setLoading(false)
  }
  const { emit } = useLazyImgs()
  useEffect(() => {
    if (!stayTime.current) {
      statistics()
      stayTime.current = stayTime.current + 1
    }
    const timer = setInterval(() => {
      stayTime.current = stayTime.current + 1
      stone.set({ stayTime: stayTime.current })
    }, 1000)
    // 安卓手机默认浏览器有兼容问题
    router.events.on('routeChangeStart', loadingStart)
    router.events.on('routeChangeComplete', loadingEnd)
    window.addEventListener('beforeunload', visitorStatistic)
    stone.set({ emit })
    return () => {
      clearInterval(timer)
      window.removeEventListener('beforeunload', visitorStatistic)
    }
  }, [emit, router.events])
  return (
    <>
      <NavHeader />
      {/* <Suspense fallback={
        <Div>
          <div className="ps_mask">
            <div className="loading_wrap">
              <img src="https://empty.t-n.top/pub_lic/2023_04_29/pic1682756884211870.gif" alt="loading img" />
            </div>
          </div>
        </Div>
      }>
        <Component {...pageProps} />
      </Suspense> */}
      <Component {...pageProps} />
      <Div>
        <div className={`ps_mask${loading ? '' : ' hidden'}`}>
          <div className="loading_wrap">
            <LazyImage width="120" height="167" src="https://empty.t-n.top/pub_lic/2023_04_29/pic1682756884211870.gif" alt="loading img" />
          </div>
        </div>
      </Div>
    </>
  )
}
