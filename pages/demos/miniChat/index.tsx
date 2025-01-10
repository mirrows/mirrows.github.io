import { useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import { randomUser } from '@/req/main';
import { io, Socket } from 'socket.io-client';
import MyTextarea from '@/components/MyTextarea';
import { env, stone, unique } from '@/utils/global';
import MdText from '@/components/MdText';
import SVGIcon from '@/components/SVGIcon';
import md5 from 'md5';

type User = {
  roomId: string,
  userName: string,
  socketId: string,
  dc: RTCDataChannel | null,
  pc: RTCPeerConnection | null,
  alive: boolean
}

type Record = {
  id: string,
  type: 'text' | 'file' | 'tips',
  content: string,
  from: User,
  time: string,
}

export default function MiniChat() {
  const [url] = useState('https://raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_28/pic1730078673558002.jpg')

  const leaveRef = useRef(0);
  const ipRef = useRef('');
  const [another, setAnother] = useState<User[]>([]);
  const anotherRef = useRef<User[]>([]);
  const [ready, setReady] = useState(false);
  const socket = useRef<Socket | null>(null);
  const currentIp = useRef('')
  // const pc = useRef<RTCPeerConnection | null>(null);
  const [info, setInfo] = useState<User>({
    roomId: '',
    userName: '',
    socketId: '',
    dc: null,
    pc: null,
    alive: false,
  })
  const infoRef = useRef({
    roomId: '',
    userName: '',
    socketId: '',
    dc: null,
    pc: null,
    alive: false,
  })
  const [isJoined, setJoined] = useState(false);
  const [userExpand, setExpand] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);

  const initInfo = async () => {
    const info = localStorage.info
    if (info) {
      try {
        const newInfo = JSON.parse(info)
        newInfo.socketId = ''
        setInfo(newInfo)
        infoRef.current = newInfo;
        return
      } catch (err) {
        console.log(`fail to parse info`, info);
      }
    }
    const res = await randomUser()
    const name = res?.results?.[0]?.name || ''
    const newInfo = {
      roomId: '',
      userName: name ? `${name.first} ${name.last}` : String(Math.random()).slice(4, 8),
      socketId: '',
      dc: null,
      pc: null,
      alive: false,
    }
    infoRef.current = newInfo;
    setInfo(newInfo)
    localStorage.setItem('info', JSON.stringify(newInfo))
  }
  const sendMsg = (value: string) => {
    console.log(value, anotherRef.current);
    const record: Record = {
      id: unique.get(`${currentIp.current}${infoRef.current.socketId}`),
      type: 'text',
      content: value,
      from: infoRef.current,
      time: new Date().toLocaleString(),
    }
    setRecords((records) => records.concat(record));
    anotherRef.current.forEach((user) => {
      user.dc?.send(JSON.stringify(record));
    })
  }

  const joinRoom = () => {
    if (!infoRef.current.userName) return
    infoRef.current.alive = true;
    infoRef.current.roomId = '';
    localStorage.setItem('info', JSON.stringify(infoRef.current))
    infoRef.current.roomId = md5(ipRef.current) || '';
    socket.current?.emit('join', { info: infoRef.current });
  }

  const leaveRoom = () => {
    console.log('leave room')
    infoRef.current.alive = false;
    anotherRef.current.forEach((user) => {
      user.dc?.send(JSON.stringify({
        id: unique.get(`${currentIp.current}${infoRef.current.socketId}`),
        type: 'tips',
        content: `用户${infoRef.current.userName}离开房间`,
        from: infoRef.current,
        time: new Date().toLocaleString(),
      }));
    })
    socket.current?.emit('leave', infoRef.current);
  }

  async function requestVideoCall() {
    // 发送方开始发送offer
    anotherRef.current.forEach(async (user) => {
      console.log('requestVideoCall')
      const offer = await user.pc?.createOffer()
      await user.pc?.setLocalDescription(offer)
      socket.current?.emit('offer', { offer, info: infoRef.current, to: user })
    })
  }

  const initSocket = () => {
    socket.current = io(env.extraUrl, {
      transports: ['websocket'],  // 使用 WebSocket 作为传输协议
      withCredentials: true       // 允许发送凭据
    })

    socket.current.on('connected', (id) => {
      console.log('new ID:', id)
      setReady(true)
      infoRef.current.socketId = id;
      setInfo(infoRef.current)
      joinRoom();
    });
    socket.current.on('join', ({ user, another, result }: {
      user: User,
      another: User[],
      result: number,
    }) => {
      if (result === 404) {
        console.warn(`该房间不存在或已销毁，请检查房间号`)
        return
      }
      const othersMap = anotherRef.current.reduce((map, user) => {
        map[user.socketId] = user;
        return map;
      }, {} as { [key: string]: User });
      const others = another
        .filter((user) => user.socketId !== infoRef.current.socketId)
        .map(user => othersMap[user.socketId] || user);
      setAnother(others);
      anotherRef.current = others;
      if (user.socketId !== infoRef.current.socketId) {
        setRecords((records) => records.concat({
          id: unique.get(`${currentIp.current}${infoRef.current.socketId}`),
          type: 'tips',
          content: `用户${user.userName}加入房间`,
          from: user,
          time: new Date().toLocaleString(),
        }));
        createPeerConnection(user)
        // console.log(`用户${user.userName}加入房间`)
      } else {
        setRecords((records) => records.concat({
          id: unique.get(`${currentIp.current}${infoRef.current.socketId}`),
          type: 'tips',
          content: `你已加入房间`,
          from: user,
          time: new Date().toLocaleString(),
        }));
        setJoined(true);
        anotherRef.current.forEach((user) => {
          createPeerConnection(user, true)
        })
        // console.log(`你已加入房间`)
      }
      if ((user.socketId === infoRef.current.socketId) && others.length > 0) {
        requestVideoCall();
      }
    })
    // 接收方获取到发送方的offer后，发送answer给发送方
    socket.current.on('receive_offer', async ({ info, to, offer }) => {
      console.log('receive offer');
      const user = anotherRef.current.find((user) => user.socketId === info.socketId)
      if (!user?.pc) return
      await user.pc.setRemoteDescription(offer)
      const answer = await user.pc?.createAnswer()
      await user.pc.setLocalDescription(answer)
      socket.current?.emit('answer', { answer, info: to, to: info })
    })

    // 发送方获取到answer
    socket.current.on('receive_answer', async ({ info, answer }) => {
      console.log('receive answer');
      const user = anotherRef.current.find((user) => user.socketId === info.socketId)
      if (!user?.pc) return
      await user.pc?.setRemoteDescription(answer)
      // weitToSetRemote({ answer })
    })

    socket.current.on('add_candidate', async ({ info, candidate }) => {
      // weitToSetRemote({ candidate })
      console.log('add_candidate');
      const user = anotherRef.current.find((user) => user.socketId === info.socketId)
      if (!user?.pc) return
      user.pc?.addIceCandidate(candidate)
    })
  }
  function createPeerConnection(targetUser: User, isOffer = false) {
    const iceServers = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Google 提供的公共 STUN 服务器
        { urls: 'stun:stun.miwifi.com' }, // Google 提供的公共 STUN 服务器
        { urls: 'stun:stun.voipbuster.com' }, // Google 提供的公共 STUN 服务器
        { urls: 'stun:stun.qq.com' }, // Google 提供的公共 STUN 服务器
        {
          urls: 'turn:stun.t-n.top:3478', // 自己的 TURN 服务器地址
          username: 'test12138',               // TURN 服务器的用户名
          credential: 'test12138',              // TURN 服务器的密码
        }
      ]
    };
    const user = anotherRef.current.find((user) => user.socketId === targetUser.socketId)
    if (!user) return
    if (!user?.pc) {
      user.pc = new RTCPeerConnection(iceServers)
      // user.dc.onopen = function () {
      //   console.log("Data channel is open!");
      // };
      // user.dc.onmessage = function (event) {
      //   console.log("received msg: " + event.data);
      //   setRecords((records) => records.concat(event.data));
      // };
    }
    if (isOffer) {
      user.dc = user.pc.createDataChannel("my channel");
      console.log('new datachannel')
      receiveMsg(user.dc);
      // user.dc.onmessage = function (event) {
      //   console.log("received msg: " + event.data);
      //   setRecords((records) => records.concat(event.data));
      // }
    } else {
      console.log('ready to datachannel')
      user.pc.ondatachannel = (event) => {
        console.log("on datachannel");
        user.dc = event.channel;
        user.dc.onopen = function () {
          console.log("Data channel is open!");
        };
        receiveMsg(user.dc);
        // user.dc.onmessage = function (event) {
        //   console.log("received msg: " + event.data);
        //   setRecords((records) => records.concat(event.data));
        // }
      }
    }
    user.pc.onicecandidate = (event) => {
      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
      const tmpIp = event.candidate?.candidate?.match(ipRegex)
      if (tmpIp) {
        currentIp.current = tmpIp[0]
      }
      anotherRef.current.forEach((user) => {
        socket.current?.emit('add_candidate', {
          candidate: event.candidate,
          info: infoRef.current,
          to: user
        })
      })
    }
    user.pc.oniceconnectionstatechange = () => {
      if (user.pc?.iceConnectionState === 'connected') {
        // setContentLoading(false);
      }
      if (user.pc?.iceConnectionState === 'disconnected' || user.pc?.iceConnectionState === 'failed') {
        console.warn('连接失败，请重新连接');
      }
      console.log(`oniceconnectionstatechange: ${user.pc?.iceConnectionState}`)
    }
  }

  const receiveMsg = (dc: RTCDataChannel) => {
    dc.onmessage = function (event) {
      console.log("received msg: " + event.data);
      try {
        const record = JSON.parse(event.data);
        if (record.from) {
          anotherRef.current = anotherRef.current.map(user => user.socketId === record.from.socketId ? {
            ...user,
            ...record.from,
          } : user)
          setAnother([...anotherRef.current])
        }
        setRecords((records) => records.concat(record));
      } catch (err) {
        console.log('fail to parse msg', event.data)
      }
    }
  }

  useEffect(() => {
    stone.on('ip', ({ detail }) => {
      console.log(detail)
      ipRef.current = detail?.ip;
      initInfo().then(() => {
        leaveRef.current
        if (leaveRef.current > 0) {
          leaveRef.current -= 1;
        } else {
          initSocket()
        }
      })
    })
    window.addEventListener('beforeunload', leaveRoom);
    return () => {
      leaveRoom()
      leaveRef.current += 1;
      socket.current?.disconnect()
      socket.current?.off()
      socket.current = null
      window.removeEventListener('beforeunload', leaveRoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <div className={style.chat_wrap} style={{ backgroundImage: `url('${url}')` }}>
      <div className={style.layout_wrap}>
        <div className={style.main_container}>
          <div className={style.header_line}>
            <div className={`${style.join_status_ball} ${style[isJoined ? 'ball_joined' : 'ball_wait']}`}></div>
            <div>{info.userName}</div>
            <SVGIcon type="chat_1" className={style.expand_icon} onClick={() => setExpand(val => !val)} />
          </div>
          <div className={`${style.contents} scroll_er`}>
            {isJoined || <div className={style.wait_tips}>
              <span className={style.wait_tip_txt}>正在链接 ... ...</span>
            </div>}
            <div>
              {records.map(record => (
                <div key={record.id}>{{
                  tips: (
                    <div className={style.record_tips}>
                      <div className={style.record_content}>{record.content}</div>
                    </div>
                  ),
                  text: (
                    <div className={`${style.record_text} ${record.from.socketId === info.socketId ? style.owner : ''}`}>
                      <div className={style.user_name}>{record.from.userName}</div>
                      <MdText text={record.content} className={style.user_content} />
                    </div>
                  ),
                  file: (
                    <div className={style.record_file}>
                      <div className={style.record_content}>{record.content}</div>
                    </div>
                  ),
                }[record.type]}</div>))}
            </div>
          </div>
          <div>
            <MyTextarea
              disabled={!isJoined}
              style={{ height: 'unset' }}
              onSubmit={(value) => sendMsg(value.content || '')}
            />
          </div>
        </div>
        <div className={`${style.user_list} scroll_er`} style={{ display: userExpand ? 'block' : 'none' }}>
          {
            another.map(user => <div key={user.socketId}>
              <div className={`${style.join_status_ball} ${style[user.alive ? 'ball_joined' : 'ball_wait']}`}></div>
              {user.userName}
            </div>)
          }
        </div>
      </div>
    </div>
  </>
}

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}