import { IPDetail, Preview } from "@/types/global"
import { stone } from "@/utils/global"
import { useCallback, useEffect, useState } from "react"
import style from './index.module.scss'


type Time = {
  year: number,
  month: number,
  date: number,
  hour: number,
  minute: number,
  secend: number
}

export default function PreviewPannel() {
  const [preview, setPreview] = useState<Partial<Preview>>()
  const [stayTime, setStayTime] = useState(0)
  const [ipDetail, setIPDetail] = useState<Partial<IPDetail>>({})
  const [totalStayTime, setTotalStayTime] = useState<number[]>([])
  const queryPreviewData = () => {
    try {
      const detail = JSON.parse(sessionStorage.detail);
      setIPDetail(detail)
    } catch {
      setIPDetail({})
    }
    stone.on('ip', ({ data, detail }) => {
      if(!data) return;
      const preview = {
        ip: detail?.ip,
        data: data.data,
      }
      setPreview(preview)
      setIPDetail(detail)
    })
  }
  const setDate = (dateObj: Date, options: Partial<Time>) => {
    const { year, month, date, hour, minute, secend } = options;
    return new Date(
      year || dateObj.getFullYear(),
      month || dateObj.getMonth(),
      date || dateObj.getDate(),
      hour || dateObj.getHours(),
      minute || dateObj.getMinutes(),
      secend || dateObj.getSeconds(),
    )
  }
  const intervalUntilNow = useCallback(() => {
    const startTime = new Date(2023, 1, 2, 17, 58)
    const now = new Date()
    const lastMonthTotal = Math.round((new Date(
      startTime.getFullYear(),
      startTime.getMonth() + 1,
      1
    ).getTime() - new Date(
      startTime.getFullYear(),
      startTime.getMonth(),
      1
    ).getTime()) / (24 * 60 * 60 * 1000))
    const sameYear = setDate(startTime, { year: now.getFullYear() })
    const year = now.getFullYear() - startTime.getFullYear() + (now.getTime() >= sameYear.getTime() ? 0 : -1) // 年
    const sameMonth = setDate(sameYear, { month: now.getMonth() })
    const month = (now.getMonth() - startTime.getMonth() + (now.getTime() >= sameMonth.getTime() ? 0 : -1)) % 12 // 月
    const sameDate = setDate(sameMonth, { month: now.getMonth(), date: now.getDate() })
    const date = (now.getDate() - startTime.getDate() + (now.getTime() >= sameDate.getTime() ? 0 : -1) + lastMonthTotal) % lastMonthTotal // 日
    const hour = Math.floor((now.getTime() - startTime.getTime()) % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)) // 时
    const minute = Math.floor(((now.getTime() - startTime.getTime()) % (24 * 60 * 60 * 1000)) / 1000 / 60) % 60 // 分
    const secend = Math.floor((now.getTime() - startTime.getTime()) / 1000) % 60 // 秒
    return [year, month, date, hour, minute, secend]
  }, [])
  useEffect(() => {
    const { preview, stayTime } = stone.data
    preview && setPreview(preview)
    setStayTime(stayTime)
    queryPreviewData()
    const timer = setInterval(() => {
      const { stayTime } = stone.data
      setStayTime(stayTime)
      setTotalStayTime(intervalUntilNow())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalUntilNow])
  return (
    <div className={style['blog_editor_wrap']}>
      <div className={style['items_wrap']}>
        {preview && <span className={style['tag_item']}>IP地址：<span className={style['tag_value']}>{preview?.ip}</span></span>}
        {!!preview?.data?.today && <span className={style['tag_item']}>今日访问数：<span className={style['tag_value']}>{preview?.data.today}</span></span>}
        {<span className={style['tag_item']}>当前访问时长：<span className={style['tag_value']}>{
          String(Math.floor(stayTime / (60 * 60))).padStart(2, '0')
        }: {
            String(Math.floor(stayTime / 60) % 60).padStart(2, '0')
          }: {
            String(Math.floor(stayTime % 60)).padStart(2, '0')
          }</span></span>}
      </div>
      <div><span className={style['tag_item']}>IP来自：<span className={style['tag_value']}></span>{ipDetail.country} {ipDetail.province} {ipDetail.city} {ipDetail.area}</span></div>
      <div className={style['items_wrap']}>
        {!!preview?.data?.total && <span className={style['tag_item']}>总访问数：<span className={style['tag_value']}>{preview?.data.total}</span></span>}
        <span className={style['tag_item']}>网站已运行：<span className={style['tag_value']}>{
          totalStayTime[0] ? `${totalStayTime[0]}年` : ''
        }{
            totalStayTime[1] || totalStayTime[0] ? `${totalStayTime[1]}月` : ''
          }{
            totalStayTime[2] || totalStayTime[1] || totalStayTime[0] ? `${totalStayTime[2]}天` : ''
          }{
            totalStayTime[3]
          }小时{
            totalStayTime[4]
          }分{
            totalStayTime[5]
          }秒</span></span>
      </div>
    </div>
  )
}
