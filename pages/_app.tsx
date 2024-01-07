import NavHeader from '@/components/Nav'
import { ipQuery, statisticVisitor, visitorsData } from '@/req/main'
import { stone } from '@/utils/global'
import type { AppProps } from 'next/app'
import { useEffect, useRef, useState } from 'react'
import '../public/common.css';
import { useRouter } from 'next/router'
import { useLazyImgs } from '@/utils/imgTool'
import { IPDetail } from '@/types/global'

export default function App({ Component, pageProps }: AppProps) {
  const statistics = async () => {
    // if (process.env.NODE_ENV !== 'production') return
    let detail = sessionStorage.detail
    if (!detail?.ip) {
      const { data } = await ipQuery()
      detail = data
      detail && sessionStorage.setItem('detail', JSON.stringify(detail))
    } else {
      try {
        detail = JSON.parse(detail)
      } catch {
        const { data }: { data: IPDetail } = await ipQuery()
        detail = data
        detail && sessionStorage.setItem('detail', JSON.stringify(detail || {}))
      }
    }
    if (!detail?.ip) return
    stone.set({ ipDetail: detail })
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
    </>
  )
}
