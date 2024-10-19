(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[826],{1721:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return h},default:function(){return g}});var n=r(29),c=r(9499),o=r(7794),u=r.n(o),a=r(7294),i=r(5494),s=r.n(i),l=r(3806),d=r(5835),f=r(7642),p=r(1575),v=r(5893);function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach(function(t){(0,c.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var h=!0;function g(){var e=(0,a.useState)(!1),t=e[0],r=e[1],c=(0,a.useState)({roomId:"",userName:"",socketId:""}),o=c[0],i=c[1],m=(0,a.useRef)({roomId:"",userName:"",socketId:""}),h=(0,a.useRef)(null),g=(0,a.useRef)(null),w=(0,a.useRef)(null),x=(0,a.useRef)(null),b=(0,a.useRef)(null),k=(0,a.useRef)(null),j=(0,a.useState)(!1),y=j[0],I=j[1],N=function(){var e=localStorage.info;if(e)try{i(JSON.parse(e));return}catch(t){console.log("fail to parse info",e)}(0,d.oQ)().then(function(e){console.log(e);var t,r,n=(null==e?void 0:null===(t=e.results)||void 0===t?void 0:null===(r=t[0])||void 0===r?void 0:r.name)||"",c={roomId:String(Math.random()).slice(4,8),userName:n?"".concat(n.first," ").concat(n.last):String(Math.random()).slice(4,8),socketId:""};i(c),localStorage.setItem("info",JSON.stringify(c))})};function O(){if(w){var e,t,n=null===(e=w.current)||void 0===e?void 0:e.getTracks();null==n||n.forEach(function(e){e.stop()}),g.current=null,r(!1),I(!1),null===(t=h.current)||void 0===t||t.emit("room_leave",o)}}var S=function(){var e,t,c,o;h.current=(0,f.io)("wss://use.t-n.top",{transports:["websocket"],withCredentials:!0}),h.current.on("connected",function(e){return i(function(t){return _(_({},t),{},{socketId:e})})}),h.current.on("room_full",function(){return alert("房间已满，请更换房间号ID")}),h.current.on("room_created",function(e){alert("您已创建并加入【".concat(e.roomId,"】房间")),r(!0)}),h.current.on("room_joined",function(e){r(!0),e.socketId!==m.current.socketId&&alert("用户".concat(e.userName,"加入【").concat(e.roomId,"】房间"))}),h.current.on("room_leave",function(e){e.socketId!==m.current.socketId?alert("用户".concat(e.userName,"已离开【").concat(e.roomId,"】房间")):r(!1)}),h.current.on("receive_video",function(e){var t;e.socketId!==m.current.socketId&&window.confirm("您要接受用户".concat(e.userName,"的视频电话邀请吗？"))&&(null===(t=h.current)||void 0===t||t.emit("accept_video",m.current))}),h.current.on("accept_video",(e=(0,n.Z)(u().mark(function e(t){var r,n,c,o;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,function(){return E.apply(this,arguments)}();case 2:if(function(){var e;g.current||(g.current=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"turn:stun.t-n.top:3478",username:"test12138",credential:"test12138"}]})),g.current.onicecandidate=function(e){var t;return null===(t=h.current)||void 0===t?void 0:t.emit("add_candidate",{candidate:e.candidate,info:m.current})},g.current.oniceconnectionstatechange=function(){var e;console.log("oniceconnectionstatechange: ".concat(null===(e=g.current)||void 0===e?void 0:e.iceConnectionState)),P()},g.current.ontrack=function(e){return b.current?b.current.srcObject=e.streams[0]:""},g.current.onicegatheringstatechange=function(){var e;console.log("onicegatheringstatechange: ".concat(null===(e=g.current)||void 0===e?void 0:e.iceGatheringState))},null===(e=w.current)||void 0===e||e.getTracks().forEach(function(e){if(w.current){var t;null===(t=g.current)||void 0===t||t.addTrack(e,w.current)}})}(),!(t.socketId!==m.current.socketId)){e.next=10;break}return e.next=6,null===(r=g.current)||void 0===r?void 0:r.createOffer();case 6:return o=e.sent,e.next=9,null===(n=g.current)||void 0===n?void 0:n.setLocalDescription(o);case 9:null===(c=h.current)||void 0===c||c.emit("offer",{offer:o,info:m.current});case 10:case"end":return e.stop()}},e)})),function(t){return e.apply(this,arguments)})),h.current.on("receive_offer",(t=(0,n.Z)(u().mark(function e(t){var r,n,c;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(g.current){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,g.current.setRemoteDescription(t);case 4:return e.next=6,null===(r=g.current)||void 0===r?void 0:r.createAnswer();case 6:return c=e.sent,e.next=9,g.current.setLocalDescription(c);case 9:null===(n=h.current)||void 0===n||n.emit("answer",{answer:c,info:m.current});case 10:case"end":return e.stop()}},e)})),function(e){return t.apply(this,arguments)})),h.current.on("receive_answer",(c=(0,n.Z)(u().mark(function e(t){return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",P(t));case 1:case"end":return e.stop()}},e)})),function(e){return c.apply(this,arguments)})),h.current.on("add_candidate",(o=(0,n.Z)(u().mark(function e(t){var r;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",null===(r=g.current)||void 0===r?void 0:r.addIceCandidate(t));case 1:case"end":return e.stop()}},e)})),function(e){return o.apply(this,arguments)}))},P=function(e){var t,r;e&&(k.current=e),k.current&&(null===(t=g.current)||void 0===t?void 0:t.iceConnectionState)==="connected"&&(null===(r=g.current)||void 0===r||r.setRemoteDescription(e))};function E(){return(E=(0,n.Z)(u().mark(function e(){return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!w.current){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,navigator.mediaDevices.getUserMedia({video:!p.tq||{facingMode:"user"},audio:!1}).catch(function(e){console.log("error happen: ".concat(e.name))});case 4:if(e.t0=e.sent,e.t0){e.next=7;break}e.t0=null;case 7:w.current=e.t0,w&&(I(!0),x.current&&w.current&&(x.current.srcObject=w.current));case 9:case"end":return e.stop()}},e)}))).apply(this,arguments)}return(0,a.useEffect)(function(){return N(),S(),function(){var e,t;O(),null===(e=h.current)||void 0===e||e.disconnect(),null===(t=h.current)||void 0===t||t.off()}},[]),(0,a.useEffect)(function(){m.current=o},[o]),(0,v.jsx)(v.Fragment,{children:t?(0,v.jsxs)("div",{className:s().total_wrap,children:[(0,v.jsx)("video",{ref:x,className:s().local_video,autoPlay:!0}),(0,v.jsx)("video",{ref:b,className:s().target_video,autoPlay:!0}),(0,v.jsxs)("div",{className:s().operate_wrap,children:[(0,v.jsx)("div",{className:s().room_msg,children:(0,v.jsxs)("div",{children:["房间号: ",o.roomId]})}),(0,v.jsx)("button",{className:s().chat_btn,style:{backgroundColor:y?"red":"green"},onClick:y?O:function(){var e;null===(e=h.current)||void 0===e||e.emit("request_video",o)},children:(0,v.jsx)(l.Z,{type:"chat_1",style:{width:"2rem",fill:"#FFF"}})})]})]}):(0,v.jsxs)("div",{className:s().input_wrap,children:[(0,v.jsx)("div",{children:(0,v.jsx)("img",{style:{width:"200px",margin:"10vh 0"},src:"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_14/pic1728899129621292.png&n=-1&q=80",alt:""})}),(0,v.jsx)("input",{type:"text",placeholder:"请输入房间号",className:s().input,defaultValue:o.roomId,onInput:function(e){return i(function(t){return _(_({},t),{},{roomId:e.target.value})})}}),(0,v.jsx)("input",{type:"text",placeholder:"请输入用户名",className:s().input,defaultValue:o.userName,onInput:function(e){return i(function(t){return _(_({},t),{},{userName:e.target.value})})}}),(0,v.jsx)("button",{className:"normal_btn",onClick:function(){var e;o.roomId&&o.userName&&(console.log(7777,o,h.current),localStorage.setItem("info",JSON.stringify(o)),null===(e=h.current)||void 0===e||e.emit("create_or_join_room",o))},children:"创建/加入房间"})]})})}},528:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/rtc",function(){return r(1721)}])},5494:function(e){e.exports={total_wrap:"rtc_total_wrap__mB_oN",input_wrap:"rtc_input_wrap__mExP5",input:"rtc_input__Lq1z2",local_video:"rtc_local_video__6WAdj",target_video:"rtc_target_video__DTIyo",operate_wrap:"rtc_operate_wrap__sIOsu",room_msg:"rtc_room_msg__u5elS",chat_btn:"rtc_chat_btn__zByt7"}}},function(e){e.O(0,[642,774,888,179],function(){return e(e.s=528)}),_N_E=e.O()}]);