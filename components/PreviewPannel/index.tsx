import { IPDetail, Preview } from "@/types/global"
import { stone } from "@/utils/global"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"

type Time = {
  year: number,
  month: number,
  date: number,
  hour: number,
  minute: number,
  secend: number
}


const DIV = styled.div`
  position: relative;
  margin: 10px auto;
  padding: 10px 0;
  z-index: 26;
  text-align:center;
  box-sizing: border-box;
  font-size: 12px;
  color: #fff;
  .items_wrap{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 20px;
    white-space: pre-wrap;
  }
  &:before{
    content: '';
    position: absolute;
    left: 35px;
    right: 35px;
    top: 25px;
    bottom: 25px;
    background-color: rgba(0,0,0,.5);
    box-shadow: 0 0 20px 30px  rgba(0,0,0,.5);
    z-index: -1;
  }
  .tag_item{
    margin-right: 10px;
    .tag_value{
      font-size: 14px;
      font-weight: bold;
      white-space: nowrap;
    }
  }
`

export default function PreviewPannel() {
  const [preview, setPreview] = useState<Partial<Preview>>()
  const [stayTime, setStayTime] = useState(0)
  const [ipDetail, setIPDetail] = useState<Partial<IPDetail>>({})
  const [totalStayTime, setTotalStayTime] = useState<number[]>([])
  const queryPreviewData = () => {
    const detail = sessionStorage.detail;
    if(detail) {
      setIPDetail(JSON.parse(detail))
    } else {
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
    // console.log('ggg1', newDate.toLocaleDateString())
    const sameMonth = setDate(startTime, { month: now.getMonth() })
    const month = now.getMonth() - startTime.getMonth() + (now.getTime() >= sameYear.getTime() ? 0 : 12) + (now.getTime() >= sameMonth.getTime() ? 0 : -1) // 月
    const sameDate = setDate(startTime, { month: now.getMonth(), date: now.getDate() })
    const date = now.getDate() - startTime.getDate() + (now.getTime() >= sameMonth.getTime() ? 0 : lastMonthTotal) + (now.getTime() >= sameDate.getTime() ? 0 : -1) // 日
    // console.log('ggg3', newDate.toLocaleDateString())
    const hour = Math.floor((now.getTime() - startTime.getTime()) % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)) // 时
    const minute = Math.floor(((now.getTime() - startTime.getTime()) % (24 * 60 * 60 * 1000)) / 1000 / 60) % 60 // 分
    const secend = Math.floor((now.getTime() - startTime.getTime()) / 1000) % 60 // 秒
    return [year, month, date, hour, minute, secend]
  }, [])
  useEffect(() => {
    const { preview, stayTime } = stone.data
    preview && setPreview(preview)
    stayTime && setStayTime(stayTime)
    queryPreviewData()
    setTotalStayTime(intervalUntilNow())
    const timer = setInterval(() => {
      const { stayTime } = stone.data
      setStayTime(stayTime)
      setTotalStayTime(intervalUntilNow())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [intervalUntilNow])
  return (
    <DIV>
      <div className="items_wrap">
        {preview && <span className="tag_item">IP地址：<span className="tag_value">{preview?.ip}</span></span>}
        {!!preview?.data?.today && <span className="tag_item">今日访问数：<span className="tag_value">{preview?.data.today}</span></span>}
        {!!stayTime && <span className="tag_item">当前访问时长：<span className="tag_value">{
          String(Math.floor(stayTime / (60 * 60))).padStart(2, '0')
        }: {
            String(Math.floor(stayTime / 60) % 60).padStart(2, '0')
          }: {
            String(Math.floor(stayTime % 60)).padStart(2, '0')
          }</span></span>}
      </div>
      <div><span className="tag_item">IP来自：<span className="tag_value"></span>{ipDetail.country} {ipDetail.province} {ipDetail.city} {ipDetail.area}</span></div>
      <div className="items_wrap">
        {!!preview?.data?.total && <span className="tag_item">总访问数：<span className="tag_value">{preview?.data.total}</span></span>}
        <span className="tag_item">网站已运行：<span className="tag_value">{
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
    </DIV>
  )
}
