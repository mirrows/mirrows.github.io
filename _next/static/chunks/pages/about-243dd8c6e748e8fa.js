(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{9550:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var a=n(3806),r=n(7294),o=n(736),c=n.n(o),i=n(5893);function l(e){var t=e.page,n=e.size,o=void 0===n?30:n,l=e.total,u=e.onChange,s=(0,r.useState)(1),_=s[0],d=s[1],m=(0,r.useState)(o)[0];return(0,r.useEffect)(function(){d(t||1)},[t]),l<o?(0,i.jsx)(i.Fragment,{}):(0,i.jsxs)("div",{className:c().pagination_wrap,children:[(0,i.jsx)("button",{className:"".concat(c().arrow," ").concat(c().arrow_left),disabled:1===_,onClick:function(){d(function(e){var t=e-1;return u({page:t,size:m,total:l,type:"before"}),t})},children:(0,i.jsx)(a.Z,{type:"arrow_left",fill:"gray",width:"20"})}),(0,i.jsxs)("span",{className:c().vals,children:[(0,i.jsxs)("span",{className:c().page_val,children:[_,"/",Math.ceil(l/m)]}),(0,i.jsx)("span",{className:c().total_val,children:l})]}),(0,i.jsx)("button",{className:"".concat(c().arrow," ").concat(c().arrow_right),disabled:_===Math.ceil(l/m),onClick:function(){d(function(e){var t=e+1;return u({page:t,size:m,total:l,type:"after"}),t})},children:(0,i.jsx)(a.Z,{type:"arrow_right",fill:"gray",width:"20"})})]})}},7153:function(e,t,n){"use strict";var a=n(7294);t.Z=function(e){var t=e.value,n=e.render,r=(0,a.useState)(t),o=r[0],c=r[1];return(0,a.useEffect)(function(){c((t?new Date(t):new Date).toLocaleString())},[t]),n(o||"")}},1369:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return O},default:function(){return P}});var a=n(9499),r=n(7812),o=n(3806),c=n(7153),i=n(6294),l=n(8984),u=n(277),s=n(9008),_=n.n(s),d=n(7294),m=n(2990),p=n(8924),f=n.n(p),v=n(9980),b=n.n(v),g=n(9550),h=n(9922),w=n(1575),j=n(3250),x=n.n(j),y=n(5893);function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach(function(t){(0,a.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var O=!0;function P(e){var t=e.artical,n=e.comments,a=new(b()),s=(0,d.useRef)(),p=(0,d.useRef)(),v=(0,d.useState)(t),j=v[0],N=v[1],O=(0,d.useRef)(null),P=(0,d.useRef)(null),E=(0,d.useRef)(null),R=(0,d.useRef)(null),k=(0,d.useState)(!1),C=k[0],Z=k[1],I=(0,d.useState)((0,r.Z)(n||[])),M=I[0],z=I[1],q=(0,d.useState)(1),T=q[0],D=q[1],J=(0,d.useRef)(null),L=(0,d.useState)(!1),F=L[0],U=L[1],A=function(){if(null!==(e=P.current)&&void 0!==e&&e.value){var e,t=f()(a.render(P.current.value));(null==O?void 0:O.current)&&(O.current.innerHTML=t)}},G=function(e){(0,i.Jl)(e||{number:2}).then(function(t){var n=t.data,a=t.total;z(n),N(function(e){return S(S({},e),{},{comments:a})}),e||D(1)})},K=function(){(0,i.jZ)().then(function(e){N(e.data)})};return(0,d.useEffect)(function(){l.SR.data.emit(),p.current||(s.current=document.getElementById("test"),p.current=(0,m.pT)({el:s.current,gpgpuSize:512,colors:[65280,255],color:16711680,coordScale:.5,noiseIntensity:.001,noiseTimeCoef:1e-4,pointSize:5,pointDecay:.0025,sleepRadiusX:250,sleepRadiusY:250,sleepTimeCoefX:.001,sleepTimeCoefY:.002}),document.body.addEventListener("click",function(){p.current&&(p.current.uniforms.uColor.value.set(16777215*Math.random()),p.current.uniforms.uCoordScale.value=.001+2*Math.random(),p.current.uniforms.uNoiseIntensity.value=1e-4+.001*Math.random(),p.current.uniforms.uPointSize.value=1+10*Math.random())}),K(),G(),l.SR.isGithubOwner(function(e){try{var t,n,a=JSON.parse(localStorage.userMsg);E.current&&(E.current.value=a.username),R.current&&(R.current.value=a.email)}catch(a){null!==(t=l.SR.data.userInfo)&&void 0!==t&&t.login&&!e&&(E.current&&(E.current.value=l.SR.data.userInfo.login),R.current&&(null===(n=l.SR.data.userInfo)||void 0===n?void 0:n.email)&&(R.current.value=l.SR.data.userInfo.email))}U(e)}))},[]),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(_(),{children:[(0,y.jsx)("title",{children:"about"}),(0,y.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,y.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,y.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,y.jsxs)("main",{children:[(0,y.jsx)("div",{id:"test",className:x().about_bg}),(0,y.jsxs)("div",{className:x().aboout_me_wrap,children:[(0,y.jsxs)("div",{className:x().blog_left,children:[(0,y.jsx)("div",{className:"".concat(x().blog_content," ").concat(x().blog_wrap),dangerouslySetInnerHTML:{__html:(0,u.K)(f()(a.render((null==j?void 0:j.body)||"")))}}),(0,y.jsxs)("div",{className:"".concat(x().blog_wrap," ").concat(x().add_comment),children:[(0,y.jsxs)("div",{className:x().other_words,children:[(0,y.jsx)("input",{ref:E,type:"text",className:x().input_item,placeholder:"用户名(必填)",name:"",id:""}),(0,y.jsx)("input",{ref:R,type:"text",className:x().input_item,placeholder:"邮箱(必填)",name:"",id:""})]}),(0,y.jsx)("label",{htmlFor:"comments_input"}),(0,y.jsxs)(h.Z,{ref:J,clickable:!1,autoUpload:!0,onFinish:function(e){setTimeout(function(){P.current&&(P.current.value=P.current.value+e.map(function(e){var t=e.normal;return"![".concat(t.name,"](https://wsrv.nl/?url=").concat((t.download_url||"").replace("https://",""),"&n=-1&q=80)")}).join("\n"),P.current.focus())})},children:[(0,y.jsx)("div",{children:(0,y.jsx)("textarea",{id:"comments_input",ref:P,className:x().text_area,rows:8,style:{display:C?"none":"block"},placeholder:"此处添加评论","aria-label":"edit some comments",suppressContentEditableWarning:!0,contentEditable:!0,onPaste:function(e){var t,n=[],a=e.clipboardData.items;if(a&&a.length){for(var r=0;r<a.length;r++)if(-1!==a[r].type.indexOf("image")){var o=a[r].getAsFile();o&&n.push(o)}}n&&(null===(t=J.current)||void 0===t||t.addFile(n))}})}),(0,y.jsxs)("div",{className:x().operate_wrap,children:[(0,y.jsx)(o.Z,{type:"code",className:x().preview,alt:"preview",onClick:function(e){e.stopPropagation(),Z(function(e){return e||A(),!e})}}),(0,y.jsx)("button",{className:x().submit,"aria-label":"submit comment",onClick:function(e){if(e.stopPropagation(),null!==(t=E.current)&&void 0!==t&&t.value&&null!==(n=R.current)&&void 0!==n&&n.value&&null!==(a=P.current)&&void 0!==a&&a.value){var t,n,a,r,o={body:P.current.value,login:E.current.value,email:R.current.value,avatarUrl:R.current.value.match("@qq.com")?"https://q.qlogo.cn/g?b=qq&nk=".concat(R.current.value.trim().replace("@qq.com",""),"&s=100"):null!==(r=l.SR.data.userInfo)&&void 0!==r&&r.login&&!F?l.SR.data.userInfo.avatar_url:"https://ui-avatars.com/api/?name=".concat((0,w.O1)())};if(!R.current.value.match(/^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+$/)){alert("邮箱格式错误");return}(0,i.Ir)(JSON.stringify(o)).then(function(e){var t,n;e.code||(G(),localStorage.setItem("userMsg",JSON.stringify({username:null===(t=E.current)||void 0===t?void 0:t.value,email:null===(n=R.current)||void 0===n?void 0:n.value})),P.current&&(P.current.value=""),O.current&&(O.current.innerHTML=""),Z(!1))})}},children:"add comment"})]})]}),(0,y.jsx)("div",{className:x().preview_detail_wrap,style:{display:C?"block":"none"},children:(0,y.jsx)("div",{ref:O,className:"".concat(x().blog_content," ").concat(x().preview_detail)})})]})]}),(0,y.jsxs)("div",{className:x().comments_wrap,children:[(0,y.jsx)(g.Z,{page:T,total:(null==j?void 0:j.comments)||0,onChange:function(e){var t=e.page;D(t||1),G({number:33,per_page:30,page:t})}}),M.length?M.map(function(e){return(0,y.jsxs)("div",{className:x().comment_content_wrap,children:[(0,y.jsxs)("div",{className:x().author_msg,children:[(0,y.jsx)("img",{className:x().avator,src:e.author.avatar_url,alt:""}),(0,y.jsxs)("div",{children:[(0,y.jsx)("div",{children:e.author.login}),(0,y.jsx)(c.Z,{render:function(e){return(0,y.jsx)("div",{className:x().text_small,children:e})},value:e.updatedAt})]})]}),(0,y.jsx)("div",{className:x().comment_detail_wrap,children:(0,y.jsx)("div",{className:"".concat(x().blog_content," ").concat(x().comment_detail),dangerouslySetInnerHTML:{__html:(0,u.K)(f()(a.render(e.body)))}})})]},e.id)}):(0,y.jsx)("div",{className:x().comment_content_wrap,children:(0,y.jsx)("div",{className:"".concat(x().blog_content," ").concat(x().comment_detail," ").concat(x().text_center),children:"一个评论都没有呢。。。。。。"})})]})]})]})]})}},6294:function(e,t,n){"use strict";n.d(t,{Ir:function(){return o},Jl:function(){return c},jZ:function(){return r}});var a=n(842),r=function(){return(0,a.IO)({path:"/about"})},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return(0,a.Xv)({path:"/github/addComment",method:"post",params:{number:t,body:e}})},c=function(e){return(0,a.Xv)({path:"/github/queryComments",method:"get",query:e})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return r}});var a={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat("https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80",'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},r=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var r=e;return Object.keys(a).forEach(function(e){n[e]||(r=a[e](r))}),r}},8318:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(1369)}])},736:function(e){e.exports={pagination_wrap:"Pagination_pagination_wrap__gP6oK",arrow:"Pagination_arrow__8YRjs",arrow_left:"Pagination_arrow_left__kn5Cp",arrow_right:"Pagination_arrow_right__RE6Cs",vals:"Pagination_vals__pOlk7",page_val:"Pagination_page_val__i116w",total_val:"Pagination_total_val__4zGza"}},3250:function(e){e.exports={about_bg:"about_about_bg__oJPUs",aboout_me_wrap:"about_aboout_me_wrap__476Ka",blog_wrap:"about_blog_wrap__UMsnb",blog_left:"about_blog_left__hcM_n",add_comment:"about_add_comment__chgLg",text_area:"about_text_area___mfO_",operate_wrap:"about_operate_wrap__UpbUi",preview:"about_preview__n9eVe",submit:"about_submit__uDZbI",blog_content:"about_blog_content__JY6m_",comment_detail:"about_comment_detail__fbvom",preview_detail_wrap:"about_preview_detail_wrap__iKFh6",preview_detail:"about_preview_detail__816ud",comments_wrap:"about_comments_wrap__sVMxs",avator:"about_avator__f667E",author_msg:"about_author_msg__cjGrE",comment_content_wrap:"about_comment_content_wrap__TlD34",comment_detail_wrap:"about_comment_detail_wrap__9blZJ",text_small:"about_text_small__x5OGA",other_words:"about_other_words__sll5L",input_item:"about_input_item__38U_Z"}}},function(e){e.O(0,[737,880,811,789,922,774,888,179],function(){return e(e.s=8318)}),_N_E=e.O()}]);