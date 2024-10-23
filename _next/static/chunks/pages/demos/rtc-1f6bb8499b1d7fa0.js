(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{1721:function(e,r,t){"use strict";t.r(r),t.d(r,{__N_SSG:function(){return h},default:function(){return g}});var n=t(9499),c=t(29),o=t(7794),a=t.n(o),u=t(7294),i=t(5494),s=t.n(i),l=t(3806),d=t(5835),f=t(7642),_=t(1575),p=t(5893);function v(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,n)}return t}function m(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?v(Object(t),!0).forEach(function(r){(0,n.Z)(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):v(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}var h=!0;function g(){var e,r=(0,u.useState)(0),t=r[0],n=r[1],o=(0,u.useState)(!1),i=o[0],v=o[1],h=(0,u.useState)(!1),g=h[0],w=h[1],x=(0,u.useState)({roomId:"",userName:"",socketId:""}),b=x[0],k=x[1],j=(0,u.useState)(!1),N=j[0],I=j[1],y=(0,u.useRef)(""),O=(0,u.useState)({roomId:"",userName:"",socketId:""}),S=O[0],P=O[1],C=(0,u.useRef)({roomId:"",userName:"",socketId:""}),E=(0,u.useRef)(null),D=(0,u.useRef)(null),R=(0,u.useRef)(null),Z=(0,u.useRef)(null),T=(0,u.useRef)(null),q=(0,u.useState)(!1),F=q[0],B=q[1],L=(e=(0,c.Z)(a().mark(function e(){var r,t,n,c,o,u,i;return a().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(n=localStorage.info)){e.next=14;break}return e.prev=2,(c=JSON.parse(n)).socketId="",y.current&&(c.roomId=y.current),k(c),C.current=c,e.abrupt("return");case 11:e.prev=11,e.t0=e.catch(2),console.log("fail to parse info",n);case 14:return e.next=16,(0,d.oQ)();case 16:u=(null==(o=e.sent)?void 0:null===(r=o.results)||void 0===r?void 0:null===(t=r[0])||void 0===t?void 0:t.name)||"",i={roomId:String(Math.random()).slice(4,8),userName:u?"".concat(u.first," ").concat(u.last):String(Math.random()).slice(4,8),socketId:""},y.current&&(i.roomId=y.current),C.current=i,k(i),localStorage.setItem("info",JSON.stringify(n));case 23:case"end":return e.stop()}},e,null,[[2,11]])})),function(){return e.apply(this,arguments)}),M=function(){var e;C.current.roomId&&C.current.userName&&(localStorage.setItem("info",JSON.stringify(C.current)),null===(e=E.current)||void 0===e||e.emit("create_or_join_room",{info:C.current,roomId:y.current}))},z=function(){var e;if(null===(e=E.current)||void 0===e||e.emit("room_leave",b),I(!1),y.current="",null!=R&&R.current){var r,t=null===(r=R.current)||void 0===r?void 0:r.getTracks();null==t||t.forEach(function(e){e.stop()}),R.current=null,Z.current&&(Z.current.srcObject=null)}D.current=null,T.current&&(T.current.srcObject=null),n(0),B(!1)},J=function(){var e,r,t,o;E.current=(0,f.io)("wss://use.t-n.top",{transports:["websocket"],withCredentials:!0}),E.current.on("connected",function(e){v(!0),C.current=m(m({},C.current),{},{socketId:e}),k(C.current),y.current&&M()}),E.current.on("room_full",function(){return alert("房间已满，请更换房间号ID")}),E.current.on("room_created",function(e){alert("您已创建并加入【".concat(e.roomId,"】房间")),k(e),n(1)}),E.current.on("room_joined",function(e){var r=e.user,t=e.another;if(404===e.result){alert("该房间不存在或已销毁，请检查房间号"),n(0),y.current="",I(!1);return}n(2),P(r.socketId!==C.current.socketId?r:t),r.socketId!==C.current.socketId&&alert("用户".concat(r.userName,"加入【").concat(r.roomId,"】房间"))}),E.current.on("room_leave",function(e){e.socketId!==C.current.socketId?(P({roomId:"",userName:"",socketId:""}),alert("用户".concat(e.userName,"已离开【").concat(e.roomId,"】房间"))):n(0)}),E.current.on("receive_video",function(e){var r;e.socketId!==C.current.socketId&&window.confirm("您要接受用户".concat(e.userName,"的视频电话邀请吗？"))&&(null===(r=E.current)||void 0===r||r.emit("accept_video",C.current))}),E.current.on("accept_video",(e=(0,c.Z)(a().mark(function e(r){var t,n,c,o;return a().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return w(!0),e.next=3,function(){return A.apply(this,arguments)}();case 3:if(function(){var e;D.current||(D.current=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"turn:stun.t-n.top:3478",username:"test12138",credential:"test12138"}]})),D.current.onicecandidate=function(e){var r;return null===(r=E.current)||void 0===r?void 0:r.emit("add_candidate",{candidate:e.candidate,info:C.current})},D.current.oniceconnectionstatechange=function(){var e,r,t,n;(null===(e=D.current)||void 0===e?void 0:e.iceConnectionState)==="connected"&&w(!1),((null===(r=D.current)||void 0===r?void 0:r.iceConnectionState)==="disconnected"||(null===(t=D.current)||void 0===t?void 0:t.iceConnectionState)==="failed")&&(w(!1),alert("连接失败，请重新连接"),z()),console.log("oniceconnectionstatechange: ".concat(null===(n=D.current)||void 0===n?void 0:n.iceConnectionState))},D.current.onsignalingstatechange=function(){var e;console.log("onsignalingstatechange: ".concat(null===(e=D.current)||void 0===e?void 0:e.signalingState))},D.current.ontrack=function(e){return T.current?T.current.srcObject=e.streams[0]:""},D.current.onicegatheringstatechange=function(){var e;console.log("onicegatheringstatechange: ".concat(null===(e=D.current)||void 0===e?void 0:e.iceGatheringState))},null===(e=R.current)||void 0===e||e.getTracks().forEach(function(e){if(R.current){var r;null===(r=D.current)||void 0===r||r.addTrack(e,R.current)}})}(),!(r.socketId!==C.current.socketId)){e.next=11;break}return e.next=7,null===(t=D.current)||void 0===t?void 0:t.createOffer();case 7:return o=e.sent,e.next=10,null===(n=D.current)||void 0===n?void 0:n.setLocalDescription(o);case 10:null===(c=E.current)||void 0===c||c.emit("offer",{offer:o,info:C.current});case 11:case"end":return e.stop()}},e)})),function(r){return e.apply(this,arguments)})),E.current.on("receive_offer",(r=(0,c.Z)(a().mark(function e(r){var t,n,c;return a().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(D.current){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,D.current.setRemoteDescription(r);case 4:return e.next=6,null===(t=D.current)||void 0===t?void 0:t.createAnswer();case 6:return c=e.sent,e.next=9,D.current.setLocalDescription(c);case 9:null===(n=E.current)||void 0===n||n.emit("answer",{answer:c,info:C.current});case 10:case"end":return e.stop()}},e)})),function(e){return r.apply(this,arguments)})),E.current.on("receive_answer",(t=(0,c.Z)(a().mark(function e(r){var t;return a().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===(t=D.current)||void 0===t?void 0:t.setRemoteDescription(r);case 2:case"end":return e.stop()}},e)})),function(e){return t.apply(this,arguments)})),E.current.on("add_candidate",(o=(0,c.Z)(a().mark(function e(r){var t;return a().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:null===(t=D.current)||void 0===t||t.addIceCandidate(r);case 1:case"end":return e.stop()}},e)})),function(e){return o.apply(this,arguments)}))};function A(){return(A=(0,c.Z)(a().mark(function e(){return a().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!R.current){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,navigator.mediaDevices.getUserMedia({video:!_.tq||{facingMode:"user"},audio:!0}).catch(function(e){console.log("error happen: ".concat(e.name))});case 4:if(e.t0=e.sent,e.t0){e.next=7;break}e.t0=null;case 7:R.current=e.t0,R&&(B(!0),Z.current&&R.current&&(Z.current.srcObject=R.current));case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}return(0,u.useEffect)(function(){var e=new URLSearchParams(location.search);return y.current=e.get("roomId")||"",y.current&&I(!0),L().then(function(){J()}),function(){var e,r;z(),null===(e=E.current)||void 0===e||e.disconnect(),null===(r=E.current)||void 0===r||r.off(),E.current=null}},[]),(0,u.useEffect)(function(){C.current=b},[b]),(0,p.jsxs)(p.Fragment,{children:[!t&&(0,p.jsx)("div",{className:s().line_banner,children:"移动端请使用谷歌浏览器体验完整功能!!!"}),t?(0,p.jsxs)("div",{className:s().total_wrap,children:[(0,p.jsxs)("div",{className:s().local_wrap,children:[(0,p.jsx)("video",{ref:Z,className:s().local_video,autoPlay:!0}),1===t&&(0,p.jsxs)("div",{className:s().local_tips,children:[(0,p.jsx)("div",{style:{marginBottom:"8px"},children:(0,p.jsx)(l.Z,{type:"loading_2",className:s().loading_icon})}),"正在等待对方进入..."]}),(0,p.jsx)("div",{style:{color:"#fff"},children:S.userName})]}),(0,p.jsx)("video",{ref:T,className:s().target_video,autoPlay:!0}),(0,p.jsxs)("div",{className:s().operate_wrap,children:[F||(0,p.jsx)("button",{className:"".concat(s().chat_btn," ").concat(s().back_btn),onClick:z,children:(0,p.jsx)(l.Z,{type:"back_2",style:{width:"2rem"}})}),(0,p.jsxs)("div",{className:s().room_msg,children:[g&&(0,p.jsx)("div",{children:"正在获取视频数据..."}),(0,p.jsx)("div",{children:b.userName}),(0,p.jsxs)("div",{children:["房间号: ",b.roomId]})]}),(0,p.jsx)("button",{disabled:2!==t&&!F,className:s().chat_btn,style:{backgroundColor:F?"red":"green"},onClick:F?z:function(){var e;null===(e=E.current)||void 0===e||e.emit("request_video",b)},children:(0,p.jsx)(l.Z,{type:"chat_1",style:{width:"2rem",fill:"#FFF"}})})]})]}):(0,p.jsxs)("div",{className:s().input_wrap,children:[(0,p.jsxs)("div",{className:s().img_wrap,children:[(0,p.jsx)("img",{style:{width:"200px",margin:"10vh 0"},src:"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_14/pic1728899129621292.png&n=-1&q=80",alt:""}),i&&!N?"":(0,p.jsxs)("div",{className:s().loading_tips,children:[(0,p.jsx)(l.Z,{type:"loading_2",className:s().loading_icon}),i?N&&"正在加入房间...":"正在连接服务器..."]})]}),(0,p.jsx)("input",{type:"text",placeholder:"请输入房间号",className:s().input,defaultValue:b.roomId,onInput:function(e){return k(function(r){return m(m({},r),{},{roomId:e.target.value})})}}),(0,p.jsx)("input",{type:"text",placeholder:"请输入用户名",className:s().input,defaultValue:b.userName,onInput:function(e){return k(function(r){return m(m({},r),{},{userName:e.target.value})})}}),(0,p.jsx)("button",{className:"normal_btn",disabled:N||!i,onClick:M,children:N?"即将进入房间...":"创建/加入房间"})]})]})}},528:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/rtc",function(){return t(1721)}])},5494:function(e){e.exports={total_wrap:"rtc_total_wrap__mB_oN",img_wrap:"rtc_img_wrap__rWeS9",loading_tips:"rtc_loading_tips__fOgOz",loading_icon:"rtc_loading_icon__wfOHr",rotate:"rtc_rotate____jNs",input_wrap:"rtc_input_wrap__mExP5",input:"rtc_input__Lq1z2",local_wrap:"rtc_local_wrap__E9d6i",local_tips:"rtc_local_tips__8t67H",local_video:"rtc_local_video__6WAdj",target_video:"rtc_target_video__DTIyo",operate_wrap:"rtc_operate_wrap__sIOsu",room_msg:"rtc_room_msg__u5elS",chat_btn:"rtc_chat_btn__zByt7",back_btn:"rtc_back_btn__qoTkF",line_banner:"rtc_line_banner__Byl2n"}}},function(e){e.O(0,[642,774,888,179],function(){return e(e.s=528)}),_N_E=e.O()}]);