(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{4622:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var r=n(842),o=n(1435),a=n(7856),i=n.n(a),s=n(7441),l=n(9008),d=n.n(l),c=n(7294),p=n(9521),u=n(2990),x=n(5893),m=p.ZP.div.withConfig({displayName:"about__DIV",componentId:"sc-1rlodvf-0"})(["position:fixed;top:0;bottom:0;left:0;right:0;z-index:-1;"]),g=p.ZP.div.withConfig({displayName:"about__BlogContent",componentId:"sc-1rlodvf-1"})(["position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;margin:60px auto;color:#fff;line-height:1.2;pointer-events:none;vertical-align:bottom;.blog_wrap{padding:10px;margin:5px;background-color:rgba(200,200,200,.5);box-sizing:border-box;border-radius:8px;}.blog_left{display:flex;flex-direction:column;flex:1 1 680px;max-width:680px;overflow:hidden;}.add_comment{pointer-events:all;}.text_area{width:100%;padding:10px;background-color:rgba(255,255,255,.8);border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;}.operate_wrap{display:flex;justify-content:space-between;.preview{width:24px;height:24px;padding:0 2px;margin:0 4px;vertical-align:middle;cursor:pointer;&:hover{background-color:rgba(200,200,200,.5);border-radius:4px;}}.submit{padding:4px 16px;font-weight:bold;margin-bottom:10px;background-color:#fff;border:none;border-radius:4px;font-size:14px;color:#000;cursor:pointer;}}.blog_content{padding:10px 20px;box-sizing:border-box;border-radius:8px;pointer-events:none;blockquote{padding:4px 0 4px 1em;margin:0;border-left:4px solid gray;white-space:normal;background-color:#5c5c5c;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0;white-space:pre-wrap;line-height:1.5;}a{pointer-events:all;}}.preview_detail_wrap{max-height:160px;overflow:auto;}.preview_detail{pointer-events:none;padding:10px;}.preview_detail_wrap,.text_area,.comment_content_wrap{pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.comments_wrap{display:flex;flex-direction:column;min-width:300px;pointer-events:none;.blog_wrap{border-radius:0 5px 5px 5px;margin:5px 10px;}}.avator{width:36px;height:36px;margin-right:10px;}.author_msg{display:flex;width:fit-content;padding:5px 10px;background-color:rgba(200,200,200,.5);margin-bottom:-5px;border-radius:5px 5px 0 5px;margin-top:10px;.blog_wrap{border-radius:0 5px 5px 5px;}}.comment_content_wrap{overflow:auto;max-height:400px;}.text_small{font-size:12px;color:#c1c1c1;}@media (max-width:680px){display:block;}"]);function h(){var e=(0,c.useRef)(),t=(0,c.useRef)(),n=(0,c.useRef)(null),a=(0,c.useRef)(null),l=(0,c.useRef)(null),p=(0,c.useState)(!1),h=p[0],b=p[1],f=(0,c.useRef)(1),v=(0,c.useRef)(0),_=(0,c.useState)([]),w=_[0],j=_[1],y=function(){if(null!==(e=l.current)&&void 0!==e&&e.value){var e,t=i().sanitize(s.TU.parse(l.current.value));(null==a?void 0:a.current)&&(a.current.innerHTML=t)}},k=function(){var e;(e=f.current,(0,r.IO)({path:"/github/queryComments",method:"get",query:{number:2,page:e},headers:o.S.data.token?{Authorization:"token ".concat(o.S.data.token)}:{}})).then(function(e){console.log(e.data,e.total),v.current=e.total,j(e.data)})};return(0,c.useEffect)(function(){t.current||(e.current=document.getElementById("test"),t.current=(0,u.pT)({el:e.current,gpgpuSize:512,colors:[65280,255],color:16711680,coordScale:.5,noiseIntensity:.001,noiseTimeCoef:1e-4,pointSize:5,pointDecay:.0025,sleepRadiusX:250,sleepRadiusY:250,sleepTimeCoefX:.001,sleepTimeCoefY:.002}),document.body.addEventListener("click",function(){t.current&&(t.current.uniforms.uColor.value.set(16777215*Math.random()),t.current.uniforms.uCoordScale.value=.001+2*Math.random(),t.current.uniforms.uNoiseIntensity.value=1e-4+.001*Math.random(),t.current.uniforms.uPointSize.value=1+10*Math.random())}),(0,r.IO)({path:"/about"}).then(function(e){if(!e.code){var t=e.data.body,r=i().sanitize(s.TU.parse(t));(null==n?void 0:n.current)&&(n.current.innerHTML=r)}}),k())},[]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(d(),{children:[(0,x.jsx)("title",{children:"about"}),(0,x.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,x.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,x.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,x.jsxs)("main",{children:[(0,x.jsx)(m,{id:"test"}),(0,x.jsxs)(g,{children:[(0,x.jsxs)("div",{className:"blog_left",children:[(0,x.jsx)("div",{ref:n,className:"blog_content blog_wrap"}),(0,x.jsxs)("div",{className:"blog_wrap add_comment",children:[(0,x.jsxs)("div",{className:"operate_wrap",children:[(0,x.jsx)("img",{src:"/code.svg",className:"preview",alt:"preview",onClick:function(e){e.stopPropagation(),b(function(e){return e||y(),!e})}}),(0,x.jsx)("button",{className:"submit",onClick:function(e){var t,n;e.stopPropagation(),null!==(t=l.current)&&void 0!==t&&t.value&&(n=l.current.value,(0,r.IO)({path:"/github/addComment",method:"post",params:{number:2,body:n},headers:o.S.data.token?{Authorization:"token ".concat(o.S.data.token)}:{}})).then(function(e){!e.code&&(k(),l.current&&(l.current.value=""))})},children:"add comment"})]}),(0,x.jsx)("div",{className:"preview_detail_wrap",style:{display:h?"block":"none"},children:(0,x.jsx)("div",{ref:a,className:"blog_content preview_detail"})}),(0,x.jsx)("textarea",{ref:l,className:"text_area",rows:8,style:{display:h?"none":"block"}})]})]}),(0,x.jsx)("div",{className:"comments_wrap",children:w.map(function(e){return(0,x.jsxs)("div",{className:"",children:[(0,x.jsxs)("div",{className:"author_msg",children:[(0,x.jsx)("img",{className:"avator",src:e.author.avatarUrl,alt:""}),(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{children:e.author.login}),(0,x.jsx)("div",{className:"text_small",children:new Date(e.updatedAt).toLocaleString()})]})]}),(0,x.jsx)("div",{className:"comment_content_wrap blog_wrap",children:(0,x.jsx)("div",{className:"blog_content",dangerouslySetInnerHTML:{__html:i().sanitize(s.TU.parse(e.body))}})})]},e.id)})})]})]})]})}},8318:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(4622)}])}},function(e){e.O(0,[737,277,774,888,179],function(){return e(e.s=8318)}),_N_E=e.O()}]);