import Head from 'next/head'
import { useEffect, useState } from 'react'
import style from './index.module.scss'

export default function Game2048() {
  const [show, isShow] = useState(false)
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
        <div className={style['game_2048_wrap']}>
          {show && <iframe className={style['fire_wrap']} src="https://empty.t-n.top/html/2048.html"></iframe>}
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