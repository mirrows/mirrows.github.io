(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[586],{7153:function(e,t,n){"use strict";var r=n(7294);t.Z=function(e){var t=e.value,n=e.render,a=(0,r.useState)(t),o=a[0],i=a[1];return(0,r.useEffect)(function(){i((t?new Date(t):new Date).toLocaleString())},[t]),n(o||"")}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),i=a(n(1585)),l=n(8e3),c=n(5850),u=n(9470);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,a,i,l,c=t.inAmpMode;return e.reduce(s,[]).reverse().concat(d(c).reverse()).filter((n=new Set,a=new Set,i=new Set,l={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var c=0,u=p.length;c<u;c++){var d=p[c];if(e.props.hasOwnProperty(d)){if("charSet"===d)i.has(d)?t=!1:i.add(d);else{var s=e.props[d],f=l[d]||new Set;("name"!==d||!r)&&f.has(s)?t=!1:(f.add(s),l[d]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!c&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,o.default.cloneElement(e,a)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(l.AmpStateContext),r=o.useContext(c.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:u.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,l=e.reduceComponentsToState;function c(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(l(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),c()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=c),function(){n&&(n._pendingUpdate=c)}}),i(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,o=r.useLayoutEffect,i=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},989:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var r=n(9499),a=n(9922),o=n(2999),i=n(7153),l=n(277),c=n(9980),u=n.n(c),d=n(1163),s=n(7294),p=n(9521),f=n(8924),b=n.n(f),h=n(5893);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var x=p.ZP.div.withConfig({displayName:"creator__DIV",componentId:"sc-10y24uf-0"})(['min-height:100vh;padding:60px 0;background-color:#e2e2e2;box-sizing:border-box;.wrap{display:flex;align-items:flex-start;width:80%;max-width:1360px;margin:0 auto;background-color:inherit;}.input_area,.real_content_area{width:100%;margin:5px;}.input_area,.real_content_area,.content_area,.title_area{flex:1;min-width:240px;box-sizing:border-box;pointer-events:all;}.real_content_area,.content_area,.title_area{padding:10px;border-radius:8px;background-color:#fff;}.input_area{position:sticky;top:65px;}.title_area{display:flex;align-items:stretch;margin-bottom:10px;}.real_content_area{min-height:calc(100vh - 130px);blockquote{padding:4px 0 4px 1em;margin:0;margin-bottom:8px;border-left:4px solid gray;white-space:normal;background-color:#f5f5f5;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0 0 10px;white-space:pre-wrap;line-height:1.5;word-break:break-all;}a{pointer-events:all;}img{max-width:100%;}table{border-collapse:collapse;}table th,table td{min-width:80px;padding:4px;border:1px solid #000;}ul{margin:10px 0;}ul li:before{content:"⚪";float:left;margin-right:10px;font-weight:900;}code{background-color:#f5f5f5;overflow:auto;color:#000;}pre{padding:10px;background-color:#f5f5f5;overflow:auto;border-radius:8px;color:#000;}pre{&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}}.title_input{width:100%;padding:10px;background-color:#f5f5f5;border:none;outline:none;box-sizing:border-box;border-radius:6px;font-size:16px;pointer-events:all;}.content_area{height:calc(100vh - 218px);box-sizing:content-box;}.text_input{width:100%;height:100%;padding:10px;background-color:#f5f5f5;border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.create_blog_btn{padding:4px 16px;margin-left:10px;font-weight:bold;background-color:#666;border:none;border-radius:4px;font-size:14px;color:#fff;cursor:pointer;}.text_small{font-size:12px;color:#423f3f;}.atl_base_msg{margin-right:20px;}.atl_bg{height:200px;width:100%;object-fit:cover;margin:10px 0;}.blog_content{padding:10px;box-sizing:border-box;border-radius:8px;pointer-events:all;}@media(max-width:769px){.mobile_top_mask{position:fixed;top:0;left:0;width:100%;height:65px;background-color:inherit;}.wrap{flex-direction:column;align-items:center;}.input_area{order:-1;}.input_area{padding-bottom:5px;margin-bottom:0;background-color:#e2e2e2;}.content_area{height:30vh;}}']);function v(e){var t=e.artical,n=e.onSubmit,r=new(u()),c=(0,s.useState)((null==t?void 0:t.title)||""),p=c[0],f=c[1],g=(0,s.useState)((null==t?void 0:t.body)||""),v=g[0],_=g[1],y=(0,s.useState)((null==t?void 0:t.img)||""),w=y[0],j=y[1],k=(0,s.useRef)(null),O=(0,d.useRouter)();return(0,s.useEffect)(function(){j((null==t?void 0:t.img)||"")},[t]),(0,h.jsxs)(x,{children:[(0,h.jsx)("div",{className:"mobile_top_mask"}),(0,h.jsxs)("div",{className:"wrap",children:[(0,h.jsxs)("div",{className:"real_content_area",children:[(0,h.jsx)("h1",{children:p}),(0,h.jsx)("div",{className:"text_small",children:(0,h.jsx)(i.Z,{render:function(e){return(0,h.jsxs)("span",{className:"atl_base_msg",children:["创建时间：",e]})},value:null==t?void 0:t.created_at})}),(0,h.jsx)(o.Z,{className:"atl_bg",width:"700",height:"200",src:w,alt:p}),(0,h.jsx)("div",{className:"blog_content",dangerouslySetInnerHTML:{__html:(0,l.K)(b()(r.render(v||"")),["lazyImg"])}})]}),(0,h.jsxs)("div",{className:"input_area",children:[(0,h.jsxs)("div",{className:"title_area",children:[(0,h.jsx)("input",{className:"title_input",type:"text","aria-label":"blog title",placeholder:"标题",defaultValue:p,onChange:function(e){return f(e.target.value)}}),p&&v&&(0,h.jsx)("button",{className:"create_blog_btn",onClick:function(){var e=O.query.number;confirm("确认提交？")&&n(m(m({},e?{number:+e}:{}),{},{title:JSON.stringify({title:p,img:w}),body:v||"",labels:["blog"]})).then(function(t){t.code||(f(""),_(""),e||alert("文章已送入审核，稍后发布"),O.replace(e?"/blogs/".concat(t.data.number):"/"))})},children:O.query.number?"edit":"create"})]}),(0,h.jsx)("div",{className:"content_area",children:(0,h.jsx)(a.Z,{ref:k,align:"top",clickable:!1,onFinish:function(e){setTimeout(function(){_(function(t){return t+e.map(function(e){var t=e.normal;return"\n![".concat(t.name,"](").concat(t.cdn_url,")")}).join("\n")})})},children:(0,h.jsx)("div",{children:(0,h.jsx)("textarea",{className:"text_input",name:"blog content",placeholder:"博客正文",value:v,autoFocus:!0,suppressContentEditableWarning:!0,contentEditable:!0,onPaste:function(e){var t,n=[],r=e.clipboardData.items;if(r&&r.length){for(var a=0;a<r.length;a++)if(-1!==r[a].type.indexOf("image")){var o=r[a].getAsFile();o&&n.push(o)}}n&&(null===(t=k.current)||void 0===t||t.addFile(n))},onChange:function(e){_(e.target.value)}})})})})]})]})]})}},1364:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var r=n(5835),a=n(9008),o=n.n(a),i=n(7294),l=n(989),c=n(1163),u=n(7989),d=n(5893);function s(){var e=(0,i.useState)(),t=e[0],n=e[1],a=(0,c.useRouter)();return(0,i.useEffect)(function(){var e=(0,u.WZ)(a.asPath);null!=e&&e.number&&(0,r.Dp)({number:+e.number}).then(function(e){(null==e?void 0:e.data)&&n(e.data)})},[a]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(o(),{children:[(0,d.jsx)("title",{children:"edit blog"}),(0,d.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,d.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsx)("main",{children:t&&(0,d.jsx)(l.default,{artical:t,onSubmit:r.F0})})]})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return a}});var r={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat("https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80",'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},a=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var a=e;return Object.keys(r).forEach(function(e){n[e]||(a=r[e](a))}),a}},8738:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/edit",function(){return n(1364)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[880,811,922,774,888,179],function(){return e(e.s=8738)}),_N_E=e.O()}]);