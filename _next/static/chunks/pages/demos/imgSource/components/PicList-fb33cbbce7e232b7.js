(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[932],{2999:function(e,t,n){"use strict";var r=n(9499),o=n(4730),c=n(7294),u=n(5893),i=n(3454),a=["loadingPic","src","className","beforeLoad","onLoad","noReload","children","isShow"];function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,d=e.className,l=(e.beforeLoad,e.onLoad),f=void 0===l?function(e){return Promise.resolve(e)}:l,p=e.noReload,m=void 0!==p&&p,h=e.children,g=e.isShow,v=void 0===g||g,w=(0,o.Z)(e,a),b=(0,c.useRef)(t||"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80"),O=(0,c.useRef)(i.env.NEXT_PUBLIC_FAIL_IMG),P=(0,c.useState)(),y=P[0],_=P[1],j=(0,c.useState)(!1),E=j[0],R=j[1],L=(0,c.useRef)(null),C=(0,c.useRef)(0);return(0,c.useEffect)(function(){if(!C.current){var e,t,r=document.documentElement.clientHeight,o=document.documentElement.clientWidth;m||null===(e=L.current)||void 0===e||e.classList.add("lazy"),R(!1),L.current&&!(L.current.getBoundingClientRect().top<-L.current.clientHeight||L.current.getBoundingClientRect().top>1.5*r)&&!(L.current.getBoundingClientRect().left<-o||L.current.getBoundingClientRect().left>1.5*o)&&L.current.getBoundingClientRect().width&&L.current.getBoundingClientRect().height&&v&&(m&&(C.current=1),null===(t=L.current)||void 0===t||t.classList.remove("lazy"),_(n))}},[n,v,m]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(d?"lazy ".concat(d):"lazy"),ref:L,src:y,"data-src":n,alt:"",style:{backgroundImage:"url('".concat(b.current,"')")},onLoad:function(){var e;R(!0),n===(null===(e=L.current)||void 0===e?void 0:e.src)&&f(n)},onError:function(){var e;null===(e=L.current)||void 0===e||e.classList.add("lazy"),_(O.current),R(!0)}},w)),E||h]})}},7167:function(e,t,n){"use strict";n.d(t,{Is:function(){return d},P_:function(){return i},VD:function(){return o},Zb:function(){return a},iS:function(){return u},yJ:function(){return s}});var r,o,c=n(842);(r=o||(o={})).PHOTO="photo",r.PRIVATE="private";var u=function(e){return(0,c.Xv)({path:"/demos/uploadBase64",method:"put",headers:{timestamp:Date.now()},params:e})},i=function(e){return(0,c.Xv)({path:"/demos/uploadUrl",method:"put",headers:{timestamp:Date.now()},params:e})},a=function(e,t){return(0,c.Xv)({path:"/demos/queryPicList",method:"post",params:{path:e,mode:t}})},s=function(e,t){return(0,c.Xv)({path:"/demos/queryPic",method:"post",params:{path:e,mode:t}})},d=function(e){return(0,c.Xv)({path:"/demos/deletePic",method:"post",headers:{timestamp:Date.now()},params:e})}},8821:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/imgSource/components/PicList",function(){return n(2561)}])}},function(e){e.O(0,[561,774,888,179],function(){return e(e.s=8821)}),_N_E=e.O()}]);