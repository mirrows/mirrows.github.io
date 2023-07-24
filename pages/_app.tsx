import NavHeader from '@/components/Nav'
import { ipQuery, statisticVisitor, visitorsData } from '@/req/main'
import { stone } from '@/utils/global'
import type { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import '../public/common.css';
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
    stone.set({ stayTime: stayTime.current })
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
    }
    const timer = setInterval(() => {
      stayTime.current = stayTime.current + 1
      stone.set({ stayTime: stayTime.current })
    }, 1000)
    router.events.on('routeChangeStart', () => {
      stone.set({ stayTime: stayTime.current })
      loadingStart()
    })
    router.events.on('routeChangeComplete', () => {
      loadingEnd()
    })
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
      <Component {...pageProps} />
      <Div style={{ width: '100vw' }}>
        <div className={`ps_mask${loading ? '' : ' hidden'}`}>
          <div className="loading_wrap" style={{ width: '120px', margin: '20% auto 0' }}>
            <img style={{width: '100%'}} src="https://empty.t-n.top/pub_lic/2023_04_29/pic1682756884211870.gif" alt="loading img" />
          </div>
        </div>
      </Div>
    </>
  )
}
