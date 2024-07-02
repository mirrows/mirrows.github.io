import Head from 'next/head'
import style from './index.module.scss'
import SVGIcon from '@/components/SVGIcon'

export default function Gemini() {
  return (
    <>
      <Head>
        <title>Gemini</title>
        <meta name="description" content="AI chat use in Gemini" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={style.wrap}>
          <div className={style.left_wrap}></div>
          <div className={style.right_wrap}>
            <div className={style.right_contact_wrap + ' scroll_er'}>
              <div style={{ height: '1000px' }}></div>
            </div>
            <div className={style.right_input_wrap}>
              <input type="text" autoFocus className={style.input} placeholder='请在此处开启聊天' />
              <SVGIcon type="enter" className={style['enter_icon']} />
            </div>
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