import Head from 'next/head'
import style from './index.module.scss'
import SVGIcon from '@/components/SVGIcon'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { chatAnswer, chatQuestion, initGemini } from '@/req/gemini';
import { Chat } from '@/types/gemini';
import { mdHelper, parseBody } from '@/utils/md';
import xss from 'xss';
import MarkdownIt from 'markdown-it';
import { DBls } from '@/utils/dbs';
import { useMobile } from '@/utils/common';
import Modal, { ModalRef } from '@/components/Modal';

type HistoryChat = {
  id: string,
  title: string
  history: Chat[]
}

export default function Gemini() {
  const md = new MarkdownIt();
  const [text, setText] = useState('');
  const [times, setTimes] = useState(0);
  const [title, setTitle] = useState('');
  const titleRef = useRef('');
  const curRef = useRef('');
  const [err, setErr] = useState(false);
  const [history, setHistory] = useState<Chat[]>([]);
  const [list, setList] = useState<HistoryChat[]>([]);
  const historyRef = useRef<Chat[]>([]);
  const msgEnd = useRef<HTMLDivElement>(null);
  const historyDb = useRef<DBls>();
  const isMobile = useMobile()
  const renameModalRef = useRef<ModalRef>(null);
  const [tmpChat, setTmpChat] = useState<HistoryChat| null>(null);
  const submit = () => {
    const msg = text.trim()
    if(!msg) return
    historyRef.current = [...history, {
      role: 'user',
      parts: [{text: msg}]
    },{
      role: 'model',
      parts: []
    }]
    setHistory(() => [...historyRef.current]);
    setText('');
    chatQuestion({
      msg,
    }).then(res => {
      console.log(res);
      setTimes(res.times || 0);
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
        if(res.data.answer.length !== last.parts?.length) {
          last.parts = res.data.answer
          historyRef.current = [...historyRef.current.slice(0, -1), last]
          setHistory(() => {
            return [...historyRef.current]
          })
        }
        console.log(historyRef.current)
        setTimeout(() => {
          queryAnswer(id, time)
        }, 3000)
      }
    }).catch(err => {
      const last = historyRef.current[historyRef.current.length - 1];
      last.parts = [{text: '这个问题，我母鸡啊，CPU都给干坏了,正在重启服务呀,请稍等\n'}]
      setTimes(0);
      setErr(true)
      historyRef.current = [...historyRef.current.slice(0, -1), last]
      setHistory(() => {
        return [...historyRef.current]
      })
      setTimeout(() => {
        init({id: curRef.current, title, history: historyRef.current}).then(() => {
          last.parts.push({text: '服务重启好了，问个别的问题吧'})
          historyRef.current = [...historyRef.current.slice(0, -1), last]
          setErr(false)
          setHistory(() => {
            return [...historyRef.current]
          })
        });
      }, 10000);
      console.log(err);
    })
  }
  const init = (chat?: HistoryChat) => {
    const id = chat?.id || Date.now().toString()
    const title = chat?.title || new Date(+id).toISOString()
    const protectedChat = chat
    if(protectedChat) {
      protectedChat.history = chat?.history.map(his => ({ ...his, parts: his.parts.length ? his.parts : [{text: '\n...我什么都不知道，并试图萌混过关...\n'}] })) || []
    }
    curRef.current = id
    titleRef.current = title
    if (!protectedChat?.id) {
      historyDb.current?.update<HistoryChat>('chat', {id, title, history: protectedChat?.history || [] })
    }
    setHistory(protectedChat?.history || [])
    setTitle(title)
    return initGemini(protectedChat?.id ? {history: protectedChat.history} : {}).then(res => {
      console.log(res);
      if(curRef.current === id) {
        setTimes(res?.times || 0);
      }
    })
  }
  const addNewChat = async () => {
    await init();
    queryList();
  }
  const switchChat = async (chat: HistoryChat) => {
    if (chat.id === curRef.current) return 
    await init(chat);
  }
  const queryList = async () => {
    const chatList: HistoryChat[] = [];
      await historyDb.current?.each<HistoryChat>('chat', (cur) => {
        chatList.push(cur)
      })
      console.log(chatList);
      setList(chatList);
  }
  const openRenameModal = (e?: MouseEvent<HTMLButtonElement>, chat?: HistoryChat) => {
    e?.stopPropagation();
    console.log(chat);
    renameModalRef.current?.open();
    setTmpChat(chat || {
      id: curRef.current,
      title,
      history,
    });
    // historyDb.current?.update<HistoryChat>('chat', {id, title, history: chat?.history || [] })
  }
  const setNewTitle = (title: string) => {
    setTmpChat((val) => {
      return val && {
        ...val,
        title,
      };
    })
  }
  const deleteChat = (e?: MouseEvent<HTMLButtonElement>, chat?: HistoryChat) => {
    e?.stopPropagation();
    historyDb.current?.del('chat', chat?.id || curRef.current || Date.now().toString())
    queryList()
    curRef.current = ''
    setTitle('')
    setHistory([])
    setTimes(0)
  }
  const rename = () => {
    tmpChat && historyDb.current?.update<HistoryChat>('chat', tmpChat).then(() => {
      queryList()
      renameModalRef.current?.close();
      setTitle(tmpChat.title);
    })
  }
  useEffect(() => {
    msgEnd.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    curRef.current && historyDb.current?.update<HistoryChat>('chat', {id: curRef.current, title: titleRef.current, history }).then(() => {
      queryList()
    })
    
  }, [history])
  useEffect(() => {
    titleRef.current = title
  }, [title])
  useEffect(() => {
    const historyDbls = new DBls()
    historyDbls.init({name: 'gemini', table: 'chat'}).then(async () => {
      historyDb.current = historyDbls
      queryList()
    });
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
          <div className={style.left_wrap + (err ? ' err_area' : '')}>
            <div className={style['new_chat_items'] + ' scroll_er'}>
              {list.map(chat => (
                <div key={chat.id} className={`${style.chat_item_wrap} ${(chat.id === curRef.current ? style.active : '')}`} style={!isMobile && chat.id === curRef.current ? {paddingRight:  '2.6rem'} : {}} onClick={() => switchChat(chat)}>
                  <div className='two_line'>{chat.title ? chat.title :new Date(+chat.id).toISOString()}</div>
                  {!isMobile && chat.id === curRef.current ? <div className={style.operate_wrap}>
                    <button className={style.operate_icon_btn} onClick={(e) => openRenameModal(e, chat)}>
                      <SVGIcon type='edit' className={style.operate_icon}></SVGIcon>
                    </button>
                    <button className={style.operate_icon_btn} onClick={(e) => deleteChat(e, chat)}>
                      <SVGIcon type='close' className={style.operate_icon}></SVGIcon>
                    </button>
                  </div> : ''}
                </div>
              ))}
            </div>
            <div className={style['new_chat_wrap']} onClick={addNewChat}>
              <SVGIcon type="plus" className={style['new_chat_btn']} />
            </div>
          </div>
          <div className={style.right_wrap}>
            {title ? <div className={style.cur_chat_title}>
              <span className={style.title_txt}>
              <SVGIcon type='edit' className={style.title_edit_icon} onClick={() => openRenameModal()}></SVGIcon>
              {title}</span>
              <SVGIcon type='close' className={style.title_close_icon} onClick={() => deleteChat()}></SVGIcon>
            </div> : ''}
            <div className={style.right_contact_wrap + ' scroll_er md_detail'}>
              {history.map((chat, i) => (<div key={i} className={style.gemini_msg_item} style={{ marginLeft: chat.role === 'user' ? 'auto' : '0' }}>
                <div className={style.avatar} style={{order: chat.role === 'user' ? '1' : '0'}}>
                  <img className={style.avatar_img} src={chat.role === 'user' ? '/gemini_user.png' : '/gemini_model.webp'} alt="avatar" />
                </div>
                {chat.parts.length ? <div className={style.gemini_msg_item_content} style={{marginLeft: chat.role === 'user' ? 'auto' : ''}} dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(mdHelper(chat.parts.map(part => part.text).join(''))))) }}>
                </div> : <div className={style.gemini_msg_item_content} style={{ textAlign: 'center', padding: '30px 50px', color: '#c9c9c9'}}>莫打扰，我正在在思考... ...</div>}
              </div>))}
              <div ref={msgEnd}></div>
            </div>
            {times ? <div className={style.right_input_wrap}>
              <input type="text" value={text} autoFocus className={style.input} placeholder={`请在此处开启聊天(剩余聊天次数：${times}次)`} onInput={(e) => setText((e.target as HTMLInputElement)?.value)} />
              <SVGIcon type="enter" disabled={!text} className={style['enter_icon']} onClick={submit} />
            </div> : ''}
          </div>
        </div>
        <Modal ref={renameModalRef}>
          <div className={style['rename_wrap']}>
            <div className={style.rename_modal_title}>重命名</div>
            <div className={style['rename_item']}>
              <input type="text" className={style['rename_input']} value={tmpChat?.title} onInput={(e) => setNewTitle((e.target as HTMLInputElement).value)} />
            </div>
            <div className={style['footer']}>
              <button className='outlined_btn' onClick={() => renameModalRef.current?.close()}>cancel</button>
              <button className='normal_btn' onClick={() => rename()}>confirm</button>
            </div>
          </div>
        </Modal>
      </main>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}