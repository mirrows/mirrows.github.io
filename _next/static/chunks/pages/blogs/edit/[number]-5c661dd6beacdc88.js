(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[100],{2999:function(e,t,n){"use strict";var r=n(9499),a=n(4730),o=n(7294),i=n(5893),c=n(3454),l=["loadingPic","src","className","children"];function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,d=e.className,s=e.children,p=(0,a.Z)(e,l),f=(0,o.useRef)(t||c.env.NEXT_PUBLIC_LOADING_GIF||"https://empty.t-n.top/pub_lic/2023_06_09/pic1686281264582557.gif"),b=(0,o.useRef)("https://empty.t-n.top/pub_lic/2023_06_26/pic1687748007844003.png"),g=(0,o.useState)(f.current),h=g[0],m=g[1],x=(0,o.useState)(!1),v=x[0],_=x[1],y=(0,o.useRef)(null);return(0,o.useEffect)(function(){var e,t,r=document.documentElement.clientHeight,a=document.documentElement.clientWidth;null===(e=y.current)||void 0===e||e.classList.add("lazy"),_(!1),y.current&&!(y.current.getBoundingClientRect().top<-y.current.clientHeight||y.current.getBoundingClientRect().top>1.5*r)&&!(y.current.getBoundingClientRect().left<-a||y.current.getBoundingClientRect().left>1.5*a)&&y.current.getBoundingClientRect().width&&y.current.getBoundingClientRect().height&&(m(n),null===(t=y.current)||void 0===t||t.classList.remove("lazy"))},[n]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(d?"lazy ".concat(d):"lazy"),ref:y,src:h,"data-src":n,alt:"",onLoad:function(){return _(!0)},onError:function(){m(b.current),_(!0)}},p)),v||s]})}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),i=a(n(1585)),c=n(8e3),l=n(5850),u=n(9470);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,a,i,c,l=t.inAmpMode;return e.reduce(s,[]).reverse().concat(d(l).reverse()).filter((n=new Set,a=new Set,i=new Set,c={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var l=0,u=p.length;l<u;l++){var d=p[l];if(e.props.hasOwnProperty(d)){if("charSet"===d)i.has(d)?t=!1:i.add(d);else{var s=e.props[d],f=c[d]||new Set;("name"!==d||!r)&&f.has(s)?t=!1:(f.add(s),c[d]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!l&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,o.default.cloneElement(e,a)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(c.AmpStateContext),r=o.useContext(l.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:u.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,c=e.reduceComponentsToState;function l(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(c(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),l()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=l),function(){n&&(n._pendingUpdate=l)}}),i(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,o=r.useLayoutEffect,i=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},989:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var r=n(9499),a=n(2999),o=n(277),i=n(7441),c=n(1163),l=n(7294),u=n(9521),d=n(8924),s=n.n(d),p=n(5893);function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var g=u.ZP.div.withConfig({displayName:"creator__DIV",componentId:"sc-10y24uf-0"})(['min-height:100vh;padding:60px 0;background-color:#e2e2e2;box-sizing:border-box;.wrap{display:flex;align-items:flex-start;width:80%;max-width:1360px;margin:0 auto;}.input_area,.real_content_area{width:100%;margin:5px;}.input_area,.real_content_area,.content_area,.title_area{flex:1;min-width:240px;box-sizing:border-box;pointer-events:all;}.real_content_area,.content_area,.title_area{padding:10px;border-radius:8px;background-color:#fff;}.input_area{position:sticky;top:65px;}.title_area{display:flex;align-items:stretch;margin-bottom:10px;}.real_content_area{min-height:calc(100vh - 130px);blockquote{padding:4px 0 4px 1em;margin:0;margin-bottom:8px;border-left:4px solid gray;white-space:normal;background-color:#f5f5f5;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0 0 10px;white-space:pre-wrap;line-height:1.5;word-break:break-all;}a{pointer-events:all;}img{max-width:100%;}table{border-collapse:collapse;}table th,table td{min-width:80px;padding:4px;border:1px solid #000;}ul{margin:10px 0;}ul li:before{content:"⚪";float:left;margin-right:10px;font-weight:900;}code{background-color:#f5f5f5;overflow:auto;color:#000;}pre{padding:10px;background-color:#f5f5f5;overflow:auto;border-radius:8px;color:#000;}pre{&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}}.title_input{width:100%;padding:10px;background-color:#f5f5f5;border:none;outline:none;box-sizing:border-box;border-radius:6px;font-size:16px;pointer-events:all;}.text_input{width:100%;height:calc(100vh - 218px);padding:10px;background-color:#f5f5f5;border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.create_blog_btn{padding:4px 16px;margin-left:10px;font-weight:bold;background-color:#666;border:none;border-radius:4px;font-size:14px;color:#fff;cursor:pointer;}.text_small{font-size:12px;color:#423f3f;}.atl_base_msg{margin-right:20px;}.atl_bg{height:200px;width:100%;object-fit:cover;margin:10px 0;}.blog_content{padding:10px;box-sizing:border-box;border-radius:8px;pointer-events:all;}@media(max-width:769px){.wrap{flex-direction:column;}.input_area{order:-1;}.input_area{padding-bottom:5px;margin-bottom:0;background-color:#e2e2e2;}.text_input{height:30vh;}}']);function h(e){var t=e.artical,n=e.onSubmit,r=(0,l.useState)((null==t?void 0:t.title)||""),u=r[0],d=r[1],f=(0,l.useState)((null==t?void 0:t.body)||""),h=f[0],m=f[1],x=(0,l.useState)((null==t?void 0:t.img)||""),v=x[0],_=x[1],y=(0,c.useRouter)();return(0,l.useEffect)(function(){console.log(t),_((null==t?void 0:t.img)||"")},[t]),(0,p.jsx)(g,{children:(0,p.jsxs)("div",{className:"wrap",children:[(0,p.jsxs)("div",{className:"real_content_area",children:[(0,p.jsx)("h1",{children:u}),(0,p.jsx)("div",{className:"text_small",children:(0,p.jsxs)("span",{className:"atl_base_msg",children:["创建时间：",(null==t?void 0:t.created_at)||""]})}),(0,p.jsx)(a.Z,{className:"atl_bg",width:"700",height:"200",src:v,alt:u}),(0,p.jsx)("div",{className:"blog_content",dangerouslySetInnerHTML:{__html:(0,o.K)(s()(i.TU.parse(h||"")),["lazyImg"])}})]}),(0,p.jsxs)("div",{className:"input_area",children:[(0,p.jsxs)("div",{className:"title_area",children:[(0,p.jsx)("input",{className:"title_input",type:"text","aria-label":"blog title",placeholder:"标题",defaultValue:u,onChange:function(e){return d(e.target.value)}}),u&&h&&(0,p.jsx)("button",{className:"create_blog_btn",onClick:function(){var e=y.query.number;confirm("确认提交？")&&n(b(b({},e?{number:+e}:{}),{},{title:JSON.stringify({title:u,img:v}),body:h||"",labels:["blog"]})).then(function(e){e.code||(d(""),m(""),y.replace("/blogs/".concat(e.data.number)))})},children:y.query.number?"edit":"create"})]}),(0,p.jsx)("div",{className:"content_area",children:(0,p.jsx)("textarea",{className:"text_input",name:"blog content",placeholder:"博客正文",defaultValue:h,onChange:function(e){m(e.target.value)}})})]})]})})}},1605:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(5835),a=n(9008),o=n.n(a),i=n(7294),c=n(989),l=n(1163),u=n(5893);function d(){var e=(0,i.useState)(),t=e[0],n=e[1],a=(0,l.useRouter)();return(0,i.useEffect)(function(){var e=a.query.number;e&&(0,r.Dp)(+e).then(function(e){(null==e?void 0:e.data)&&n(e.data)})},[a.query]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(o(),{children:[(0,u.jsx)("title",{children:"edit blog"}),(0,u.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,u.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,u.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,u.jsx)("main",{children:t&&(0,u.jsx)(c.default,{artical:t,onSubmit:r.F0})})]})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return o}});var r=n(3454),a={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat(r.env.NEXT_PUBLIC_LOADING_GIF,'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},o=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var r=e;return Object.keys(a).forEach(function(e){n[e]||(r=a[e](r))}),r}},2881:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/edit/[number]",function(){return n(1605)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[883,774,888,179],function(){return e(e.s=2881)}),_N_E=e.O()}]);