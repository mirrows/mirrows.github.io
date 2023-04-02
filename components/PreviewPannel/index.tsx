import { visitorsData } from "@/req/main"
import { stone } from "@/utils/global"
import { useEffect, useState } from "react"
import styled from "styled-components"

type Preview = {
  ip: string,
  data: {
    total: number,
    today: number,
    visitorTime: number,
  }
}


const DIV = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  right:0;
  width: fit-content;
  margin: auto;
  padding: 10px 20px;
  z-index: 26;
  text-align:center;
  font-size: 12px;
  color: #fff;
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
    white-space: nowrap;
    .tag_value{
      font-size: 14px;
      font-weight: bold;
    }
  }
`

export default function PreviewPannel() {
  const [preview, setPreview] = useState<Preview>()
  const [stayTime, setStayTime] = useState(0)
  const [totalStayTime, setTotalStayTime] = useState<number[]>([])
  const queryPreviewData = () => {
    visitorsData().then(res => {
      setPreview({
        ip: res.ip,
        data: res.data
      })
    })
  }
  const intervalUntilNow = () => {
    const StartTime = new Date(2023, 2, 9, 17)
    const lastMonthTotal = Math.round((new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getTime() - new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    ).getTime()) / (24 * 60 * 60 * 1000))
    return [
      new Date().getFullYear() - StartTime.getFullYear(), // 年
      new Date().getMonth() - StartTime.getMonth() + (new Date().getFullYear() - StartTime.getFullYear() > 0 ? 12 : 0) + new Date().getMonth() - StartTime.getMonth() ? 0 : -1, // 月
      new Date().getDate() - StartTime.getDate() + (new Date().getDate() - StartTime.getDate() > 0 ? 0 : lastMonthTotal), // 日
      Math.floor((new Date().getTime() - StartTime.getTime()) % (24 * 60 * 60 * 1000) / (60 * 60 * 1000)), // 时
      Math.floor(((new Date().getTime() - StartTime.getTime()) % (24 * 60 * 60 * 1000)) / 1000 / 60) % 60, // 分
      Math.floor((new Date().getTime() - StartTime.getTime()) / 1000) % 60, // 秒
    ]
  }
  useEffect(() => {
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
  }, [])
  return (
    <DIV>
      <div>
        {preview && <span className="tag_item">IP地址：<span className="tag_value">{preview?.ip}</span></span>}
        {!!preview?.data.today && <span className="tag_item">今日访问数：<span className="tag_value">{preview?.data.today}</span></span>}
        {!!stayTime && <span className="tag_item">当前访问时长：<span className="tag_value">{
          String(Math.floor(stayTime / (60 * 60))).padStart(2, '0')
        }: {
            String(Math.floor(stayTime / 60) % 60).padStart(2, '0')
          }: {
            String(Math.floor(stayTime % 60)).padStart(2, '0')
          }</span></span>}
      </div>
      <div>
        {!!preview?.data.total && <span className="tag_item">总访问数：<span className="tag_value">{preview?.data.total}</span></span>}
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
