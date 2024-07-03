import Head from 'next/head'
import style from './index.module.scss'
import SVGIcon from '@/components/SVGIcon'
import { useEffect, useRef, useState } from 'react'
import { chatAnswer, chatQuestion, initGemini } from '@/req/gemini';
import { Chat } from '@/types/gemini';

export default function Gemini() {
  const [text, setText] = useState('');
  const [times, setTimes] = useState(0);
  const [history, setHistory] = useState<Chat[]>([]);
  const historyRef = useRef<Chat[]>([]);
  const submit = () => {
    const msg = text.trim()
    if(!msg) return
    chatQuestion({
      msg,
    }).then(res => {
      console.log(res);
      historyRef.current = [...history, {
        role: 'user',
        parts: [{text: msg}]
      },{
        role: 'model',
        parts: [{text: msg}]
      }]
      setHistory(() => [...historyRef.current]);
      setText('');
      if (res.id) {
        queryAnswer(res.id)
      }
    }).catch((err) => {
      console.log(err);
    })
    // const ipDetail = stone.get('ipDetail');
    // console.log(ipDetail);
  }
  const queryAnswer = (id: string, times = 0) => {
    chatAnswer({ id }).then(res => {
      if (res.code) {
        console.log(res)
        return
      }
      const list = historyRef.current
      const last = list[list.length - 1];
      if (!res.data.answer.length || res.data.answer.length > (last.parts?.length || 0) || times < 3) {
        const time = res.data.answer.length === (last.parts?.length || 0) ? times + 1 : 1
        last.parts = res.data.answer
        historyRef.current = [...historyRef.current.slice(0, -1), last]
        setHistory(() => {
          return [...historyRef.current]
        })
        console.log(historyRef.current)
        setTimeout(() => {
          queryAnswer(id, time)
        }, 3000)
      }
    })
  }
  const init = () => {
    initGemini({}).then(res => {
      console.log(res);
      setTimes(res.times);
    })
  }
  const addNewChat = () => {
    init();
  }
  useEffect(() => {
  }, []);
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
          <div className={style.left_wrap}>
            <div className={style['new_chat_items']}></div>
            <div className={style['new_chat_wrap']} onClick={addNewChat}>
              <SVGIcon type="plus" className={style['new_chat_btn']} />
            </div>
          </div>
          <div className={style.right_wrap}>
            <div className={style.right_contact_wrap + ' scroll_er'}>
              <div style={{ height: '1000px' }}></div>
            </div>
            {times ? <div className={style.right_input_wrap}>
              <input type="text" defaultValue={text} autoFocus className={style.input} placeholder={`请在此处开启聊天(剩余聊天次数：${times}次)`} onInput={(e) => setText((e.target as HTMLInputElement)?.value)} />
              <SVGIcon type="enter" disabled={!text} className={style['enter_icon']} onClick={submit} />
            </div> : ''}
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