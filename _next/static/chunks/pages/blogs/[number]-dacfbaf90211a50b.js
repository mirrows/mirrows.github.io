(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[88],{2999:function(e,t,n){"use strict";var r=n(9499),a=n(4730),o=n(7294),i=n(5893),l=n(3454),c=["loadingPic","src","className","children"];function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,d=e.className,u=e.children,p=(0,a.Z)(e,c),f=(0,o.useRef)(t||l.env.NEXT_PUBLIC_LOADING_GIF||"https://empty.t-n.top/pub_lic/2023_06_09/pic1686281264582557.gif"),m=(0,o.useRef)("https://empty.t-n.top/pub_lic/2023_06_26/pic1687748007844003.png"),h=(0,o.useState)(f.current),b=h[0],g=h[1],x=(0,o.useState)(!1),v=x[0],_=x[1],w=(0,o.useRef)(null);return(0,o.useEffect)(function(){var e,t,r=document.documentElement.clientHeight,a=document.documentElement.clientWidth;null===(e=w.current)||void 0===e||e.classList.add("lazy"),_(!1),w.current&&!(w.current.getBoundingClientRect().top<-w.current.clientHeight||w.current.getBoundingClientRect().top>1.5*r)&&!(w.current.getBoundingClientRect().left<-a||w.current.getBoundingClientRect().left>1.5*a)&&w.current.getBoundingClientRect().width&&w.current.getBoundingClientRect().height&&(g(n),null===(t=w.current)||void 0===t||t.classList.remove("lazy"))},[n]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(d?"lazy ".concat(d):"lazy"),ref:w,src:b,"data-src":n,alt:"",onLoad:function(){return _(!0)},onError:function(){g(m.current),_(!0)}},p)),v||u]})}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),i=a(n(1585)),l=n(8e3),c=n(5850),s=n(9470);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,a,i,l,c=t.inAmpMode;return e.reduce(u,[]).reverse().concat(d(c).reverse()).filter((n=new Set,a=new Set,i=new Set,l={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var c=0,s=p.length;c<s;c++){var d=p[c];if(e.props.hasOwnProperty(d)){if("charSet"===d)i.has(d)?t=!1:i.add(d);else{var u=e.props[d],f=l[d]||new Set;("name"!==d||!r)&&f.has(u)?t=!1:(f.add(u),l[d]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!c&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,o.default.cloneElement(e,a)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(l.AmpStateContext),r=o.useContext(c.HeadManagerContext);return o.default.createElement(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:s.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,l=e.reduceComponentsToState;function c(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(l(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),c()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=c),function(){n&&(n._pendingUpdate=c)}}),i(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,o=r.useLayoutEffect,i=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},4546:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return k},default:function(){return N}});var r=n(9499),a=n(2999),o=n(3806),i=n(6294),l=n(5835),c=n(1435),s=n(277),d=n(7441),u=n(9008),p=n.n(u),f=n(1664),m=n.n(f),h=n(1163),b=n(7294),g=n(9521),x=n(8924),v=n.n(x),_=n(5893);function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var j=g.ZP.div.withConfig({displayName:"number__DIV",componentId:"sc-xgj082-0"})(["position:fixed;top:0;bottom:0;left:0;right:0;z-index:-1;background-color:#e2e2e2;"]),O=g.ZP.div.withConfig({displayName:"number__BlogContent",componentId:"sc-xgj082-1"})(['position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;margin:60px auto;color:#000;line-height:1.2;pointer-events:none;vertical-align:bottom;.blog_wrap{min-width:200px;padding:10px;margin:5px;background-color:#fff;box-sizing:border-box;border-radius:8px;pointer-events:all;}.blog_left{display:flex;flex-direction:column;flex:1 1 769px;max-width:769px;overflow:hidden;}.add_comment{pointer-events:all;}.text_area{width:100%;padding:10px;background-color:#f5f5f5;border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;}.operate_wrap{display:flex;justify-content:space-between;.preview{width:24px;height:24px;padding:0 2px;margin:0 4px;vertical-align:middle;cursor:pointer;fill:#a2a2a2;&:hover{background-color:#a2a2a2;border-radius:4px;fill:#fff;}}.submit{padding:4px 16px;font-weight:bold;margin-bottom:10px;background-color:#666;border:none;border-radius:4px;font-size:14px;color:#fff;cursor:pointer;}}.blog_content{padding:10px;box-sizing:border-box;border-radius:8px;pointer-events:all;}.blog_content,.preview_detail{blockquote{padding:4px 0 4px 1em;margin:0;margin-bottom:8px;border-left:4px solid gray;white-space:normal;background-color:#f5f5f5;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0 0 10px;white-space:pre-wrap;line-height:1.5;word-break:break-all;}a{pointer-events:all;}img{max-width:100%;}table{border-collapse:collapse;}table th,table td{min-width:80px;padding:4px;border:1px solid #000;}ul{margin:10px 0;}ul li:before{content:"⚪";float:left;margin-right:10px;font-weight:900;}code{background-color:#f5f5f5;overflow:auto;color:#000;}pre{padding:10px;background-color:#f5f5f5;overflow:auto;border-radius:8px;color:#000;}pre{&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}}.preview_detail_wrap{max-height:160px;overflow:auto;}.preview_detail{pointer-events:none;}.preview_detail_wrap,.text_area,.comment_detail{pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.comments_wrap{display:flex;flex-direction:column;min-width:240px;margin:5px;position:sticky;top:65px;max-height:calc(100vh - 80px);overflow:auto;&::-webkit-scrollbar{display:none;}}.avator{width:36px;height:36px;margin-right:10px;border-radius:4px;}.author_msg{display:flex;padding:5px;box-shadow:0px 0px 10px -5px #999;}.comment_content_wrap{background-color:#fff;border-radius:5px;margin-bottom:10px;pointer-events:all;.comment_detail_wrap{padding:10px;}.comment_detail{max-height:400px;overflow:auto;}}@media (min-width:769px){.comment_detail{max-width:400px;}}.text_small{font-size:12px;color:#423f3f;}@media (max-width:769px){display:block;.comments_wrap{max-height:unset;}}.atl_base_msg{margin-right:20px;}.atl_bg{height:200px;width:100%;object-fit:cover;margin:10px 0;}.fixed_operate_wrap{position:fixed;bottom:0;right:0;margin:28px 10px;z-index:6;pointer-events:all;}.artical_btn{display:inline-block;padding:0;background-color:transparent;background-image:radial-gradient(#000 0%,#888 10%,#fff 60%,transparent 75%);;border:none;border-radius:6px;text-align:center;}.atl_icon{width:25px;height:25px;fill:#888;}']),k=!0;function N(e){var t=e.artical,n=e.comments,r=(0,h.useRouter)().query,u=(0,b.useState)(t),f=u[0],g=u[1],x=(0,b.useRef)(null),w=(0,b.useRef)(null),k=(0,b.useState)(!1),N=k[0],P=k[1],S=(0,b.useRef)(1),C=(0,b.useState)(n||[]),E=C[0],I=C[1],z=(0,b.useState)(!1),M=z[0],Z=z[1],A=(0,h.useRouter)(),R=function(){if(null!==(e=w.current)&&void 0!==e&&e.value){var e,t=v()(d.TU.parse(w.current.value));(null==x?void 0:x.current)&&(x.current.innerHTML=t)}},U=(0,b.useCallback)(function(){r.number&&(0,i.Jl)(S.current,+r.number).then(function(e){g(function(t){return y(y({},t),{},{comments:e.total})}),I(e.data)})},[r]);return(0,b.useEffect)(function(){var e;!f&&r.number?(0,l.Dp)(+r.number).then(function(e){g(e.data),U()}):null!==(e=f.labels)&&void 0!==e&&e.some(function(e){return"blog"===e.name})||A.replace("/404"),c.S.data.emit(),c.S.isGithubOwner(function(e){return Z(e)})},[A,f,r,U]),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsxs)(p(),{children:[(0,_.jsx)("title",{children:null==f?void 0:f.title}),(0,_.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,_.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,_.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,_.jsxs)("main",{children:[(0,_.jsx)(j,{id:"test"}),(0,_.jsxs)(O,{children:[(0,_.jsxs)("div",{className:"blog_left",children:[(0,_.jsxs)("div",{className:"blog_wrap",children:[(0,_.jsx)("h1",{children:(null==f?void 0:f.title)||""}),(0,_.jsxs)("div",{className:"text_small",children:[(0,_.jsxs)("span",{className:"atl_base_msg",children:["创建时间：",(0,_.jsx)("span",{children:(null==f?void 0:f.created_at)||""})]}),(0,_.jsxs)("span",{className:"atl_base_msg",children:["评论数：",(null==f?void 0:f.comments)||0]})]}),(0,_.jsx)(a.Z,{className:"atl_bg",width:"700",height:"200",src:(null==f?void 0:f.img)||"",alt:(null==f?void 0:f.title)||""}),(0,_.jsx)("div",{className:"blog_content",dangerouslySetInnerHTML:{__html:(0,s.K)(v()(d.TU.parse((null==f?void 0:f.body)||"")))}})]}),(0,_.jsxs)("div",{className:"blog_wrap add_comment",children:[(0,_.jsxs)("div",{className:"operate_wrap",children:[(0,_.jsx)(o.Z,{type:"code",className:"preview",alt:"preview",onClick:function(e){e.stopPropagation(),P(function(e){return e||R(),!e})}}),(0,_.jsx)("button",{className:"submit","aria-label":"submit comment",onClick:function(e){var t;e.stopPropagation(),null!==(t=w.current)&&void 0!==t&&t.value&&r.number&&(0,i.Ir)(w.current.value,+r.number).then(function(e){!e.code&&(U(),w.current&&(w.current.value="",x.current&&(x.current.innerHTML=""),P(!1)))})},children:"add comment"})]}),(0,_.jsx)("div",{className:"preview_detail_wrap",style:{display:N?"block":"none"},children:(0,_.jsx)("div",{ref:x,className:"blog_content preview_detail"})}),(0,_.jsx)("label",{htmlFor:"commentInput"}),(0,_.jsx)("textarea",{id:"commentInput",ref:w,className:"text_area",rows:8,style:{display:N?"none":"block"},placeholder:"这里添加评论......"})]})]}),(0,_.jsx)("div",{className:"comments_wrap",children:E.length?E.map(function(e){return(0,_.jsxs)("div",{className:"comment_content_wrap",children:[(0,_.jsxs)("div",{className:"author_msg",children:[(0,_.jsx)(a.Z,{className:"avator",width:"36",height:"36",src:e.author.avatarUrl,alt:""}),(0,_.jsxs)("div",{children:[(0,_.jsx)("div",{children:e.author.login}),(0,_.jsx)("div",{className:"text_small",children:e.updatedAt})]})]}),(0,_.jsx)("div",{className:"comment_detail_wrap",children:(0,_.jsx)("div",{className:"blog_content comment_detail",dangerouslySetInnerHTML:{__html:(0,s.K)(v()(d.TU.parse(e.body)))}})})]},e.id)}):(0,_.jsx)("div",{className:"comment_content_wrap",children:(0,_.jsx)("div",{className:"blog_content comment_detail text_center",children:"一个评论都没有呢。。。。。。"})})}),(0,_.jsx)("div",{className:"fixed_operate_wrap",children:M&&(0,_.jsx)(m(),{className:"artical_btn","aria-label":"create a new artical",href:"/blogs/edit/".concat(f.number),children:(0,_.jsx)(o.Z,{type:"edit",className:"atl_icon"})})})]})]})]})}},6294:function(e,t,n){"use strict";n.d(t,{Ir:function(){return i},Jl:function(){return l},jZ:function(){return o}});var r=n(842),a=n(1435),o=function(){return(0,r.IO)({path:"/about"})},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return(0,r.IO)({path:"/github/addComment",method:"post",params:{number:t,body:e},headers:a.S.data.token?{Authorization:"token ".concat(a.S.data.token)}:{}})},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return(0,r.IO)({path:"/github/queryComments",method:"get",query:{number:t,page:e},headers:a.S.data.token?{Authorization:"token ".concat(a.S.data.token)}:{}})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return o}});var r=n(3454),a={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat(r.env.NEXT_PUBLIC_LOADING_GIF,'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},o=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var r=e;return Object.keys(a).forEach(function(e){n[e]||(r=a[e](r))}),r}},6134:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/[number]",function(){return n(4546)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[883,774,888,179],function(){return e(e.s=6134)}),_N_E=e.O()}]);