(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5075)}])},5075:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return h}});var o=n(5893),s=n(9008),i=n.n(s),c=n(1664),r=n.n(c),a=n(1163),l=n(7294);function h(){let[t,e]=(0,l.useState)(""),[n,s]=(0,l.useState)(""),c=(0,a.useRouter)(),h=t=>{let e=Object.keys(t).map(e=>"".concat(e,"=").concat(String(t[e]))).join("&");return e?"?".concat(e):""},u=t=>{var e;let n={};return null===(e=t.split("?")[1])||void 0===e||e.split("&").forEach(t=>{let[e,o]=t.split("=");n[e]=o}),n},d=()=>{console.log("$NEXT_PUBLIC_SECRET","$NEXT_PUBLIC_CLIENT_ID",location.origin),location.href="https://github.com/login/oauth/authorize".concat(h({client_id:"$NEXT_PUBLIC_CLIENT_ID",scope:"repo"}))},_=t=>{fetch("https://mess.t-n.top/mess/",{method:"POST",body:JSON.stringify({url:"https://github.com/login/oauth/access_token",method:"POST",headers:{Accept:"application/vnd.github+json"},data:{client_id:"$NEXT_PUBLIC_CLIENT_ID",client_secret:"$NEXT_PUBLIC_SECRET",code:t}})}).then(t=>t.json()).then(t=>{console.log(t),t.access_token&&sessionStorage.setItem("token",t.access_token),p(),c.push("/")})},p=()=>{let t={url:"https://api.github.com/user",method:"GET",headers:{Accept:"application/vnd.github+json",Authorization:"token ".concat(sessionStorage.token)}};fetch("https://mess.t-n.top/mess/",{method:"POST",body:JSON.stringify(t)}).then(t=>t.json()).then(t=>{console.log(t),t.login&&sessionStorage.setItem("userInfo",JSON.stringify(t))})};return(0,l.useEffect)(()=>{console.log("$NEXT_PUBLIC_SECRET","$NEXT_PUBLIC_CLIENT_ID",location.origin);let t=u(c.asPath);if(t.code)console.log(t.code),_(t.code);else{if(!sessionStorage.token)return;p()}},[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(i(),{children:[(0,o.jsx)("title",{children:"welcome to my world"}),(0,o.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,o.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,o.jsx)("meta",{httpEquiv:"Content-Security-Policy",content:"upgrade-insecure-requests"})]}),(0,o.jsxs)("main",{children:[(0,o.jsx)("img",{src:"/github.svg",style:{width:"32px"},alt:"github",onClick:d}),(0,o.jsxs)("div",{children:[(0,o.jsx)(r(),{href:"/about",children:"关于我们"}),(0,o.jsx)("div",{children:"现在已经可以在dev提交分支，通过github actions自动部署了"})]})]})]})}},1163:function(t,e,n){t.exports=n(387)}},function(t){t.O(0,[996,774,888,179],function(){return t(t.s=8312)}),_N_E=t.O()}]);