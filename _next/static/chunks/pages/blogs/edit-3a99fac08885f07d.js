(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[586],{7153:function(e,t,n){"use strict";var r=n(7294);t.Z=function(e){var t=e.value,n=e.render,a=(0,r.useState)(t),o=a[0],i=a[1];return(0,r.useEffect)(function(){i((t?new Date(t):new Date).toLocaleString())},[t]),n(o||"")}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=s,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),i=a(n(1585)),c=n(8e3),u=n(5850),l=n(9470);function s(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var f=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,a,i,c,u=t.inAmpMode;return e.reduce(d,[]).reverse().concat(s(u).reverse()).filter((n=new Set,a=new Set,i=new Set,c={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var u=0,l=f.length;u<l;u++){var s=f[u];if(e.props.hasOwnProperty(s)){if("charSet"===s)i.has(s)?t=!1:i.add(s);else{var d=e.props[s],p=c[s]||new Set;("name"!==s||!r)&&p.has(d)?t=!1:(p.add(d),c[s]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!u&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,o.default.cloneElement(e,a)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(c.AmpStateContext),r=o.useContext(u.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:p,headManager:r,inAmpMode:l.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,c=e.reduceComponentsToState;function u(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(c(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),u()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=u),function(){n&&(n._pendingUpdate=u)}}),i(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,o=r.useLayoutEffect,i=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},989:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(9499),a=n(9922),o=n(2999),i=n(7153),c=n(277),u=n(9980),l=n.n(u),s=n(1163),d=n(7294),f=n(8924),p=n.n(f),_=n(684),m=n.n(_),v=n(5893);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function g(e){var t=e.artical,n=e.onSubmit,r=new(l()),u=(0,d.useState)((null==t?void 0:t.title)||""),f=u[0],_=u[1],h=(0,d.useState)((null==t?void 0:t.body)||""),g=h[0],y=h[1],x=(0,d.useState)((null==t?void 0:t.img)||""),j=x[0],w=x[1],O=(0,d.useRef)(null),S=(0,s.useRouter)();return(0,d.useEffect)(function(){w((null==t?void 0:t.img)||"")},[t]),(0,v.jsxs)("div",{className:m().creator_wrap,children:[(0,v.jsx)("div",{className:m().mobile_top_mask}),(0,v.jsxs)("div",{className:m().wrap,children:[(0,v.jsxs)("div",{className:m().real_content_area,children:[(0,v.jsx)("h1",{children:f}),(0,v.jsx)("div",{className:m().text_small,children:(0,v.jsx)(i.Z,{render:function(e){return(0,v.jsxs)("span",{className:m().atl_base_msg,children:["创建时间：",e]})},value:null==t?void 0:t.created_at})}),(0,v.jsx)(o.Z,{className:m().atl_bg,width:"700",height:"200",src:j,alt:f}),(0,v.jsx)("div",{className:m().blog_content,dangerouslySetInnerHTML:{__html:(0,c.K)(p()(r.render(g||"")),["lazyImg"])}})]}),(0,v.jsxs)("div",{className:m().input_area,children:[(0,v.jsxs)("div",{className:m().title_area,children:[(0,v.jsx)("input",{className:m().title_input,type:"text","aria-label":"blog title",placeholder:"标题",defaultValue:f,onChange:function(e){return _(e.target.value)}}),f&&g&&(0,v.jsx)("button",{className:m().create_blog_btn,onClick:function(){var e=S.query.number;confirm("确认提交？")&&n(b(b({},e?{number:+e}:{}),{},{title:JSON.stringify({title:f,img:j}),body:g||"",labels:["blog"]})).then(function(t){t.code||(_(""),y(""),e||alert("文章已送入审核，稍后发布"),S.replace(e?"/blogs/".concat(t.data.number):"/"))})},children:S.query.number?"edit":"create"})]}),(0,v.jsx)("div",{className:m().content_area,children:(0,v.jsx)(a.Z,{ref:O,align:"top",clickable:!1,onFinish:function(e){setTimeout(function(){y(function(t){return t+e.map(function(e){var t=e.normal;return"\n![".concat(t.name,"](","https://wsrv.nl/?url=".concat((t.download_url||"").replace("https://",""),"&n=-1&q=80"),")")}).join("\n")})})},children:(0,v.jsx)("div",{children:(0,v.jsx)("textarea",{className:m().text_input,name:"blog content",placeholder:"博客正文",value:g,autoFocus:!0,suppressContentEditableWarning:!0,contentEditable:!0,onPaste:function(e){var t,n=[],r=e.clipboardData.items;if(r&&r.length){for(var a=0;a<r.length;a++)if(-1!==r[a].type.indexOf("image")){var o=r[a].getAsFile();o&&n.push(o)}}n&&(null===(t=O.current)||void 0===t||t.addFile(n))},onChange:function(e){y(e.target.value)}})})})})]})]})]})}},1364:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return f}});var r=n(5835),a=n(9008),o=n.n(a),i=n(7294),c=n(989),u=n(1163),l=n(1575),s=n(8984),d=n(5893);function f(){var e=(0,i.useState)(),t=e[0],n=e[1],a=(0,u.useRouter)();return(0,i.useEffect)(function(){var e=(0,l.WZ)(a.asPath);null!=e&&e.number&&(0,r.Dp)({number:+e.number}).then(function(e){(null==e?void 0:e.data)&&n(e.data)})},[a]),(0,i.useEffect)(function(){s.SR.isGithubOwner(function(e){e||a.replace("/")})},[a]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(o(),{children:[(0,d.jsx)("title",{children:"edit blog"}),(0,d.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,d.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsx)("main",{children:t&&(0,d.jsx)(c.default,{artical:t,onSubmit:r.F0})})]})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return a},S:function(){return o}});var r={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat("https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80",'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},a=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var a=e;return Object.keys(r).forEach(function(e){n[e]||(a=r[e](a))}),a},o=function(e){return e.replace(/\*\*(.+)\*\*(\S)/g,"**$1** $2")}},8738:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/edit",function(){return n(1364)}])},684:function(e){e.exports={creator_wrap:"creator_creator_wrap__B66pA",wrap:"creator_wrap__CQmJ_",input_area:"creator_input_area__2iLs7",real_content_area:"creator_real_content_area__ASLMh",content_area:"creator_content_area__4UAL0",title_area:"creator_title_area__0vfoT",title_input:"creator_title_input__z_M3O",text_input:"creator_text_input__hH1Wl",create_blog_btn:"creator_create_blog_btn__w5oCy",text_small:"creator_text_small__Nmyd2",atl_base_msg:"creator_atl_base_msg___EteA",atl_bg:"creator_atl_bg__u8emt",blog_content:"creator_blog_content__B0yAk",mobile_top_mask:"creator_mobile_top_mask__2g9BV"}},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[880,811,922,774,888,179],function(){return e(e.s=8738)}),_N_E=e.O()}]);