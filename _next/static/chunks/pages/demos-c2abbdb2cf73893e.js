(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[528],{2999:function(e,t,n){"use strict";var r=n(9499),i=n(4730),o=n(7294),a=n(5893),c=n(3454),d=["loadingPic","src","className","beforeLoad","noReload","children","isShow"];function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,s=e.className,l=(e.beforeLoad,e.noReload),p=void 0!==l&&l,f=e.children,m=e.isShow,h=void 0===m||m,v=(0,i.Z)(e,d),g=(0,o.useRef)(t||"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80"),_=(0,o.useRef)(c.env.NEXT_FAIL_IMG),y=(0,o.useState)(g.current),w=y[0],b=y[1],x=(0,o.useState)(!1),j=x[0],O=x[1],S=(0,o.useRef)(null),k=(0,o.useRef)(0);return(0,o.useEffect)(function(){if(!k.current){var e,t,r=document.documentElement.clientHeight,i=document.documentElement.clientWidth;p||null===(e=S.current)||void 0===e||e.classList.add("lazy"),O(!1),S.current&&!(S.current.getBoundingClientRect().top<-S.current.clientHeight||S.current.getBoundingClientRect().top>1.5*r)&&!(S.current.getBoundingClientRect().left<-i||S.current.getBoundingClientRect().left>1.5*i)&&S.current.getBoundingClientRect().width&&S.current.getBoundingClientRect().height&&h&&(p&&(k.current=1),null===(t=S.current)||void 0===t||t.classList.remove("lazy"),b(n))}},[n,h,p]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(s?"lazy ".concat(s):"lazy"),ref:S,src:w,"data-src":n,alt:"",onLoad:function(){return O(!0)},onError:function(){var e;null===(e=S.current)||void 0===e||e.classList.add("lazy"),b(_.current),O(!0)}},v)),j||f]})}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=s,t.default=void 0;var r=n(6495).Z,i=n(2648).Z,o=(0,n(1598).Z)(n(7294)),a=i(n(1585)),c=n(8e3),d=n(5850),u=n(9470);function s(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function l(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,i,a,c,d=t.inAmpMode;return e.reduce(l,[]).reverse().concat(s(d).reverse()).filter((n=new Set,i=new Set,a=new Set,c={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var d=0,u=p.length;d<u;d++){var s=p[d];if(e.props.hasOwnProperty(s)){if("charSet"===s)a.has(s)?t=!1:a.add(s);else{var l=e.props[s],f=c[s]||new Set;("name"!==s||!r)&&f.has(l)?t=!1:(f.add(l),c[s]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!d&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=r({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,o.default.cloneElement(e,i)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(c.AmpStateContext),r=o.useContext(d.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:f,headManager:r,inAmpMode:u.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,c=e.reduceComponentsToState;function d(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(c(t,e))}}return i&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),d()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=d),function(){n&&(n._pendingUpdate=d)}}),a(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),i=!1,o=r.useLayoutEffect,a=i?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},863:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return p},default:function(){return f}});var r=n(2999),i=n(9008),o=n.n(i),a=n(1664),c=n.n(a),d=n(7294),u=n(9521),s=n(5893),l=u.ZP.div.withConfig({displayName:"demos__DIV",componentId:"sc-x0qut9-0"})(["overflow:hidden;.fire_wrap{position:fixed;width:100%;height:100%;vertical-align:bottom;z-index:0;}.items_wrap{position:relative;z-index:2;display:grid;justify-content:center;grid-template-columns:repeat(auto-fill,8rem);grid-gap:10px;min-width:200px;max-width:1200px;width:100%;padding:10px 0;margin:60px auto;pointer-events:none;}.item_wrap{position:relative;pointer-events:all;padding:0.5rem;}.item{position:relative;width:100%;padding-bottom:100%;overflow:hidden;cursor:pointer;}.item_middle{position:absolute;width:100%;height:100%;padding:10px;box-sizing:border-box;border:3px dashed #f5f5f5;border-radius:12px;}.item_img{width:100%;height:100%;border-radius:6px;}.demo_name{margin:10px 0;text-align:center;word-break:break-all;font-size:14px;color:#fff;cursor:pointer;}@media (min-width:769px){.item:hover ~ .item_mask{opacity:1;}}"]),p=!0;function f(){var e=(0,d.useState)(!1),t=e[0],n=e[1],i=(0,d.useState)([{name:"抽奖模型",icon:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687153304035427.png",link:"/demos/lottery"},{name:"2048",icon:"https://empty.t-n.top/pub_lic/2023_06_26/pic1687749579236835.png",link:"/demos/2048"},{name:"图床列表",icon:"https://empty.t-n.top/pub_lic/2023_07_03/pic1688351230372957.jpg",link:"/demos/imgSource"}])[0];return(0,d.useEffect)(function(){n(!0)},[]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(o(),{children:[(0,s.jsx)("title",{children:"Demos"}),(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,s.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,s.jsx)("main",{children:(0,s.jsxs)(l,{children:[t&&(0,s.jsx)("iframe",{className:"fire_wrap",src:"https://empty.t-n.top/html/WebGL%20Fluid%20Simulation.html"}),(0,s.jsx)("div",{className:"items_wrap",children:i.map(function(e,t){return(0,s.jsxs)(c(),{className:"item_wrap","aria-label":e.name,href:e.link,children:[(0,s.jsx)("div",{className:"item",children:(0,s.jsx)("div",{className:"item_middle",children:(0,s.jsx)(r.Z,{className:"item_img",width:"100",height:"100",src:e.icon})})}),(0,s.jsx)("div",{className:"demo_name two_line",children:e.name})]},t)})})]})})]})}},3347:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos",function(){return n(863)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=3347)}),_N_E=e.O()}]);