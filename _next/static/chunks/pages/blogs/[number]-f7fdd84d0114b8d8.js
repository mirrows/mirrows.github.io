(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[88],{9550:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(3806),r=n(7294),o=n(736),l=n.n(o),i=n(5893);function c(e){var t=e.page,n=e.size,o=void 0===n?30:n,c=e.total,s=e.onChange,u=(0,r.useState)(1),d=u[0],_=u[1],p=(0,r.useState)(o)[0];return(0,r.useEffect)(function(){_(t||1)},[t]),c<o?(0,i.jsx)(i.Fragment,{}):(0,i.jsxs)("div",{className:l().pagination_wrap,children:[(0,i.jsx)("button",{className:"".concat(l().arrow," ").concat(l().arrow_left),disabled:1===d,onClick:function(){_(function(e){var t=e-1;return s({page:t,size:p,total:c,type:"before"}),t})},children:(0,i.jsx)(a.Z,{type:"arrow_left",fill:"gray",width:"20"})}),(0,i.jsxs)("span",{className:l().vals,children:[(0,i.jsxs)("span",{className:l().page_val,children:[d,"/",Math.ceil(c/p)]}),(0,i.jsx)("span",{className:l().total_val,children:c})]}),(0,i.jsx)("button",{className:"".concat(l().arrow," ").concat(l().arrow_right),disabled:d===Math.ceil(c/p),onClick:function(){_(function(e){var t=e+1;return s({page:t,size:p,total:c,type:"after"}),t})},children:(0,i.jsx)(a.Z,{type:"arrow_right",fill:"gray",width:"20"})})]})}},7153:function(e,t,n){"use strict";var a=n(7294);t.Z=function(e){var t=e.value,n=e.render,r=(0,a.useState)(t),o=r[0],l=r[1];return(0,a.useEffect)(function(){l((t?new Date(t):new Date).toLocaleString())},[t]),n(o||"")}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var a=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=a},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,a=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==a&&a}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=u,t.default=void 0;var a=n(6495).Z,r=n(2648).Z,o=(0,n(1598).Z)(n(7294)),l=r(n(1585)),i=n(8e3),c=n(5850),s=n(9470);function u(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var _=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,r,l,i,c=t.inAmpMode;return e.reduce(d,[]).reverse().concat(u(c).reverse()).filter((n=new Set,r=new Set,l=new Set,i={},function(e){var t=!0,a=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){a=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":r.has(e.type)?t=!1:r.add(e.type);break;case"meta":for(var c=0,s=_.length;c<s;c++){var u=_[c];if(e.props.hasOwnProperty(u)){if("charSet"===u)l.has(u)?t=!1:l.add(u);else{var d=e.props[u],p=i[u]||new Set;("name"!==u||!a)&&p.has(d)?t=!1:(p.add(d),i[u]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!c&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var r=a({},e.props||{});return r["data-href"]=r.href,r.href=void 0,r["data-optimized-fonts"]=!0,o.default.cloneElement(e,r)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(i.AmpStateContext),a=o.useContext(c.HeadManagerContext);return o.default.createElement(l.default,{reduceComponentsToState:p,headManager:a,inAmpMode:s.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,i=e.reduceComponentsToState;function c(){if(n&&n.mountedInstances){var t=a.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(i(t,e))}}return r&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),c()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=c),function(){n&&(n._pendingUpdate=c)}}),l(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var a=(0,n(1598).Z)(n(7294)),r=!1,o=a.useLayoutEffect,l=r?function(){}:a.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},4546:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return k},default:function(){return C}});var a=n(9499),r=n(2999),o=n(3806),l=n(6294),i=n(5835),c=n(8984),s=n(277),u=n(9008),d=n.n(u),_=n(1664),p=n.n(_),m=n(1163),f=n(7294),v=n(8924),g=n.n(v),b=n(9980),h=n.n(b),w=n(7153),x=n(9550),j=n(9922),y=n(1575),N=n(8509),S=n.n(N),O=n(5893);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var k=!0;function C(e){var t=e.artical,n=e.comments,u=new(h()),_=(0,m.useRouter)(),v=_.query,b=_.replace,N=(0,f.useState)(t),k=N[0],C=N[1],M=(0,f.useRef)(null),I=(0,f.useRef)(null),E=(0,f.useRef)(null),Z=(0,f.useRef)(null),R=(0,f.useState)(!1),q=R[0],A=R[1],z=(0,f.useState)(n||[]),U=z[0],F=z[1],T=(0,f.useState)(!1),D=T[0],J=T[1],G=(0,f.useState)(1),H=G[0],L=G[1],X=(0,f.useRef)(null),K=function(){if(null!==(e=I.current)&&void 0!==e&&e.value){var e,t=g()(u.render(I.current.value));(null==M?void 0:M.current)&&(M.current.innerHTML=t)}},W=(0,f.useCallback)(function(e){v.number&&(0,l.Jl)(e||{number:+v.number}).then(function(t){F(t.data),C(function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach(function(t){(0,a.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},e)}),e||L(1)})},[v]);return(0,f.useEffect)(function(){v.number&&(0,i.Dp)({number:+v.number}).then(function(e){var t,n;if(!(null!==(t=e.data)&&void 0!==t&&null!==(n=t.labels)&&void 0!==n&&n.some(function(e){return"blog"===e.name}))){b("/404");return}(null==e?void 0:e.data)&&C(e.data),W()});try{var e=JSON.parse(localStorage.userMsg);E.current&&(E.current.value=e.username),Z.current&&(Z.current.value=e.email)}catch(e){console.log("暂无默认值",localStorage.userMsg)}c.SR.isGithubOwner(function(e){try{var t,n,a=JSON.parse(localStorage.userMsg);E.current&&(E.current.value=a.username),Z.current&&(Z.current.value=a.email)}catch(a){null!==(t=c.SR.data.userInfo)&&void 0!==t&&t.login&&!e&&(E.current&&(E.current.value=c.SR.data.userInfo.login),Z.current&&(null===(n=c.SR.data.userInfo)||void 0===n?void 0:n.email)&&(Z.current.value=c.SR.data.userInfo.email))}J(e)})},[v,W,b]),(0,O.jsxs)(O.Fragment,{children:[(0,O.jsxs)(d(),{children:[(0,O.jsx)("title",{children:null==k?void 0:k.title}),(0,O.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,O.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,O.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,O.jsxs)("main",{children:[(0,O.jsx)("div",{className:S().bg}),(0,O.jsxs)("div",{className:S().blog_detail_wrap,children:[(0,O.jsxs)("div",{className:S().blog_left,children:[(0,O.jsxs)("div",{className:S().blog_wrap,children:[(0,O.jsx)("h1",{children:(null==k?void 0:k.title)||""}),(0,O.jsxs)("div",{className:S().text_small,children:[(0,O.jsxs)("span",{className:S().atl_base_msg,children:["创建时间：",(0,O.jsx)(w.Z,{render:function(e){return(0,O.jsx)("span",{children:e})},value:null==k?void 0:k.created_at})]}),(0,O.jsxs)("span",{className:S().atl_base_msg,children:["评论数：",(null==k?void 0:k.comments)||0]})]}),(0,O.jsx)(r.Z,{className:S().atl_bg,width:"700",height:"200",src:(null==k?void 0:k.img)||"",alt:(null==k?void 0:k.title)||""}),(0,O.jsx)("div",{className:S().blog_content,dangerouslySetInnerHTML:{__html:(0,s.K)(g()(u.render((null==k?void 0:k.body)||"")))}})]}),(0,O.jsxs)("div",{className:"".concat(S().blog_wrap," ").concat(S().add_comment),children:[(0,O.jsxs)("div",{className:S().other_words,children:[(0,O.jsx)("input",{ref:E,type:"text",className:S().input_item,placeholder:"用户名(必填)",name:"",id:""}),(0,O.jsx)("input",{ref:Z,type:"text",className:S().input_item,placeholder:"邮箱(必填)",name:"",id:""})]}),(0,O.jsxs)(j.Z,{ref:X,clickable:!1,autoUpload:!0,onFinish:function(e){console.log(e),setTimeout(function(){I.current&&(I.current.value=I.current.value+e.map(function(e){var t=e.normal;return"\n![".concat(t.name,"](https://wsrv.nl/?url=").concat(t.download_url.replace("https://",""),")")}).join("\n"),I.current.focus())})},children:[(0,O.jsxs)("div",{children:[(0,O.jsx)("label",{htmlFor:"commentInput"}),(0,O.jsx)("textarea",{id:"commentInput",ref:I,className:S().text_area,rows:8,style:{display:q?"none":"block"},placeholder:"这里添加评论......",suppressContentEditableWarning:!0,contentEditable:!0,onPaste:function(e){var t,n=[],a=e.clipboardData.items;if(a&&a.length){for(var r=0;r<a.length;r++)if(-1!==a[r].type.indexOf("image")){var o=a[r].getAsFile();o&&n.push(o)}}n&&(null===(t=X.current)||void 0===t||t.addFile(n))}})]}),(0,O.jsxs)("div",{className:S().operate_wrap,children:[(0,O.jsx)(o.Z,{type:"code",className:S().preview,alt:"preview",onClick:function(e){e.stopPropagation(),A(function(e){return e||K(),!e})}}),(0,O.jsx)("button",{className:S().submit,"aria-label":"submit comment",onClick:function(e){if(e.stopPropagation(),null!==(t=E.current)&&void 0!==t&&t.value&&null!==(n=Z.current)&&void 0!==n&&n.value&&null!==(a=I.current)&&void 0!==a&&a.value&&v.number){var t,n,a,r,o={body:I.current.value,login:E.current.value,email:Z.current.value,avatarUrl:Z.current.value.match("@qq.com")?"https://q.qlogo.cn/g?b=qq&nk=".concat(Z.current.value.trim().replace("@qq.com",""),"&s=100"):null!==(r=c.SR.data.userInfo)&&void 0!==r&&r.login&&!D?c.SR.data.userInfo.avatar_url:"https://ui-avatars.com/api/?name=".concat((0,y.O1)())};if(!Z.current.value.match(/^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+$/)){alert("邮箱格式错误");return}(0,l.Ir)(JSON.stringify(o),+v.number).then(function(e){var t,n;!e.code&&(W(),localStorage.setItem("userMsg",JSON.stringify({username:null===(t=E.current)||void 0===t?void 0:t.value,email:null===(n=Z.current)||void 0===n?void 0:n.value})),I.current&&(I.current.value="",M.current&&(M.current.innerHTML=""),A(!1)))})}},children:"add comment"})]})]}),(0,O.jsx)("div",{className:S().preview_detail_wrap,style:{display:q?"block":"none"},children:(0,O.jsx)("div",{ref:M,className:"".concat(S().blog_content," ").concat(S().preview_detail)})})]})]}),(0,O.jsxs)("div",{className:S().comments_wrap,children:[(0,O.jsx)(x.Z,{page:H,total:(null==k?void 0:k.comments)||0,onChange:function(e){var t=e.page,n=void 0===t?1:t;L(n||1),W({number:+(v.number||""),per_page:30,page:n})}}),U.length?U.map(function(e){return(0,O.jsxs)("div",{className:S().comment_content_wrap,children:[(0,O.jsxs)("div",{className:S().author_msg,children:[(0,O.jsx)(r.Z,{className:S().avator,width:"36",height:"36",src:e.author.avatar_url,alt:""}),(0,O.jsxs)("div",{children:[(0,O.jsx)("div",{children:e.author.login}),(0,O.jsx)(w.Z,{render:function(e){return(0,O.jsx)("div",{className:S().text_small,children:e})},value:e.updated_at})]})]}),(0,O.jsx)("div",{className:S().comment_detail_wrap,children:(0,O.jsx)("div",{className:"".concat(S().blog_content," ").concat(S().comment_detail),dangerouslySetInnerHTML:{__html:(0,s.K)(g()(u.render(e.body)))}})})]},e.id)}):(0,O.jsx)("div",{className:S().comment_content_wrap,children:(0,O.jsx)("div",{className:"".concat(S().blog_content," ").concat(S().comment_detail," ").concat(S().text_center),children:"一个评论都没有呢。。。。。。"})})]}),(0,O.jsx)("div",{className:S().fixed_operate_wrap,children:D&&(0,O.jsx)(p(),{className:S().artical_btn,"aria-label":"create a new artical",href:"/blogs/edit?number=".concat(k.number),children:(0,O.jsx)(o.Z,{type:"edit",className:S().atl_icon})})})]})]})]})}},6294:function(e,t,n){"use strict";n.d(t,{Ir:function(){return o},Jl:function(){return l},jZ:function(){return r}});var a=n(842),r=function(){return(0,a.IO)({path:"/about"})},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return(0,a.Xv)({path:"/github/addComment",method:"post",params:{number:t,body:e}})},l=function(e){return(0,a.Xv)({path:"/github/queryComments",method:"get",query:e})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return r}});var a={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat("https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80",'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},r=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var r=e;return Object.keys(a).forEach(function(e){n[e]||(r=a[e](r))}),r}},6134:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/[number]",function(){return n(4546)}])},736:function(e){e.exports={pagination_wrap:"Pagination_pagination_wrap__gP6oK",arrow:"Pagination_arrow__8YRjs",arrow_left:"Pagination_arrow_left__kn5Cp",arrow_right:"Pagination_arrow_right__RE6Cs",vals:"Pagination_vals__pOlk7",page_val:"Pagination_page_val__i116w",total_val:"Pagination_total_val__4zGza"}},8509:function(e){e.exports={bg:"blogs_bg__dRVSM",blog_detail_wrap:"blogs_blog_detail_wrap__E22Ji",blog_wrap:"blogs_blog_wrap__X_cRq",blog_left:"blogs_blog_left__nXgRT",add_comment:"blogs_add_comment__um0ne",text_area:"blogs_text_area___o_FG",operate_wrap:"blogs_operate_wrap__sb_4B",preview:"blogs_preview__oVJRz",submit:"blogs_submit__0qWtI",blog_content:"blogs_blog_content__0mYt0",preview_detail:"blogs_preview_detail__b97n5",preview_detail_wrap:"blogs_preview_detail_wrap__LiGlR",comment_detail:"blogs_comment_detail__dWAyo",comments_wrap:"blogs_comments_wrap__9zpZI",avator:"blogs_avator__N6Glo",author_msg:"blogs_author_msg__MUlCg",comment_content_wrap:"blogs_comment_content_wrap___rS4U",comment_detail_wrap:"blogs_comment_detail_wrap__PhcR3",text_small:"blogs_text_small___ZbkN",atl_base_msg:"blogs_atl_base_msg___SFIz",atl_bg:"blogs_atl_bg__j_kPe",fixed_operate_wrap:"blogs_fixed_operate_wrap__cqRqF",artical_btn:"blogs_artical_btn__VbfQO",atl_icon:"blogs_atl_icon__P67bc",pagination_wrap:"blogs_pagination_wrap__1S7po",other_words:"blogs_other_words___t_Ct",input_item:"blogs_input_item__OteS4"}},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[880,811,922,774,888,179],function(){return e(e.s=6134)}),_N_E=e.O()}]);