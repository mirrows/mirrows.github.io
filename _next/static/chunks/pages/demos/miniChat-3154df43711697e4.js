(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[153],{1038:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return O},default:function(){return N}});var r=t(29),o=t(7794),c=t.n(o),a=t(7294),i=t(1270),u=t.n(i),s=t(5835),l=t(7642),d=t(9499),f=t(4730),p=t(9922),v=t(3806),m=t(3143),_=t.n(m),w=t(8924),h=t.n(w),b=t(9980),g=t.n(b),x=t(5893),y=["isCanSubmit","onSubmit","placeholder"];function j(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function k(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?j(Object(t),!0).forEach(function(n){(0,d.Z)(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}var S=(0,a.forwardRef)(function(e,n){var t=e.isCanSubmit,r=void 0===t||t,o=e.onSubmit,c=e.placeholder,i=(0,f.Z)(e,y),u=new(g()),s=(0,a.useRef)(null),l=(0,a.useRef)(null),d=(0,a.useState)(!1),m=d[0],w=d[1],b=(0,a.useRef)(null),j=(0,a.useState)(!1),S=j[0],O=j[1],N=function(){if(null!==(e=l.current)&&void 0!==e&&e.value){var e,n=h()(u.render(l.current.value));(null==b?void 0:b.current)&&(b.current.innerHTML=n)}};return(0,a.useImperativeHandle)(n,function(){return{insertContent:function(e){l.current&&(l.current.value+=e)}}}),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(p.Z,k(k({ref:s,clickable:!1},i),{},{autoUpload:!0,operateLineStyle:m?{marginTop:"0"}:{},onFinish:function(e){console.log(e),setTimeout(function(){l.current&&(l.current.value=l.current.value+e.map(function(e){var n=e.normal;return"\n![".concat(n.name,"](https://wsrv.nl/?url=").concat(n.download_url.replace("https://",""),")")}).join("\n"),l.current.focus())})},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("label",{htmlFor:"commentInput"}),(0,x.jsx)("textarea",{id:"commentInput",ref:l,className:_().text_area,rows:8,style:{display:m?"none":"block"},placeholder:void 0===c?"请输入, 支持markdown语法......":c,suppressContentEditableWarning:!0,contentEditable:!0,onPaste:function(e){var n,t=[],r=e.clipboardData.items;if(r&&r.length){for(var o=0;o<r.length;o++)if(-1!==r[o].type.indexOf("image")){var c=r[o].getAsFile();c&&t.push(c)}}t&&(null===(n=s.current)||void 0===n||n.addFile(t))},onInput:function(){var e;O(!(!r||!(null!==(e=l.current)&&void 0!==e&&e.value)))}})]}),(0,x.jsxs)("div",{className:_().operate_wrap,children:[(0,x.jsx)(v.Z,{type:"code",className:_().preview,alt:"preview",onClick:function(e){e.stopPropagation(),w(function(e){return e||N(),!e})}}),(0,x.jsx)("button",{className:_().submit,disabled:!S,"aria-label":"submit comment",onClick:function(e){var n;e.stopPropagation(),o({content:null===(n=l.current)||void 0===n?void 0:n.value})},children:"add comment"})]})]})),(0,x.jsx)("div",{className:_().preview_detail_wrap,style:{display:m?"block":"none"},children:(0,x.jsx)("div",{ref:b,className:"".concat(_().blog_content," ").concat(_().preview_detail)})})]})}),O=!0;function N(){var e,n=(0,a.useState)("https://raw.githubusercontent.com/mirrows/photo/main/normal/2024_10_28/pic1730078673558002.jpg")[0],t=(0,a.useState)([]),o=(t[0],t[1]),i=(0,a.useRef)([]),d=(0,a.useState)(!1),f=(d[0],d[1]),p=(0,a.useRef)(null),v=(0,a.useRef)(null),m=(0,a.useState)({roomId:"",userName:"",socketId:""}),_=m[0],w=m[1],h=(0,a.useRef)({roomId:"",userName:"",socketId:""}),b=(e=(0,r.Z)(c().mark(function e(){var n,t,r,o,a,i,u;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(54344,r=localStorage.info),!r){e.next=14;break}return e.prev=3,(o=JSON.parse(r)).socketId="",w(o),h.current=o,e.abrupt("return");case 11:e.prev=11,e.t0=e.catch(3),console.log("fail to parse info",r);case 14:return e.next=16,(0,s.oQ)();case 16:i=(null==(a=e.sent)?void 0:null===(n=a.results)||void 0===n?void 0:null===(t=n[0])||void 0===t?void 0:t.name)||"",u={roomId:String(Math.random()).slice(4,8),userName:i?"".concat(i.first," ").concat(i.last):String(Math.random()).slice(4,8),socketId:""},h.current=u,console.log(54344,u),w(u),localStorage.setItem("info",JSON.stringify(u));case 23:case"end":return e.stop()}},e,null,[[3,11]])})),function(){return e.apply(this,arguments)}),g=function(){var e;h.current.userName&&(localStorage.setItem("info",JSON.stringify(h.current)),null===(e=p.current)||void 0===e||e.emit("join",{info:h.current}))},y=function(){var e;console.log("leave room"),null===(e=p.current)||void 0===e||e.emit("leave",h.current)};function j(){return(j=(0,r.Z)(c().mark(function e(){var n,t,r;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return v.current||(v.current=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun.miwifi.com"},{urls:"stun:stun.voipbuster.com"},{urls:"stun:stun.qq.com"},{urls:"turn:stun.t-n.top:3478",username:"test12138",credential:"test12138"}]})),v.current.onicecandidate=function(e){i.current.forEach(function(n){var t;null===(t=p.current)||void 0===t||t.emit("add_candidate",{candidate:e.candidate,info:h.current,to:n})})},v.current.oniceconnectionstatechange=function(){var e,n,t,r;null===(e=v.current)||void 0===e||e.iceConnectionState,((null===(n=v.current)||void 0===n?void 0:n.iceConnectionState)==="disconnected"||(null===(t=v.current)||void 0===t?void 0:t.iceConnectionState)==="failed")&&console.warn("连接失败，请重新连接"),console.log("oniceconnectionstatechange: ".concat(null===(r=v.current)||void 0===r?void 0:r.iceConnectionState))},e.next=3,null===(n=v.current)||void 0===n?void 0:n.createOffer();case 3:return r=e.sent,e.next=6,null===(t=v.current)||void 0===t?void 0:t.setLocalDescription(r);case 6:i.current.forEach(function(e){var n;null===(n=p.current)||void 0===n||n.emit("offer",{offer:r,info:h.current,to:e})});case 7:case"end":return e.stop()}},e)}))).apply(this,arguments)}var k=function(){var e,n,t;console.log("init spcket"),p.current=(0,l.io)("wss://use.t-n.top",{transports:["websocket"],withCredentials:!0}),p.current.on("connected",function(e){console.log("new ID:",e),f(!0),h.current.socketId=e,w(h.current),g()}),p.current.on("join",function(e){var n=e.user,t=e.anothers;if(404===e.result){console.warn("该房间不存在或已销毁，请检查房间号");return}o(t),i.current=t,n.socketId!==h.current.socketId&&console.log("用户".concat(n.userName,"加入房间")),n.socketId===h.current.socketId&&t.length>0&&(console.log("你已加入房间"),function(){j.apply(this,arguments)}())}),p.current.on("receive_offer",(e=(0,r.Z)(c().mark(function e(n){var t,r,o,a,i,u;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=n.info,a=n.to,i=n.offer,v.current){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,v.current.setRemoteDescription(i);case 5:return e.next=7,null===(t=v.current)||void 0===t?void 0:t.createAnswer();case 7:return u=e.sent,e.next=10,v.current.setLocalDescription(u);case 10:null===(r=p.current)||void 0===r||r.emit("answer",{answer:u,info:a,to:o});case 11:case"end":return e.stop()}},e)})),function(n){return e.apply(this,arguments)})),p.current.on("receive_answer",(n=(0,r.Z)(c().mark(function e(n){var t,r;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.answer,e.next=3,null===(t=v.current)||void 0===t?void 0:t.setRemoteDescription(r);case 3:case"end":return e.stop()}},e)})),function(e){return n.apply(this,arguments)})),p.current.on("add_candidate",(t=(0,r.Z)(c().mark(function e(n){var t,r;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=n.candidate,null===(t=v.current)||void 0===t||t.addIceCandidate(r);case 2:case"end":return e.stop()}},e)})),function(e){return t.apply(this,arguments)}))};return(0,a.useEffect)(function(){return b().then(function(){k()}),window.addEventListener("beforeunload",y),function(){var e,n;y(),null===(e=p.current)||void 0===e||e.disconnect(),null===(n=p.current)||void 0===n||n.off(),p.current=null,window.removeEventListener("beforeunload",y)}},[]),(0,x.jsx)(x.Fragment,{children:(0,x.jsx)("div",{className:u().chat_wrap,style:{backgroundImage:"url('".concat(n,"')")},children:(0,x.jsxs)("div",{className:u().main_container,children:[(0,x.jsx)("div",{children:_.userName}),(0,x.jsx)("div",{className:"".concat(u().contents," scroll_er"),children:(0,x.jsx)("div",{})}),(0,x.jsx)("div",{children:(0,x.jsx)(S,{style:{height:"unset"},onSubmit:function(e){console.log(e)}})})]})})})}},5083:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/miniChat",function(){return t(1038)}])},3143:function(e){e.exports={text_area:"MyTextarea_text_area__LOzbr",operate_wrap:"MyTextarea_operate_wrap__JRo7_",preview:"MyTextarea_preview__JYqBt",submit:"MyTextarea_submit__ykEIz",blog_content:"MyTextarea_blog_content__DkWlw",preview_detail:"MyTextarea_preview_detail__Dp34Q",preview_detail_wrap:"MyTextarea_preview_detail_wrap__fOhia",comment_detail:"MyTextarea_comment_detail__ZyhbX"}},1270:function(e){e.exports={chat_wrap:"miniChat_chat_wrap__FKgzw",main_container:"miniChat_main_container__odUrP",contents:"miniChat_contents__6drSv"}}},function(e){e.O(0,[880,811,642,922,774,888,179],function(){return e(e.s=5083)}),_N_E=e.O()}]);