(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[528],{2999:function(e,t,n){"use strict";var r=n(9499),i=n(4730),o=n(7294),a=n(5893),c=n(3454),u=["loadingPic","src","className","beforeLoad","onLoad","noReload","children","isShow"];function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,d=e.className,l=(e.beforeLoad,e.onLoad),f=void 0===l?function(e){return Promise.resolve(e)}:l,m=e.noReload,p=void 0!==m&&m,_=e.children,h=e.isShow,v=void 0===h||h,g=(0,i.Z)(e,u),y=(0,o.useRef)(t||"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80"),w=(0,o.useRef)(c.env.NEXT_PUBLIC_FAIL_IMG),b=(0,o.useState)(y.current),j=b[0],x=b[1],O=(0,o.useState)(!1),S=O[0],k=O[1],P=(0,o.useRef)(null),E=(0,o.useRef)(0);return(0,o.useEffect)(function(){if(!E.current){var e,t,r=document.documentElement.clientHeight,i=document.documentElement.clientWidth;p||null===(e=P.current)||void 0===e||e.classList.add("lazy"),k(!1),P.current&&!(P.current.getBoundingClientRect().top<-P.current.clientHeight||P.current.getBoundingClientRect().top>1.5*r)&&!(P.current.getBoundingClientRect().left<-i||P.current.getBoundingClientRect().left>1.5*i)&&P.current.getBoundingClientRect().width&&P.current.getBoundingClientRect().height&&v&&(p&&(E.current=1),null===(t=P.current)||void 0===t||t.classList.remove("lazy"),x(n))}},[n,v,p]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(d?"lazy ".concat(d):"lazy"),ref:P,src:j,"data-src":n,alt:"",onLoad:function(){var e;k(!0),n===(null===(e=P.current)||void 0===e?void 0:e.src)&&f(n)},onError:function(){var e;null===(e=P.current)||void 0===e||e.classList.add("lazy"),x(w.current),k(!0)}},g)),S||_]})}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var r=n(6495).Z,i=n(2648).Z,o=(0,n(1598).Z)(n(7294)),a=i(n(1585)),c=n(8e3),u=n(5850),s=n(9470);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function l(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var f=["name","httpEquiv","charSet","itemProp"];function m(e,t){var n,i,a,c,u=t.inAmpMode;return e.reduce(l,[]).reverse().concat(d(u).reverse()).filter((n=new Set,i=new Set,a=new Set,c={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var u=0,s=f.length;u<s;u++){var d=f[u];if(e.props.hasOwnProperty(d)){if("charSet"===d)a.has(d)?t=!1:a.add(d);else{var l=e.props[d],m=c[d]||new Set;("name"!==d||!r)&&m.has(l)?t=!1:(m.add(l),c[d]=m)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!u&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=r({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,o.default.cloneElement(e,i)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(c.AmpStateContext),r=o.useContext(u.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:m,headManager:r,inAmpMode:s.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,c=e.reduceComponentsToState;function u(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(c(t,e))}}return i&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),u()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=u),function(){n&&(n._pendingUpdate=u)}}),a(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),i=!1,o=r.useLayoutEffect,a=i?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},863:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return f},default:function(){return m}});var r=n(2999),i=n(9008),o=n.n(i),a=n(1664),c=n.n(a),u=n(7294),s=n(5878),d=n.n(s),l=n(5893),f=!0;function m(){var e=(0,u.useState)(!1),t=e[0],n=e[1],i=(0,u.useState)([{name:"抽奖模型",icon:"https://empty.t-n.top/pub_lic/2023_06_19/pic1687153304035427.png",link:"/demos/lottery"},{name:"2048",icon:"https://empty.t-n.top/pub_lic/2023_06_26/pic1687749579236835.png",link:"/demos/2048"},{name:"图床列表",icon:"https://empty.t-n.top/pub_lic/2023_07_03/pic1688351230372957.jpg",link:"/demos/imgSource"}])[0];return(0,u.useEffect)(function(){n(!0)},[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(o(),{children:[(0,l.jsx)("title",{children:"Demos"}),(0,l.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,l.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,l.jsx)("main",{children:(0,l.jsxs)("div",{className:d().demos_wrap,children:[t&&(0,l.jsx)("iframe",{className:d().fire_wrap,src:"https://empty.t-n.top/html/WebGL%20Fluid%20Simulation.html"}),(0,l.jsx)("div",{className:d().items_wrap,children:i.map(function(e,t){return(0,l.jsxs)(c(),{className:d().item_wrap,"aria-label":e.name,href:e.link,children:[(0,l.jsx)("div",{className:d().item,children:(0,l.jsx)("div",{className:d().item_middle,children:(0,l.jsx)(r.Z,{className:d().item_img,width:"100",height:"100",src:e.icon})})}),(0,l.jsx)("div",{className:"".concat(d().demo_name," ").concat(d().two_line),children:e.name})]},t)})})]})})]})}},3347:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos",function(){return n(863)}])},5878:function(e){e.exports={demos_wrap:"demos_demos_wrap__kVd1q",fire_wrap:"demos_fire_wrap___jH4v",items_wrap:"demos_items_wrap___hzpa",item_wrap:"demos_item_wrap__TtvBV",item:"demos_item__HFHR7",item_middle:"demos_item_middle___2F0m",item_img:"demos_item_img__9QXo_",demo_name:"demos_demo_name__FJ6aZ",item_mask:"demos_item_mask__Arbxr"}},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=3347)}),_N_E=e.O()}]);