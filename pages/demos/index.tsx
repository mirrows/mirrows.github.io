import LazyImage from '@/components/LazyImage'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import style from './index.module.scss'

export default function Demos() {
  const [show, isShow] = useState(false)
  const [list] = useState([
    {
      name: '抽奖模型',
      icon: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_05_14/pic1715679182511381.png&n=-1&q=80',
      link: '/demos/lottery',
    },
    {
      name: '2048',
      icon: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_05_14/pic1715679181284825.png&n=-1&q=80',
      link: '/demos/2048',
    },
    {
      name: '图床列表',
      icon: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_05_14/pic1715679180092541.jpg&n=-1&q=80',
      link: '/demos/imgSource',
    },
    // {
    //   name: '音乐播放器',
    //   icon: 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_03_29/pic1711679539251661.png&n=-1&q=80',
    //   link: '/demos/musicPlayer',
    // },
  ])
  useEffect(() => {
    isShow(true)
  }, [])
  return (
    <>
      <Head>
        <title>Demos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={style['demos_wrap']}>
          {show && <iframe className={style['fire_wrap']} src="https://empty.t-n.top/html/WebGL%20Fluid%20Simulation.html"></iframe>}
          <div className={style['items_wrap']}>
            {list.map((item, i) => (<Link key={i} className={style['item_wrap']} aria-label={item.name} href={item.link}>
              <div className={style['item']}>
                <div className={style['item_middle']}>
                  <img className={style['item_img']} width="100" height="100" src={item.icon} alt={`demo-${i}`} />
                </div>
              </div>
              <div className={`${style['demo_name']} ${style['two_line']}`}>{item.name}</div>
            </Link>))}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}
