(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[59],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=p,t.default=void 0;var r=n(6495).Z,i=n(2648).Z,o=(0,n(1598).Z)(n(7294)),a=i(n(1585)),c=n(8e3),s=n(5850),l=n(9470);function p(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var u=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,i,a,c,s=t.inAmpMode;return e.reduce(d,[]).reverse().concat(p(s).reverse()).filter((n=new Set,i=new Set,a=new Set,c={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var s=0,l=u.length;s<l;s++){var p=u[s];if(e.props.hasOwnProperty(p)){if("charSet"===p)a.has(p)?t=!1:a.add(p);else{var d=e.props[p],f=c[p]||new Set;("name"!==p||!r)&&f.has(d)?t=!1:(f.add(d),c[p]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!s&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=r({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,o.default.cloneElement(e,i)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(c.AmpStateContext),r=o.useContext(s.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:f,headManager:r,inAmpMode:l.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,c=e.reduceComponentsToState;function s(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(c(t,e))}}return i&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),s()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=s),function(){n&&(n._pendingUpdate=s)}}),a(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),i=!1,o=r.useLayoutEffect,a=i?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},5967:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return g},default:function(){return _}});var r=n(9499),i=n(7812),o=n(2999),a=n(3806),c=n(6831),s=n(9008),l=n.n(s),p=n(7294),d=n(9521),u=n(5893);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var m=d.ZP.div.withConfig({displayName:"lottery__DIV",componentId:"sc-i3djvo-0"})([".lottery_bg{position:fixed;top:0;bottom:0;left:0;right:0;max-width:80%;height:unset;max-height:80%;margin:auto;text-align:center;}.pointer_wrap{position:fixed;top:0;bottom:0;left:0;right:0;width:6rem;height:9rem;margin:auto;text-align:center;transition:3s ease;transform:rotate(0deg);.pointer{position:relative;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%,-70%);}}.start_btn{width:5rem;height:5rem;cursor:pointer;border-radius:50%;}.line_wrap{max-width:400px;max-height:400px;width:70vw;height:70vw;border-radius:50%;}.line{position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;height:45%;width:1px;transform-origin:50% 100%;background-color:rgb(154 200 255 / 55%);}.area_item{position:absolute;top:10px;left:0;right:0;max-width:100px;height:unset;margin:auto;border-radius:30%;overflow:hidden;perspective:1000;transform-origin:50% 32vw;cursor:pointer;&:hover{background-image:linear-gradient(45deg,black,transparent);}}@media (min-width:600px){.area_item{transform-origin:50% 190px;}}.rate_table{position:fixed;right:0;bottom:0;margin:10px;}.table_wrap{position:absolute;right:0;bottom:0;max-width:100vw;padding:10px 5px 32px;background-color:rgba(0,0,0,.5);border-radius:4px;color:#fff;transform-origin:100% 100%;transition:.3s;&.modal-active{transform:scale(1);}&.modal-hide{transform:scale(0);}.n_input{width:100px;padding:2px 5px;border-radius:4px;border:none;outline:none;}}.table_switch{position:relative;z-index:6;&.modal-active{fill:#fff;}}input[readonly]{background-color:inherit;border:none;color:#fff;}.modal_wrap{position:fixed;top:50%;left:0;right:0;max-width:40%;min-width:240px;margin:auto;transform:translateY(-50%);text-align:center;}.con_img{position:relative;bottom:-16px;width:160px;height:unset;z-index:1;}.modal_content{position:relative;width:fit-content;min-widtH:160px;max-widtH:240px;padding:10px 32px;background-color:#ff3030;border-radius:12px;border:4px solid;margin:auto;word-break:break-all;font-size:2.5rem;font-weight:bold;font-family:youyuan;color:#ffc788;}.modal_content:after{content:'';position:absolute;top:2px;bottom:2px;left:2px;right:2px;border:2px dashed;border-radius:6px;}.sector_wrap{overflow:hidden;.sector_item{position:absolute;top:-50%;left:-50%;width:100%;height:100%;padding:0;transform-origin:bottom right;cursor:pointer;transition:.3s;box-sizing:border-box;}.sector_item:before{content:'';display:block;width:100%;height:100%;}.sector_item:hover{padding:10px;}.sector_item:hover:before{background-color:rgba(225,225,225,.5);box-shadow:0 0 20px #cccccc;}}.item_wrap{display:flex;margin:5px;.input_wrap{display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;margin-right:8px;.item_checked{width:20px;height:20px;}}.item_opera{position:relative;}}.checked_btn{width:20px;height:20px;margin:0;}.scroll_wrap{max-height:60vh;overflow-y:auto;}.power_wrap{position:absolute;margin:5px;.checked_btn{margin-right:4px;}}"]),g=!0;function _(){var e,t=(0,p.useState)(!1),n=t[0],r=t[1],s=(0,p.useState)(!1),d=s[0],f=s[1],g=(0,p.useState)(-1),_=g[0],b=g[1],x=(0,p.useState)(0),v=x[0],y=x[1],w=(0,p.useState)(!0),k=w[0],j=w[1],N=(0,p.useRef)(7),O=(0,p.useState)([{name:"t1",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162882486612.png",target:"",percent:.1},{name:"t2",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_05_31/pic1685527384699939.png",target:"",percent:.05},{name:"t3",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_05_31/pic1685527386794892.png",target:"",percent:.4},{name:"t4",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162735145513.png",target:"",percent:.1},{name:"t5",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162737072848.png",target:"",percent:.2},{name:"t6",checked:!0,img:"https://empty.t-n.top/pub_lic/2023_05_31/pic1685527382597218.png",target:"",percent:.15}]),S=O[0],Z=O[1],C=(0,p.useState)("empty"),M=C[0],P=C[1],E=(0,p.useMemo)(function(){var e=S.filter(function(e){return e.checked&&e.percent>0}).map(function(e){return e.percent}).reduce(function(e,t){return+(e-t).toFixed(4)},1);return e>0?[{name:M,img:"https://empty.t-n.top/pub_lic/2023_06_21/pic1687315603128458.png",target:"",percent:e}]:[]},[S,M]),A=(0,p.useMemo)(function(){return k?[].concat((0,i.Z)(S.filter(function(e){return e.checked&&e.percent>0})),(0,i.Z)(E)):S.filter(function(e){return e.checked})},[E,S,k]),I=function(e,t,n){var r=JSON.parse(JSON.stringify(S));if(e===r.length)P(n);else{r[e][t]=n;var i=r.filter(function(e){return e.checked}).reduce(function(e,t){return e+ +t.percent},0);if(console.log(r[e].percent,i,t),r[e].checked&&i>1&&"percent"!==t){var o=r[e].percent-(i-1);console.log(o),r[e].percent=+(o>0?o:0).toFixed(4)}Z(r)}},F=function(e,t,n){I(e,t,n)},U=(0,p.useCallback)(function(){var e=Math.random(),t=[].concat((0,i.Z)(S.filter(function(e){return e.checked&&(!k||e.percent>0)})),(0,i.Z)(k?E:[])),n=+(1/S.filter(function(e){return e.checked}).length).toFixed(4);return t.findIndex(function(t){return(e-=k?t.percent:n)<=0})},[S,E,k]),T=function(){Z(function(e){var t,n=JSON.parse(JSON.stringify(e));return n.push({name:"empty"!==M?M:"t".concat(N.current),checked:!0,img:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687162882486612.png",target:"",percent:(null===(t=E[0])||void 0===t?void 0:t.percent)||0}),n}),P("empty"),N.current++},D=function(e){Z(function(t){var n=JSON.parse(JSON.stringify(t));return n.splice(e,1),n})},J=function(e,t){var n=S.filter(function(e){return e.checked&&e.percent>0}).map(function(e){return e.percent}).reduce(function(n,r,i){return+(n+(i===t?+e.target.value:r)).toFixed(4)},0);I(t,"percent",n>1&&S[t].checked?+(+e.target.value-n+1).toFixed(4):+(+e.target.value).toFixed(4))},z=function(e){j(e)};return(0,p.useEffect)(function(){if(n){var e=k?[].concat((0,i.Z)(S.filter(function(e){return e.checked&&e.percent>0})),(0,i.Z)(E)):S.filter(function(e){return e.checked}),t=U(),r=360/e.length,o=.8*Math.random()+.1;b(t),y(function(e){return 1440+t*r+Math.floor((o-.5)*r)})}},[n,U,S,E,k]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(l(),{children:(0,u.jsx)("title",{children:"抽奖"})}),(0,u.jsxs)(m,{children:[(0,u.jsx)(o.Z,{className:"lottery_bg",width:"460",height:"460",src:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687141057059729.png"}),(0,u.jsx)("div",{className:"line_wrap lottery_bg sector_wrap",children:A.map(function(e,t,n){return n.length>1&&(0,u.jsx)("div",{className:"sector_item",style:{transform:"scale(1.5) rotate(".concat(n.length>2?360/n.length*(t-.5)+90:180*t,"deg)").concat(n.length>2?" skew(".concat(90-360/n.length,"deg)"):"translateX(50%)")}},t)})}),(0,u.jsx)("div",{className:"line_wrap lottery_bg no-pointer",children:A.map(function(e,t,n){return(0,u.jsx)(o.Z,{className:"area_item",width:"100",height:"100",src:e.img,style:{width:"".concat(18-n.length,"vw"),transform:"rotate(".concat(360/n.length*t,"deg)")}},t)})}),(0,u.jsx)("div",{className:"line_wrap lottery_bg no-pointer",children:A.map(function(e,t,n){return n.length>1&&(0,u.jsx)("div",{className:"line",style:{transform:"translateY(-50%) rotate(".concat(360/n.length*(t+.5),"deg)")}},t)})}),(0,u.jsx)("div",{className:"pointer_wrap",style:{transform:"rotate(".concat(v,"deg)"),transitionDuration:n?"3s":"0s"},onTransitionEnd:function(){r(!1),y(function(e){return e%360}),f(!0)},children:(0,u.jsx)(o.Z,{className:"pointer",width:"96",height:"144",src:"https://empty.t-n.top/pub_lic/2023_06_21/pic1687328567823851.png"})}),(0,u.jsx)(o.Z,{className:"lottery_bg start_btn",width:"80",height:"80",src:"https://empty.t-n.top/pub_lic/2023_06_21/pic1687328322726591.webp",onClick:function(){n||(y(function(e){return e%360}),setTimeout(function(){r(!0)}))}}),(0,u.jsx)("div",{className:"rate_table",children:(0,u.jsxs)(c.Z,{children:[(0,u.jsx)(a.Z,{className:"table_switch",type:"list",width:"32"}),(0,u.jsxs)("div",{className:"table_wrap",children:[(0,u.jsx)("ul",{className:"scroll_wrap no_scroll_bar",children:[].concat((0,i.Z)(S),(0,i.Z)(k?E:[])).map(function(e,t,n){return(0,u.jsxs)("li",{className:"item_wrap",children:[(0,u.jsxs)("div",{className:"input_wrap",children:[(0,u.jsx)("div",{className:"item_checked",children:"checked"in e&&"boolean"==typeof e.checked?(0,u.jsx)("input",{className:"checked_btn","aria-label":"if it can be used in the following lottery",type:"checkbox",name:"",checked:e.checked,id:"",onChange:function(e){return F(t,"checked",e.target.checked)}}):n.length<10?(0,u.jsx)(a.Z,{type:"plus",style:{fill:"#fff"},onClick:T}):""}),(0,u.jsx)("div",{className:"item_del",children:"checked"in e&&n.length>2?(0,u.jsx)(a.Z,{type:"trash",style:{fill:"#fff"},width:"16",onClick:function(){return D(t)}}):""})]}),(0,u.jsxs)("div",{className:"input_wrap",children:[(0,u.jsx)("input",{className:"n_input",type:"text","aria-label":"lottery item name",placeholder:"名称",value:e.name,onChange:function(e){return I(t,"name",e.target.value)}}),(0,u.jsx)("input",h(h({className:"n_input",type:"number","aria-label":"the posibility it win",placeholder:"权重"},"checked"in e?{disabled:!k}:{readOnly:!0,disabled:!0}),{},{value:String(k?e.percent:+(1/S.filter(function(e){return e.checked}).length).toFixed(4)),onChange:function(e){return I(t,"percent",e.target.value)},onBlur:function(e){return J(e,t)}}))]}),(0,u.jsx)("div",{className:"item_opera",children:(0,u.jsx)(o.Z,{src:e.img,width:"50",height:"50"})})]},t)})}),(0,u.jsxs)("div",{className:"power_wrap",children:[(0,u.jsxs)("label",{children:[(0,u.jsx)("input",{className:"checked_btn",type:"checkbox","aria-label":"if show each item the same Weights",checked:k,onChange:function(e){return z(e.target.checked)}}),"权重"]}),!k&&[].concat((0,i.Z)(S),(0,i.Z)(E)).length<10?(0,u.jsx)(a.Z,{type:"plus",width:"20",style:{fill:"#fff",marginLeft:"5px"},onClick:T}):""]})]})]})}),-1!==_&&d&&(0,u.jsx)("div",{className:"modal_mask",onClick:function(){f(!1)},children:(0,u.jsxs)("div",{className:"modal_wrap",children:[(0,u.jsx)("img",{className:"con_img",width:"342",height:"286",src:"https://empty.t-n.top/pub_lic/2023_06_26/pic1687747158480258.gif"}),(0,u.jsx)("div",{className:"modal_content",children:null===(e=A[_])||void 0===e?void 0:e.name})]})})]})]})}},2634:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/lottery",function(){return n(5967)}])},9008:function(e,t,n){e.exports=n(2717)},7812:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(2587),i=n(2937);function o(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,i.Z)(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=2634)}),_N_E=e.O()}]);