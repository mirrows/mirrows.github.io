(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[735],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=u,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),i=a(n(1585)),l=n(8e3),c=n(5850),d=n(9470);function u(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,a,i,l,c=t.inAmpMode;return e.reduce(s,[]).reverse().concat(u(c).reverse()).filter((n=new Set,a=new Set,i=new Set,l={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var c=0,d=p.length;c<d;c++){var u=p[c];if(e.props.hasOwnProperty(u)){if("charSet"===u)i.has(u)?t=!1:i.add(u);else{var s=e.props[u],f=l[u]||new Set;("name"!==u||!r)&&f.has(s)?t=!1:(f.add(s),l[u]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!c&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,o.default.cloneElement(e,a)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(l.AmpStateContext),r=o.useContext(c.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:d.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,l=e.reduceComponentsToState;function c(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(l(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),c()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=c),function(){n&&(n._pendingUpdate=c)}}),i(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,o=r.useLayoutEffect,i=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},989:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=n(9499),a=n(2999),o=n(277),i=n(9980),l=n.n(i),c=n(1163),d=n(7294),u=n(9521),s=n(8924),p=n.n(s),f=n(5893);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var h=u.ZP.div.withConfig({displayName:"creator__DIV",componentId:"sc-10y24uf-0"})(['min-height:100vh;padding:60px 0;background-color:#e2e2e2;box-sizing:border-box;.wrap{display:flex;align-items:flex-start;width:80%;max-width:1360px;margin:0 auto;}.input_area,.real_content_area{width:100%;margin:5px;}.input_area,.real_content_area,.content_area,.title_area{flex:1;min-width:240px;box-sizing:border-box;pointer-events:all;}.real_content_area,.content_area,.title_area{padding:10px;border-radius:8px;background-color:#fff;}.input_area{position:sticky;top:65px;}.title_area{display:flex;align-items:stretch;margin-bottom:10px;}.real_content_area{min-height:calc(100vh - 130px);blockquote{padding:4px 0 4px 1em;margin:0;margin-bottom:8px;border-left:4px solid gray;white-space:normal;background-color:#f5f5f5;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0 0 10px;white-space:pre-wrap;line-height:1.5;word-break:break-all;}a{pointer-events:all;}img{max-width:100%;}table{border-collapse:collapse;}table th,table td{min-width:80px;padding:4px;border:1px solid #000;}ul{margin:10px 0;}ul li:before{content:"⚪";float:left;margin-right:10px;font-weight:900;}code{background-color:#f5f5f5;overflow:auto;color:#000;}pre{padding:10px;background-color:#f5f5f5;overflow:auto;border-radius:8px;color:#000;}pre{&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}}.title_input{width:100%;padding:10px;background-color:#f5f5f5;border:none;outline:none;box-sizing:border-box;border-radius:6px;font-size:16px;pointer-events:all;}.text_input{width:100%;height:calc(100vh - 218px);padding:10px;background-color:#f5f5f5;border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.create_blog_btn{padding:4px 16px;margin-left:10px;font-weight:bold;background-color:#666;border:none;border-radius:4px;font-size:14px;color:#fff;cursor:pointer;}.text_small{font-size:12px;color:#423f3f;}.atl_base_msg{margin-right:20px;}.atl_bg{height:200px;width:100%;object-fit:cover;margin:10px 0;}.blog_content{padding:10px;box-sizing:border-box;border-radius:8px;pointer-events:all;}@media(max-width:769px){.wrap{flex-direction:column;}.input_area{order:-1;}.input_area{padding-bottom:5px;margin-bottom:0;background-color:#e2e2e2;}.text_input{height:30vh;}}']);function m(e){var t=e.artical,n=e.onSubmit,r=new(l()),i=(0,d.useState)((null==t?void 0:t.title)||""),u=i[0],s=i[1],b=(0,d.useState)((null==t?void 0:t.body)||""),m=b[0],x=b[1],v=(0,d.useState)((null==t?void 0:t.img)||""),_=v[0],y=v[1],w=(0,c.useRouter)();return(0,d.useEffect)(function(){console.log(t),y((null==t?void 0:t.img)||"")},[t]),(0,f.jsx)(h,{children:(0,f.jsxs)("div",{className:"wrap",children:[(0,f.jsxs)("div",{className:"real_content_area",children:[(0,f.jsx)("h1",{children:u}),(0,f.jsx)("div",{className:"text_small",children:(0,f.jsxs)("span",{className:"atl_base_msg",children:["创建时间：",(null==t?void 0:t.created_at)||""]})}),(0,f.jsx)(a.Z,{className:"atl_bg",width:"700",height:"200",src:_,alt:u}),(0,f.jsx)("div",{className:"blog_content",dangerouslySetInnerHTML:{__html:(0,o.K)(p()(r.render(m||"")),["lazyImg"])}})]}),(0,f.jsxs)("div",{className:"input_area",children:[(0,f.jsxs)("div",{className:"title_area",children:[(0,f.jsx)("input",{className:"title_input",type:"text","aria-label":"blog title",placeholder:"标题",defaultValue:u,onChange:function(e){return s(e.target.value)}}),u&&m&&(0,f.jsx)("button",{className:"create_blog_btn",onClick:function(){var e=w.query.number;confirm("确认提交？")&&n(g(g({},e?{number:+e}:{}),{},{title:JSON.stringify({title:u,img:_}),body:m||"",labels:["blog"]})).then(function(e){e.code||(s(""),x(""),w.replace("/blogs/".concat(e.data.number)))})},children:w.query.number?"edit":"create"})]}),(0,f.jsx)("div",{className:"content_area",children:(0,f.jsx)("textarea",{className:"text_input",name:"blog content",placeholder:"博客正文",defaultValue:m,onChange:function(e){x(e.target.value)}})})]})]})})}},2804:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(5835),a=n(9008),o=n.n(a),i=n(7294),l=n(989),c=n(5893);function d(){var e=(0,i.useState)(),t=e[0],n=e[1];return(0,i.useEffect)(function(){(0,r.P5)(1).then(function(e){e.data&&n(e.data[0])})},[]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(o(),{children:[(0,c.jsx)("title",{children:"write a new blog"}),(0,c.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,c.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,c.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,c.jsx)("main",{children:(0,c.jsx)(l.default,{artical:{img:(null==t?void 0:t.url)||""},onSubmit:r.U7})})]})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return o}});var r=n(3454),a={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat(r.env.NEXT_PUBLIC_LOADING_GIF,'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},o=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var r=e;return Object.keys(a).forEach(function(e){n[e]||(r=a[e](r))}),r}},7489:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/create",function(){return n(2804)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[811,774,888,179],function(){return e(e.s=7489)}),_N_E=e.O()}]);