import { useCallback, useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import SVGIcon from '@/components/SVGIcon';
import { randomUser } from '@/req/main';
import { io, Socket } from 'socket.io-client';
import { env } from '@/utils/global';
import { isMobile } from '@/utils/common';
import { brotliCompress } from 'zlib';


export default function Rtc() {
  const [isConnected, setIsConnected] = useState(0);
  const [ready, setReady] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [info, setInfo] = useState({
    roomId: '',
    userName: '',
    socketId: '',
  });
  const [another, setOther] = useState({
    roomId: '',
    userName: '',
    socketId: '',
  });
  const infoRef = useRef({
    roomId: '',
    userName: '',
    socketId: '',
  });
  const socket = useRef<Socket | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const localRef = useRef<HTMLVideoElement | null>(null);
  const targetRef = useRef<HTMLVideoElement>(null);
  // const answerRef = useRef(null);
  // const candidateRef = useRef<RTCIceCandidateInit>();
  const [chatting, setChatting] = useState(false)
  const initInfo = () => {
    const info = localStorage.info
    if (info) {
      try {
        setInfo(JSON.parse(info))
        return
      } catch (err) {
        console.log(`fail to parse info`, info);
      }
    }
    randomUser().then(res => {
      const name = res?.results?.[0]?.name || ''
      const info = {
        roomId: String(Math.random()).slice(4, 8),
        userName: name ? `${name.first} ${name.last}` : String(Math.random()).slice(4, 8),
        socketId: '',
      }
      setInfo(info)
      localStorage.setItem('info', JSON.stringify(info))
    })
  }
  const joinRoom = () => {
    if (!info.roomId || !info.userName) return
    localStorage.setItem('info', JSON.stringify(info))
    socket.current?.emit('create_or_join_room', info);
  }

  function leaveRoom() {
    if(localStream) {
      const tracks = localStream.current?.getTracks();
      tracks?.forEach(track => {
        track.stop();
      });
      localStream.current = null;
      if (localRef.current) {
        localRef.current.srcObject = null;
      }
    }
    
    pc.current = null;
    if (targetRef.current) {
      targetRef.current.srcObject = null;
    }
    setIsConnected(0)
    setChatting(false)
    socket.current?.emit('room_leave', info);
  }

  function requestVideoCall() {
    socket.current?.emit('request_video', info)
  }
  const initSocket = () => {
    socket.current = io('wss://use.t-n.top', {
      transports: ['websocket'],  // 使用 WebSocket 作为传输协议
      withCredentials: true       // 允许发送凭据
    })

    socket.current.on('connected', (id) => {
      setReady(true)
      setInfo(e => ({...e, socketId: id }))
    });
    socket.current.on('room_full', () => alert('房间已满，请更换房间号ID'))
    socket.current.on('room_created', (info) => {
      alert(`您已创建并加入【${info.roomId}】房间`)
      setInfo(info)
      setIsConnected(1)
    })
    socket.current.on('room_joined', ({ user, another }) => {
      setIsConnected(2)
      setOther(user.socketId !== infoRef.current.socketId ? user : another)
      console.log(user, infoRef.current)
      if (user.socketId !== infoRef.current.socketId) {
        alert(`用户${user.userName}加入【${user.roomId}】房间`)
      }
    })
    socket.current.on('room_leave', (user) => {
      if (user.socketId !== infoRef.current.socketId) {
        setOther({
          roomId: '',
          userName: '',
          socketId: '',
        });
        alert(`用户${user.userName}已离开【${user.roomId}】房间`)
      } else {
        setIsConnected(0)
      }
    })

    socket.current.on('receive_video', (user) => {
      if(user.socketId === infoRef.current.socketId) return
      // 从接收方开始，发起
      if(!window.confirm(`您要接受用户${user.userName}的视频电话邀请吗？`)) return
      socket.current?.emit('accept_video', infoRef.current)
    })

    socket.current.on('accept_video', async (user) => {
      setContentLoading(true);
      // 创建本地摄像头
      await createLocalMediaStream()
      // 接收对面连接
      createPeerConnection()
      if(user.socketId !== infoRef.current.socketId) {
        // 发送方开始发送offer
        const offer = await pc.current?.createOffer()
        await pc.current?.setLocalDescription(offer)
        socket.current?.emit('offer', { offer, info: infoRef.current })
      }
    })
    // 接收方获取到发送方的offer后，发送answer给发送方
    socket.current.on('receive_offer', async (offer) => {
      if(!pc.current) return
      await pc.current.setRemoteDescription(offer)
      const answer = await pc.current?.createAnswer()
      await pc.current.setLocalDescription(answer)
      socket.current?.emit('answer', { answer, info: infoRef.current })
    })

    // 发送方获取到answer
    socket.current.on('receive_answer', async (answer) => {
      await pc.current?.setRemoteDescription(answer)
      // weitToSetRemote({ answer })
    })
  
    socket.current.on('add_candidate', async (candidate) => {
      // weitToSetRemote({ candidate })
      pc.current?.addIceCandidate(candidate)
    })
  }

  // const weitToSetRemote = async ({ answer, candidate }: any = {}) => {
  //   if (answer) {
  //     answerRef.current = answer
  //   }
  //   if (candidate) {
  //     candidateRef.current = candidate
  //   }
  //   if (answerRef.current && pc.current?.iceGatheringState === 'complete') {
  //     console.log('answerRef: setRemoteDescription', 9999);
  //     await pc.current?.setRemoteDescription(answerRef.current)
  //     if(candidateRef.current) {
  //       pc.current?.addIceCandidate(candidateRef.current)
  //     }
  //   }
  // }

  async function createLocalMediaStream() {
    if(localStream.current) return
    localStream.current = await navigator.mediaDevices.getUserMedia({
      video: isMobile ? { facingMode: "user" } : true,
      audio: false,
    }).catch((err: Error) => {
      console.log(`error happen: ${err.name}`);
    }) || null
    if (localStream) {
      setChatting(true);
      if (localRef.current && localStream.current) {
        localRef.current.srcObject = localStream.current
      }
    }
  }

  function createPeerConnection() {
    const iceServers = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // Google 提供的公共 STUN 服务器
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
    pc.current.onicecandidate = (event) => socket.current?.emit('add_candidate', {
      candidate: event.candidate,
      info: infoRef.current,
    })
    pc.current.oniceconnectionstatechange = () => {
      if (pc.current?.iceConnectionState === 'connected') {
        setContentLoading(false);
      }
      if (pc.current?.iceConnectionState === 'disconnected' || pc.current?.iceConnectionState === 'failed') {
        setContentLoading(false);
        alert('连接失败，请重新连接');
        leaveRoom();
      }
      console.log(`oniceconnectionstatechange: ${pc.current?.iceConnectionState}`)
    }
    pc.current.onsignalingstatechange = () => {
      console.log(`onsignalingstatechange: ${pc.current?.signalingState}`)
    }
    pc.current.ontrack = (event) => targetRef.current ? (targetRef.current.srcObject = event.streams[0]) : ''
    pc.current.onicegatheringstatechange = () => {
      console.log(`onicegatheringstatechange: ${pc.current?.iceGatheringState}`)
      // weitToSetRemote()
    }

    localStream.current?.getTracks().forEach(track => {
      if (localStream.current){
        pc.current?.addTrack(track, localStream.current)
      }
    })
  }
  // //访问用户媒体设备的兼容方法
  // function getUserMedia(options){
  //   if(navigator.mediaDevices.getUserMedia){
  //     console.log(1)
  //     //最新标准API
  //     return navigator.mediaDevices.getUserMedia(options)
  //   } else if (navigator.webkitGetUserMedia){
  //     console.log(2)
  //     //webkit内核浏览器
  //     return navigator.webkitGetUserMedia(options)
  //   } else if (navigator.mozGetUserMedia){
  //     console.log(3)
  //     //Firefox浏览器
  //     return navigator.mozGetUserMedia(options)
  //   } else if (navigator.getUserMedia){
  //     console.log(4)
  //     //旧版API
  //     return navigator.getUserMedia(options)
  //   }
  // }
  

  useEffect(() => {
    initInfo()
    initSocket()
    return () => {
      leaveRoom()
      socket.current?.disconnect()
      socket.current?.off()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    infoRef.current = info
  }, [info])
  return <>
    {!isConnected ? <div className={style.input_wrap}>
      
      <div className={style.img_wrap}>
        <img style={{ width: '200px',margin: '10vh 0'}} src="https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_14/pic1728899129621292.png&n=-1&q=80" alt="" />
        {ready ? '' : (
          <div className={style.loading_tips}>
            <SVGIcon type='loading_2' className={style.loading_icon} />
            正在连接服务器...
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder='请输入房间号'
        className={style.input}
        defaultValue={info.roomId}
        onInput={e => setInfo(v => ({...v, roomId: (e.target as HTMLInputElement).value}))}
      />
      <input
        type="text"
        placeholder='请输入用户名'
        className={style.input}
        defaultValue={info.userName}
        onInput={e => setInfo(v => ({...v, userName: (e.target as HTMLInputElement).value}))}
      />
      <button className='normal_btn' disabled={!ready} onClick={joinRoom}>创建/加入房间</button>
    </div> :
    <div className={style.total_wrap}>
      <div className={style.local_wrap}>
        <video ref={localRef} className={style.local_video} autoPlay></video>
        {isConnected === 1 && <div className={style.local_tips}>
          <div style={{ marginBottom: '8px' }}>
            <SVGIcon type='loading_2' className={style.loading_icon} />
          </div>
          正在等待对方进入...
        </div>}
        <div style={{ color: '#fff' }}>{another.userName}</div>
      </div>
      <video ref={targetRef} className={style.target_video} autoPlay></video>
      <div className={style.operate_wrap}>
        {chatting || <button
          className={`${style.chat_btn} ${style.back_btn}`}
          onClick={leaveRoom}
        >
          <SVGIcon type='back_2' style={{width: "2rem"}} />
        </button>}
        <div className={style.room_msg}>
          {contentLoading && <div>正在获取视频数据...</div>}
          <div>{info.userName}</div>
          <div>房间号: {info.roomId}</div>
        </div>
        <button
          disabled={isConnected !== 2 && !chatting}
          className={style.chat_btn}
          style={{ backgroundColor: chatting? 'red' : 'green'}}
          onClick={chatting ? leaveRoom : requestVideoCall}
        >
          <SVGIcon type='chat_1' style={{width: "2rem", fill:"#FFF"}} />
        </button>
      </div>
    </div>}
  </>
}

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}