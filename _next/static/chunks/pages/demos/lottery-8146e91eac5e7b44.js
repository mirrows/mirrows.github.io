(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[59],{2999:function(e,t,n){"use strict";var r=n(9499),i=n(4730),o=n(7294),c=n(5893),a=n(3454),s=["loadingPic","src","className","children"];function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,u=e.className,p=e.children,d=(0,i.Z)(e,s),f=(0,o.useRef)(t||a.env.NEXT_PUBLIC_LOADING_GIF||"https://empty.t-n.top/pub_lic/2023_06_09/pic1686281264582557.gif"),h=(0,o.useRef)("https://empty.t-n.top/pub_lic/2023_06_26/pic1687748007844003.png"),m=(0,o.useState)(f.current),g=m[0],b=m[1],_=(0,o.useState)(!1),x=_[0],y=_[1],v=(0,o.useRef)(null);return(0,o.useEffect)(function(){var e,t,r=document.documentElement.clientHeight,i=document.documentElement.clientWidth;null===(e=v.current)||void 0===e||e.classList.add("lazy"),y(!1),v.current&&!(v.current.getBoundingClientRect().top<-v.current.clientHeight||v.current.getBoundingClientRect().top>1.5*r)&&!(v.current.getBoundingClientRect().left<-i||v.current.getBoundingClientRect().left>1.5*i)&&v.current.getBoundingClientRect().width&&v.current.getBoundingClientRect().height&&(b(n),null===(t=v.current)||void 0===t||t.classList.remove("lazy"))},[n]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(u?"lazy ".concat(u):"lazy"),ref:v,src:g,"data-src":n,alt:"",onLoad:function(){return y(!0)},onError:function(){b(h.current),y(!0)}},d)),x||p]})}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=u,t.default=void 0;var r=n(6495).Z,i=n(2648).Z,o=(0,n(1598).Z)(n(7294)),c=i(n(1585)),a=n(8e3),s=n(5850),l=n(9470);function u(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var d=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,i,c,a,s=t.inAmpMode;return e.reduce(p,[]).reverse().concat(u(s).reverse()).filter((n=new Set,i=new Set,c=new Set,a={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var s=0,l=d.length;s<l;s++){var u=d[s];if(e.props.hasOwnProperty(u)){if("charSet"===u)c.has(u)?t=!1:c.add(u);else{var p=e.props[u],f=a[u]||new Set;("name"!==u||!r)&&f.has(p)?t=!1:(f.add(p),a[u]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!s&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=r({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,o.default.cloneElement(e,i)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(a.AmpStateContext),r=o.useContext(s.HeadManagerContext);return o.default.createElement(c.default,{reduceComponentsToState:f,headManager:r,inAmpMode:l.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,a=e.reduceComponentsToState;function s(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(a(t,e))}}return i&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),s()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=s),function(){n&&(n._pendingUpdate=s)}}),c(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),i=!1,o=r.useLayoutEffect,c=i?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},5967:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(9499),i=n(7812),o=n(2999),c=n(3806),a=n(6831),s=n(9008),l=n.n(s),u=n(7294),p=n(9521),d=n(5893);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var m=p.ZP.div.withConfig({displayName:"lottery__DIV",componentId:"sc-i3djvo-0"})([".lottery_bg{position:fixed;top:0;bottom:0;left:0;right:0;max-width:80%;height:unset;max-height:80%;margin:auto;text-align:center;}.pointer_wrap{position:fixed;top:0;bottom:0;left:0;right:0;width:6rem;height:9rem;margin:auto;text-align:center;transition:3s ease;transform:rotate(0deg);.pointer{position:relative;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-70%);}}.start_btn{width:5rem;height:5rem;cursor:pointer;border-radius:50%;}.line_wrap{max-width:400px;max-height:400px;width:70vw;height:70vw;border-radius:50%;}.line{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;height:45%;width:1px;transform-origin:50% 100%;background-color:rgb(154 200 255 / 55%);}.area_item{position:absolute;top:10px;left:0;right:0;max-width:100px;height:unset;margin:auto;border-radius:30%;overflow:hidden;transform-origin:50% min(32vw,190px);cursor:pointer;&:hover{background-image:linear-gradient(45deg,black,transparent);}}.rate_table{position:fixed;right:0;bottom:0;margin:10px;}.table_wrap{position:absolute;right:0;bottom:0;max-width:100vw;padding:10px 5px 32px;background-color:rgba(0,0,0,.5);border-radius:4px;color:#fff;transform-origin:100% 100%;transition:.3s;&.modal-active{transform:scale(1);}&.modal-hide{transform:scale(0);}.n_input{width:100px;padding:2px 5px;border-radius:4px;border:none;outline:none;}}.table_switch{position:relative;z-index:6;&.modal-active{fill:#fff;}}input[readonly]{background-color:inherit;border:none;color:#fff;}.modal_wrap{position:fixed;top:50%;left:0;right:0;max-width:40%;min-width:240px;margin:auto;transform:translateY(-50%);text-align:center;}.con_img{position:relative;bottom:-16px;width:160px;height:unset;z-index:1;}.modal_content{position:relative;width:fit-content;min-widtH:160px;max-widtH:240px;padding:10px 32px;background-color:#ff3030;border-radius:12px;border:4px solid;margin:auto;word-break:break-all;font-size:2.5rem;font-weight:bold;font-family:youyuan;color:#ffc788;}.modal_content:after{content:'';position:absolute;top:2px;bottom:2px;left:2px;right:2px;border:2px dashed;border-radius:6px;}.sector_wrap{overflow:hidden;.sector_item{position:absolute;top:-50%;left:-50%;width:100%;height:100%;padding:0;transform-origin:bottom right;cursor:pointer;transition:.3s;box-sizing:border-box;}.sector_item:before{content:'';display:block;width:100%;height:100%;}.sector_item:hover{padding:10px;}.sector_item:hover:before{background-color:rgba(225,225,225,.5);box-shadow:0 0 20px #cccccc;}}.item_wrap{display:flex;margin:5px;.input_wrap{display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;margin-right:8px;.item_checked{width:20px;height:20px;}}.item_opera{position:relative;}}.checked_btn{width:20px;height:20px;margin:0;}.scroll_wrap{max-height:60vh;overflow-y:auto;}.power_wrap{position:absolute;margin:5px;.checked_btn{margin-right:4px;}}"]);function g(){var e,t=(0,u.useState)(!1),n=t[0],r=t[1],s=(0,u.useState)(!1),p=s[0],f=s[1],g=(0,u.useState)(-1),b=g[0],_=g[1],x=(0,u.useState)(0),y=x[0],v=x[1],w=(0,u.useState)(!0),j=w[0],k=w[1],O=(0,u.useRef)(7),N=(0,u.useState)([{name:"t1",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162882486612.png",target:"",percent:.1},{name:"t2",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_05_31/pic1685527384699939.png",target:"",percent:.05},{name:"t3",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_05_31/pic1685527386794892.png",target:"",percent:.4},{name:"t4",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162735145513.png",target:"",percent:.1},{name:"t5",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162737072848.png",target:"",percent:.2},{name:"t6",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_05_31/pic1685527382597218.png",target:"",percent:.15}]),S=N[0],Z=N[1],C=(0,u.useState)("empty"),P=C[0],E=C[1],M=(0,u.useMemo)(function(){var e=S.filter(function(e){return e.checked&&e.percent>0}).map(function(e){return e.percent}).reduce(function(e,t){return+(e-t).toFixed(4)},1);return e>0?[{name:P,img:"https://empty.t-n.top/pub_lic/2023_06_21/pic1687315603128458.png",target:"",percent:e}]:[]},[S,P]),I=(0,u.useMemo)(function(){return j?[].concat((0,i.Z)(S.filter(function(e){return e.checked&&e.percent>0})),(0,i.Z)(M)):S.filter(function(e){return e.checked})},[M,S,j]),A=function(e,t,n){var r=JSON.parse(JSON.stringify(S));if(e===r.length)E(n);else{r[e][t]=n;var i=r.filter(function(e){return e.checked}).reduce(function(e,t){return e+ +t.percent},0);if(console.log(r[e].percent,i,t),r[e].checked&&i>1&&"percent"!==t){var o=r[e].percent-(i-1);console.log(o),r[e].percent=+(o>0?o:0).toFixed(4)}Z(r)}},F=function(e,t,n){A(e,t,n)},D=(0,u.useCallback)(function(){var e=Math.random(),t=[].concat((0,i.Z)(S.filter(function(e){return e.checked&&(!j||e.percent>0)})),(0,i.Z)(j?M:[])),n=+(1/S.filter(function(e){return e.checked}).length).toFixed(4);return t.findIndex(function(t){return(e-=j?t.percent:n)<=0})},[S,M,j]),R=function(){Z(function(e){var t,n=JSON.parse(JSON.stringify(e));return n.push({name:"empty"!==P?P:"t".concat(O.current),checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162882486612.png",target:"",percent:(null===(t=M[0])||void 0===t?void 0:t.percent)||0}),n}),E("empty"),O.current++},z=function(e){Z(function(t){var n=JSON.parse(JSON.stringify(t));return n.splice(e,1),n})},B=function(e,t){var n=S.filter(function(e){return e.checked&&e.percent>0}).map(function(e){return e.percent}).reduce(function(n,r,i){return+(n+(i===t?+e.target.value:r)).toFixed(4)},0);A(t,"percent",n>1&&S[t].checked?+(+e.target.value-n+1).toFixed(4):+(+e.target.value).toFixed(4))},U=function(e){k(e)};return(0,u.useEffect)(function(){if(n){var e=j?[].concat((0,i.Z)(S.filter(function(e){return e.checked&&e.percent>0})),(0,i.Z)(M)):S.filter(function(e){return e.checked}),t=D(),r=360/e.length,o=.8*Math.random()+.1;_(t),v(function(e){return 1440+t*r+Math.floor((o-.5)*r)})}},[n,D,S,M,j]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l(),{children:(0,d.jsx)("title",{children:"抽奖"})}),(0,d.jsxs)(m,{children:[(0,d.jsx)(o.Z,{className:"lottery_bg",width:"460",height:"460",src:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687141057059729.png"}),(0,d.jsx)("div",{className:"line_wrap lottery_bg sector_wrap",children:I.map(function(e,t,n){return n.length>1&&(0,d.jsx)("div",{className:"sector_item",style:{transform:"scale(1.5) rotate(".concat(n.length>2?360/n.length*(t-.5)+90:180*t,"deg)").concat(n.length>2?" skew(".concat(90-360/n.length,"deg)"):"translateX(50%)")}},t)})}),(0,d.jsx)("div",{className:"line_wrap lottery_bg no-pointer",children:I.map(function(e,t,n){return(0,d.jsx)(o.Z,{className:"area_item",width:"100",height:"100",src:e.img,style:{width:"".concat(18-n.length,"vw"),transform:"rotate(".concat(360/n.length*t,"deg)")}},t)})}),(0,d.jsx)("div",{className:"line_wrap lottery_bg no-pointer",children:I.map(function(e,t,n){return n.length>1&&(0,d.jsx)("div",{className:"line",style:{transform:"translateY(-50%) rotate(".concat(360/n.length*(t+.5),"deg)")}},t)})}),(0,d.jsx)("div",{className:"pointer_wrap",style:{transform:"rotate(".concat(y,"deg)"),transitionDuration:n?"3s":"0s"},onTransitionEnd:function(){r(!1),v(function(e){return e%360}),f(!0)},children:(0,d.jsx)(o.Z,{className:"pointer",width:"96",height:"144",src:"https://empty.t-n.top/pub_lic/2023_06_21/pic1687328567823851.png"})}),(0,d.jsx)(o.Z,{className:"lottery_bg start_btn",width:"80",height:"80",src:"https://empty.t-n.top/pub_lic/2023_06_21/pic1687328322726591.webp",onClick:function(){n||(v(function(e){return e%360}),setTimeout(function(){r(!0)}))}}),(0,d.jsx)("div",{className:"rate_table",children:(0,d.jsxs)(a.Z,{children:[(0,d.jsx)(c.Z,{className:"table_switch",type:"list",width:"32"}),(0,d.jsxs)("div",{className:"table_wrap",children:[(0,d.jsx)("ul",{className:"scroll_wrap no_scroll_bar",children:[].concat((0,i.Z)(S),(0,i.Z)(j?M:[])).map(function(e,t,n){return(0,d.jsxs)("li",{className:"item_wrap",children:[(0,d.jsxs)("div",{className:"input_wrap",children:[(0,d.jsx)("div",{className:"item_checked",children:"checked"in e&&"boolean"==typeof e.checked?(0,d.jsx)("input",{className:"checked_btn","aria-label":"if it can be used in the following lottery",type:"checkbox",name:"",checked:e.checked,id:"",onChange:function(e){return F(t,"checked",e.target.checked)}}):n.length<10?(0,d.jsx)(c.Z,{type:"plus",style:{fill:"#fff"},onClick:R}):""}),(0,d.jsx)("div",{className:"item_del",children:"checked"in e&&n.length>2?(0,d.jsx)(c.Z,{type:"trash",style:{fill:"#fff"},width:"16",onClick:function(){return z(t)}}):""})]}),(0,d.jsxs)("div",{className:"input_wrap",children:[(0,d.jsx)("input",{className:"n_input",type:"text","aria-label":"lottery item name",placeholder:"名称",value:e.name,onChange:function(e){return A(t,"name",e.target.value)}}),(0,d.jsx)("input",h(h({className:"n_input",type:"number","aria-label":"the posibility it win",placeholder:"权重"},"checked"in e?{disabled:!j}:{readOnly:!0,disabled:!0}),{},{value:String(j?e.percent:+(1/S.filter(function(e){return e.checked}).length).toFixed(4)),onChange:function(e){return A(t,"percent",e.target.value)},onBlur:function(e){return B(e,t)}}))]}),(0,d.jsx)("div",{className:"item_opera",children:(0,d.jsx)(o.Z,{src:e.img,width:"50",height:"50"})})]},t)})}),(0,d.jsxs)("div",{className:"power_wrap",children:[(0,d.jsxs)("label",{children:[(0,d.jsx)("input",{className:"checked_btn",type:"checkbox","aria-label":"if show each item the same Weights",checked:j,onChange:function(e){return U(e.target.checked)}}),"权重"]}),!j&&[].concat((0,i.Z)(S),(0,i.Z)(M)).length<10?(0,d.jsx)(c.Z,{type:"plus",width:"20",style:{fill:"#fff",marginLeft:"5px"},onClick:R}):""]})]})]})}),-1!==b&&p&&(0,d.jsx)("div",{className:"modal_mask",onClick:function(){f(!1)},children:(0,d.jsxs)("div",{className:"modal_wrap",children:[(0,d.jsx)(o.Z,{className:"con_img",width:"342",height:"286",src:"https://empty.t-n.top/pub_lic/2023_06_26/pic1687747158480258.gif"}),(0,d.jsx)("div",{className:"modal_content",children:null===(e=I[b])||void 0===e?void 0:e.name})]})})]})]})}},2634:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/lottery",function(){return n(5967)}])},9008:function(e,t,n){e.exports=n(2717)},7812:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(2587),i=n(2937);function o(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,i.Z)(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=2634)}),_N_E=e.O()}]);