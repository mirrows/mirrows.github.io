(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{7153:function(e,t,n){"use strict";var r=n(7294);t.Z=function(e){var t=e.value,n=e.render,o=(0,r.useState)(t),a=o[0],i=o[1];return(0,r.useEffect)(function(){i((t?new Date(t):new Date).toLocaleString())},[t]),n(a||"")}},1369:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return v},default:function(){return _}});var r=n(7812),o=n(7153),a=n(6294),i=n(8984),l=n(277),c=n(7441),s=n(9008),d=n.n(s),u=n(7294),p=n(9521),m=n(2990),x=n(8924),f=n.n(x),b=n(5893),h=p.ZP.div.withConfig({displayName:"about__DIV",componentId:"sc-1rlodvf-0"})(["position:fixed;top:0;bottom:0;left:0;right:0;z-index:-1;"]),g=p.ZP.div.withConfig({displayName:"about__BlogContent",componentId:"sc-1rlodvf-1"})(['position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;margin:60px auto;color:#fff;line-height:1.2;pointer-events:none;vertical-align:bottom;.blog_wrap{padding:10px;margin:5px;background-color:rgba(200,200,200,.5);box-sizing:border-box;border-radius:8px;}.blog_left{display:flex;flex-direction:column;flex:1 1 680px;max-width:680px;overflow:hidden;}.add_comment{pointer-events:all;}.text_area{width:100%;padding:10px;background-color:rgba(255,255,255,.8);border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;}.operate_wrap{display:flex;justify-content:space-between;.preview{width:24px;height:24px;padding:0 2px;margin:0 4px;vertical-align:middle;cursor:pointer;&:hover{background-color:rgba(200,200,200,.5);border-radius:4px;}}.submit{padding:4px 16px;font-weight:bold;margin-bottom:10px;background-color:#fff;border:none;border-radius:4px;font-size:14px;color:#000;cursor:pointer;}}.blog_content{padding:10px;box-sizing:border-box;border-radius:8px;pointer-events:all;}.blog_content,.comment_detail{blockquote{padding:4px 0 4px 1em;margin:0;margin-bottom:8px;border-left:4px solid gray;white-space:normal;background-color:#5c5c5c;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0 0 10px;;white-space:pre-wrap;line-height:1.5;word-break:break-all;}a{pointer-events:all;}img{max-width:100%;}table{border-collapse:collapse;}table th,table td{min-width:80px;padding:4px;border:1px solid #000;}ul{margin:10px 0;}ul li:before{content:"⚪";float:left;margin-right:10px;font-weight:900;}code{background-color:#f5f5f5;overflow:auto;}pre{padding:10px;background-color:#f5f5f5;overflow:auto;border-radius:8px;}pre{&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}}.preview_detail_wrap{max-height:160px;overflow:auto;}.preview_detail{pointer-events:none;}.preview_detail_wrap,.text_area,.comment_detail{pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.comments_wrap{display:flex;flex-direction:column;min-width:240px;margin:5px;position:sticky;top:40px;max-height:calc(100vh - 80px);overflow:auto;&::-webkit-scrollbar{display:none;}}.avator{width:36px;height:36px;margin-right:10px;border-radius:4px;}.author_msg{display:flex;padding:5px;box-shadow:0px 5px 10px -5px #999;}.comment_content_wrap{background-color:rgba(200,200,200,.5);border-radius:5px;margin-bottom:10px;pointer-events:all;.comment_detail_wrap{padding:10px;}.comment_detail{max-height:400px;overflow:auto;}}@media (min-width:680px){.comment_detail{max-width:400px;}}.text_small{font-size:12px;color:#c1c1c1;}@media (max-width:680px){display:block;.comments_wrap{max-height:unset;}}']),v=!0;function _(e){var t=e.artical,n=e.comments,s=(0,u.useRef)(),p=(0,u.useRef)(),x=(0,u.useState)(t),v=x[0],_=x[1],w=(0,u.useRef)(null),k=(0,u.useRef)(null),j=(0,u.useState)(!1),y=j[0],N=j[1],S=(0,u.useRef)(1),I=(0,u.useRef)(0),z=(0,u.useState)((0,r.Z)(n||[])),C=z[0],T=z[1],E=function(){if(null!==(e=k.current)&&void 0!==e&&e.value){var e,t=f()(c.TU.parse(k.current.value));(null==w?void 0:w.current)&&(w.current.innerHTML=t)}},L=function(e){(0,a.Jl)(e).then(function(e){I.current=e.total,T(e.data)})},M=function(){(0,a.jZ)().then(function(e){_(e.data)})};return(0,u.useEffect)(function(){i.S.data.emit(),p.current||(s.current=document.getElementById("test"),p.current=(0,m.pT)({el:s.current,gpgpuSize:512,colors:[65280,255],color:16711680,coordScale:.5,noiseIntensity:.001,noiseTimeCoef:1e-4,pointSize:5,pointDecay:.0025,sleepRadiusX:250,sleepRadiusY:250,sleepTimeCoefX:.001,sleepTimeCoefY:.002}),document.body.addEventListener("click",function(){p.current&&(p.current.uniforms.uColor.value.set(16777215*Math.random()),p.current.uniforms.uCoordScale.value=.001+2*Math.random(),p.current.uniforms.uNoiseIntensity.value=1e-4+.001*Math.random(),p.current.uniforms.uPointSize.value=1+10*Math.random())}),M(),L(S.current))},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(d(),{children:[(0,b.jsx)("title",{children:"about"}),(0,b.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,b.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,b.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,b.jsxs)("main",{children:[(0,b.jsx)(h,{id:"test"}),(0,b.jsxs)(g,{children:[(0,b.jsxs)("div",{className:"blog_left",children:[(0,b.jsx)("div",{className:"blog_content blog_wrap",dangerouslySetInnerHTML:{__html:(0,l.K)(f()(c.TU.parse((null==v?void 0:v.body)||"")))}}),(0,b.jsxs)("div",{className:"blog_wrap add_comment",children:[(0,b.jsx)("label",{htmlFor:"comments_input",children:"添加评论"}),(0,b.jsxs)("div",{className:"operate_wrap",children:[(0,b.jsx)("img",{src:"/code.svg",className:"preview",alt:"preview",onClick:function(e){e.stopPropagation(),N(function(e){return e||E(),!e})}}),(0,b.jsx)("button",{className:"submit","aria-label":"submit comment",onClick:function(e){var t;e.stopPropagation(),null!==(t=k.current)&&void 0!==t&&t.value&&(0,a.Ir)(k.current.value).then(function(e){e.code||(L(1),k.current&&(k.current.value=""),w.current&&(w.current.innerHTML=""),N(!1))})},children:"add comment"})]}),(0,b.jsx)("div",{className:"preview_detail_wrap",style:{display:y?"block":"none"},children:(0,b.jsx)("div",{ref:w,className:"blog_content preview_detail"})}),(0,b.jsx)("textarea",{id:"comments_input",ref:k,className:"text_area",rows:8,style:{display:y?"none":"block"},placeholder:"此处添加评论","aria-label":"edit some comments"})]})]}),(0,b.jsx)("div",{className:"comments_wrap",children:C.length?C.map(function(e){return(0,b.jsxs)("div",{className:"comment_content_wrap",children:[(0,b.jsxs)("div",{className:"author_msg",children:[(0,b.jsx)("img",{className:"avator",src:e.author.avatarUrl,alt:""}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{children:e.author.login}),(0,b.jsx)(o.Z,{render:function(e){return(0,b.jsx)("div",{className:"text_small",children:e})},value:e.updatedAt})]})]}),(0,b.jsx)("div",{className:"comment_detail_wrap",children:(0,b.jsx)("div",{className:"blog_content comment_detail",dangerouslySetInnerHTML:{__html:(0,l.K)(f()(c.TU.parse(e.body)))}})})]},e.id)}):(0,b.jsx)("div",{className:"comment_content_wrap",children:(0,b.jsx)("div",{className:"blog_content comment_detail text_center",children:"一个评论都没有呢。。。。。。"})})})]})]})]})}},6294:function(e,t,n){"use strict";n.d(t,{Ir:function(){return i},Jl:function(){return l},jZ:function(){return a}});var r=n(842),o=n(8984),a=function(){return(0,r.IO)({path:"/about"})},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return(0,r.IO)({path:"/github/addComment",method:"post",params:{number:t,body:e},headers:o.S.data.token?{Authorization:"token ".concat(o.S.data.token)}:{}})},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return(0,r.IO)({path:"/github/queryComments",method:"get",query:{number:t,page:e},headers:o.S.data.token?{Authorization:"token ".concat(o.S.data.token)}:{}})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return a}});var r=n(3454),o={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat(r.env.NEXT_PUBLIC_LOADING_GIF,'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},a=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var r=e;return Object.keys(o).forEach(function(e){n[e]||(r=o[e](r))}),r}},8318:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(1369)}])}},function(e){e.O(0,[737,924,262,774,888,179],function(){return e(e.s=8318)}),_N_E=e.O()}]);