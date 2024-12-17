import { useCallback, useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import SVGIcon from '@/components/SVGIcon';
import { randomUser } from '@/req/main';
import { io, Socket } from 'socket.io-client';
import { copy, isMobile } from '@/utils/common';
import ImgUpload, { UploadRefType } from '@/components/ImgUpload';
import { Pic } from '@/types/demos';
import MyTextarea from '@/components/MyTextarea';


export default function MiniChat() {
  const [url] = useState('https://raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_28/pic1730078673558002.jpg')
  
  const [anothers, setAnothers] = useState([]);
  const anotherRef = useRef([]);
  const [ready, setReady] = useState(false);
  const socket = useRef<Socket | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const [info, setInfo] = useState({
    roomId: '',
    userName: '',
    socketId: '',
  })
  const infoRef = useRef({
    roomId: '',
    userName: '',
    socketId: '',
  })

  const initInfo = async () => {
    const info = localStorage.info
    console.log(54344, info);
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
      roomId: String(Math.random()).slice(4, 8),
      userName: name ? `${name.first} ${name.last}` : String(Math.random()).slice(4, 8),
      socketId: '',
    }
    infoRef.current = newInfo;
    console.log(54344, newInfo);
    setInfo(newInfo)
    localStorage.setItem('info', JSON.stringify(newInfo))
  }
  const sendMsg = (value: string) => {
    console.log(value);
  } 

  const joinRoom = () => {
    if (!infoRef.current.userName) return
    localStorage.setItem('info', JSON.stringify(infoRef.current))
    socket.current?.emit('join', { info: infoRef.current });
  }

  const leaveRoom = () => {
    console.log('leave room')
    socket.current?.emit('leave', infoRef.current);
  }
  
  async function requestVideoCall() {
    createPeerConnection()
    // 发送方开始发送offer
    const offer = await pc.current?.createOffer()
    await pc.current?.setLocalDescription(offer)
    anotherRef.current.forEach((user) => {
      socket.current?.emit('offer', { offer, info: infoRef.current, to: user })
    })
  }

  const initSocket = () => {
    console.log('init spcket')
    socket.current = io('wss://use.t-n.top', {
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
    socket.current.on('join', ({ user, anothers, result }) => {
      if (result === 404) {
        console.warn(`该房间不存在或已销毁，请检查房间号`)
        return
      }
      setAnothers(anothers);
      anotherRef.current = anothers;
      if (user.socketId !== infoRef.current.socketId) {
        console.log(`用户${user.userName}加入房间`)
      }
      if((user.socketId === infoRef.current.socketId) && anothers.length > 0) {
        console.log(`你已加入房间`)
        requestVideoCall();
      }
    })
    // 接收方获取到发送方的offer后，发送answer给发送方
    socket.current.on('receive_offer', async ({ info, to, offer }) => {
      if(!pc.current) return
      await pc.current.setRemoteDescription(offer)
      const answer = await pc.current?.createAnswer()
      await pc.current.setLocalDescription(answer)
      socket.current?.emit('answer', { answer, info: to, to: info })
    })

    // 发送方获取到answer
    socket.current.on('receive_answer', async ({ answer }) => {
      await pc.current?.setRemoteDescription(answer)
      // weitToSetRemote({ answer })
    })
  
    socket.current.on('add_candidate', async ({ candidate }) => {
      // weitToSetRemote({ candidate })
      pc.current?.addIceCandidate(candidate)
    })
  }
  function createPeerConnection() {
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
    
    if(!pc.current) {
      pc.current = new RTCPeerConnection(iceServers)
    }
    pc.current.onicecandidate = (event) => {
      anotherRef.current.forEach((user) => {
        socket.current?.emit('add_candidate', {
          candidate: event.candidate,
          info: infoRef.current,
          to: user
        })
      })
    }
    pc.current.oniceconnectionstatechange = () => {
      if (pc.current?.iceConnectionState === 'connected') {
        // setContentLoading(false);
      }
      if (pc.current?.iceConnectionState === 'disconnected' || pc.current?.iceConnectionState === 'failed') {
        console.warn('连接失败，请重新连接');
      }
      console.log(`oniceconnectionstatechange: ${pc.current?.iceConnectionState}`)
    }
  }

  useEffect(() => {
    initInfo().then(() => {
      initSocket()
    })
    window.addEventListener('beforeunload', leaveRoom);
    return () => {
      leaveRoom()
      socket.current?.disconnect()
      socket.current?.off()
      socket.current = null
      window.removeEventListener('beforeunload', leaveRoom);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    <div className={style.chat_wrap} style={{ backgroundImage: `url('${url}')` }}>
      <div className={style.main_container}>
        <div>{info.userName}</div>
        <div className={`${style.contents} scroll_er`}>
          <div></div>
        </div>
        <div>
          <MyTextarea style={{ height: 'unset' }} onSubmit={sendMsg} />
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