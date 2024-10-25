import { useCallback, useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import SVGIcon from '@/components/SVGIcon';
import { randomUser } from '@/req/main';
import { io, Socket } from 'socket.io-client';
import { copy, isBrowser, isMobile } from '@/utils/common';

let Vconsole: new () => any;

if (isBrowser) {
  Vconsole = require('vconsole')
}

export default function Rtc() {
  const [isConnected, setIsConnected] = useState(0);
  const [ready, setReady] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [info, setInfo] = useState({
    roomId: '',
    userName: '',
    socketId: '',
  });
  const [hasRoomId, setHasRoomId] = useState(false);
  const roomIdRef = useRef('')
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
  const initInfo = async () => {
    const info = localStorage.info
    if (info) {
      try {
        const newInfo = JSON.parse(info)
        newInfo.socketId = ''
        if (roomIdRef.current) {
          newInfo.roomId = roomIdRef.current
        }
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
    if (roomIdRef.current) {
      newInfo.roomId = roomIdRef.current
    }
    infoRef.current = newInfo;
    setInfo(newInfo)
    localStorage.setItem('info', JSON.stringify(info))
  }
  const joinRoom = () => {
    if (!infoRef.current.roomId || !infoRef.current.userName) return
    localStorage.setItem('info', JSON.stringify(infoRef.current))
    socket.current?.emit('create_or_join_room', { info: infoRef.current, roomId: roomIdRef.current });
  }

  const leaveRoom = () => {
    console.log('leave room')
    setInfo(val => {
      socket.current?.emit('room_leave', val);
      return val
    })
    setContentLoading(false)
    setHasRoomId(false)
    setOther({
      roomId: '',
      userName: '',
      socketId: '',
    });
    roomIdRef.current = ''
    if(localStream?.current) {
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
  }

  function requestVideoCall() {
    setContentLoading(true);
    setInfo(val => {
      console.log(infoRef.current, val)
      socket.current?.emit('request_video', val)
      return val
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
      infoRef.current = {...infoRef.current, socketId: id }
      setInfo(infoRef.current)
      if (roomIdRef.current) {
        joinRoom()
      }
    });
    socket.current.on('room_full', () => alert('房间已满，请更换房间号ID'))
    socket.current.on('room_created', (info) => {
      alert(`您已创建并加入【${info.roomId}】房间`)
      setInfo(info)
      setIsConnected(1)
    })
    socket.current.on('room_joined', ({ user, another, result }) => {
      if (result === 404) {
        alert(`该房间不存在或已销毁，请检查房间号`)
        setIsConnected(0)
        roomIdRef.current = ''
        setHasRoomId(false)
        return
      }
      setIsConnected(2)
      setOther(user.socketId !== infoRef.current.socketId ? user : another)
      if (user.socketId !== infoRef.current.socketId) {
        alert(`用户${user.userName}加入【${user.roomId}】房间`)
      }
      if (result) {
        setHasRoomId(true)
      }
      console.log(user, infoRef.current, roomIdRef.current)
      if((user.socketId === infoRef.current.socketId) && roomIdRef.current) {
        requestVideoCall();
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
        setIsConnected(0)
        leaveRoom()
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
      audio: true,
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
        { urls: 'stun:stun.miwifi.com' }, // Google 提供的公共 STUN 服务器
        { urls: 'stun:stun.voipbuster.com' }, // Google 提供的公共 STUN 服务器
        { urls: 'stun:stun.qq.com' }, // Google 提供的公共 STUN 服务器
        // {
        //   urls: 'stun:stun.t-n.top:3478', // 自己的 TURN 服务器地址
        //   username: 'test12138',               // TURN 服务器的用户名
        //   credential: 'test12138',              // TURN 服务器的密码
        // }
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

  const share = () => {
    const url = new URL(location.href)
    url.search = new URLSearchParams({roomId: info.roomId}).toString()
    copy(url.href)
    alert('邀请链接已复制');
  }

  useEffect(() => {
    console.log('created lifetime')
    const url = new URLSearchParams(location.search)
    if (isBrowser) {
      new Vconsole()
    }
    roomIdRef.current = url.get('roomId') || '';
    if (roomIdRef.current) {
      setHasRoomId(true)
    }
    initInfo().then(() => {
      initSocket()
    })

    window.addEventListener('beforeunload', leaveRoom);
    return () => {
      console.log(999, infoRef.current)
      leaveRoom()
      socket.current?.disconnect()
      socket.current?.off()
      socket.current = null
      window.removeEventListener('beforeunload', leaveRoom);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    infoRef.current = info
  }, [info])
  return <>
    {!isConnected && <div className={style.line_banner}>移动端请使用谷歌浏览器体验完整功能!!!</div>}
    {!isConnected ? <div className={style.input_wrap}>
      
      <div className={style.img_wrap}>
        <img style={{ width: '200px',margin: '10vh 0'}} src="https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_14/pic1728899129621292.png&n=-1&q=80" alt="" />
        {ready && !hasRoomId ? '' : (
          <div className={style.loading_tips}>
            <SVGIcon type='loading_2' className={style.loading_icon} />
            {!ready ? '正在连接服务器...' : (hasRoomId && '正在加入房间...')}
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder='请输入房间号'
        disabled={hasRoomId}
        className={style.input}
        defaultValue={info.roomId}
        onInput={e => setInfo(v => ({...v, roomId: (e.target as HTMLInputElement).value}))}
      />
      {hasRoomId || <input
        type="text"
        placeholder='请输入用户名'
        className={style.input}
        defaultValue={info.userName}
        onInput={e => setInfo(v => ({...v, userName: (e.target as HTMLInputElement).value}))}
      />}
      <button className='normal_btn' disabled={hasRoomId || !ready} onClick={joinRoom}>{hasRoomId ? '即将进入房间...' : '创建/加入房间'}</button>
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
        {hasRoomId || <div style={{ color: '#fff' }}>{another.userName}</div>}
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
          {contentLoading && <div>
            <SVGIcon type='loading_2' className={style.loading_icon} style={{fill: '#fff'}} />
            正在获取视频数据...
          </div>}
          {hasRoomId || <div>{info.userName}</div>}
          <div>房间号: {info.roomId}</div>
        </div>
        <button
          disabled={isConnected !== 2 && !chatting}
          className={style.chat_btn}
          style={{ backgroundColor: chatting || contentLoading ? 'red' : 'green'}}
          onClick={chatting || contentLoading ? leaveRoom : requestVideoCall}
        >
          <SVGIcon type='chat_1' style={{width: "2rem", fill:"#FFF"}} />
        </button>
        {isConnected !== 2 && <button
          className={`${style.chat_btn} ${style.share_btn}`}
          onClick={share}
        >
          <SVGIcon type='share' style={{width: "2rem", fill:"#FFF"}} />
        </button>}
      </div>
    </div>}
  </>
}

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}