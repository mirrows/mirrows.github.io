(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2999:function(e,t,n){"use strict";var a=n(9499),i=n(4730),r=n(7294),c=n(5893),l=n(3454),s=["loadingPic","src","className","beforeLoad","onLoad","noReload","children","isShow"];function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,d=e.className,u=(e.beforeLoad,e.onLoad),_=void 0===u?function(e){return Promise.resolve(e)}:u,p=e.noReload,f=void 0!==p&&p,g=e.children,m=e.isShow,h=void 0===m||m,v=(0,i.Z)(e,s),x=(0,r.useRef)(t||"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80"),w=(0,r.useRef)(l.env.NEXT_PUBLIC_FAIL_IMG),j=(0,r.useState)(),b=j[0],y=j[1],N=(0,r.useState)(!1),S=N[0],P=N[1],k=(0,r.useRef)(null),M=(0,r.useRef)(0);return(0,r.useEffect)(function(){if(!M.current){var e,t,a=document.documentElement.clientHeight,i=document.documentElement.clientWidth;f||null===(e=k.current)||void 0===e||e.classList.add("lazy"),P(!1),k.current&&!(k.current.getBoundingClientRect().top<-k.current.clientHeight||k.current.getBoundingClientRect().top>1.5*a)&&!(k.current.getBoundingClientRect().left<-i||k.current.getBoundingClientRect().left>1.5*i)&&k.current.getBoundingClientRect().width&&k.current.getBoundingClientRect().height&&h&&(f&&(M.current=1),null===(t=k.current)||void 0===t||t.classList.remove("lazy"),y(n))}},[n,h,f]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach(function(t){(0,a.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(d?"lazy ".concat(d):"lazy"),ref:k,src:b,"data-src":n,alt:"",style:{backgroundImage:"url('".concat(x.current,"')")},onLoad:function(){var e;P(!0),n===(null===(e=k.current)||void 0===e?void 0:e.src)&&_(n)},onError:function(){var e;null===(e=k.current)||void 0===e||e.classList.add("lazy"),y(w.current),P(!0)}},v)),S||g]})}},9550:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(3806),i=n(7294),r=n(736),c=n.n(r),l=n(5893);function s(e){var t=e.page,n=e.size,r=void 0===n?30:n,s=e.total,o=e.onChange,d=(0,i.useState)(1),u=d[0],_=d[1],p=(0,i.useState)(r)[0];return(0,i.useEffect)(function(){_(t||1)},[t]),s<r?(0,l.jsx)(l.Fragment,{}):(0,l.jsxs)("div",{className:c().pagination_wrap,children:[(0,l.jsx)("button",{className:"".concat(c().arrow," ").concat(c().arrow_left),disabled:1===u,onClick:function(){_(function(e){var t=e-1;return o({page:t,size:p,total:s,type:"before"}),t})},children:(0,l.jsx)(a.Z,{type:"arrow_left",fill:"gray",width:"20"})}),(0,l.jsxs)("span",{className:c().vals,children:[(0,l.jsxs)("span",{className:c().page_val,children:[u,"/",Math.ceil(s/p)]}),(0,l.jsx)("span",{className:c().total_val,children:s})]}),(0,l.jsx)("button",{className:"".concat(c().arrow," ").concat(c().arrow_right),disabled:u===Math.ceil(s/p),onClick:function(){_(function(e){var t=e+1;return o({page:t,size:p,total:s,type:"after"}),t})},children:(0,l.jsx)(a.Z,{type:"arrow_right",fill:"gray",width:"20"})})]})}},7153:function(e,t,n){"use strict";var a=n(7294);t.Z=function(e){var t=e.value,n=e.render,i=(0,a.useState)(t),r=i[0],c=i[1];return(0,a.useEffect)(function(){c((t?new Date(t):new Date).toLocaleString())},[t]),n(r||"")}},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var a=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=a},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,a=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==a&&a}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=d,t.default=void 0;var a=n(6495).Z,i=n(2648).Z,r=(0,n(1598).Z)(n(7294)),c=i(n(1585)),l=n(8e3),s=n(5850),o=n(9470);function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[r.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(r.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===r.default.Fragment?e.concat(r.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var _=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,i,c,l,s=t.inAmpMode;return e.reduce(u,[]).reverse().concat(d(s).reverse()).filter((n=new Set,i=new Set,c=new Set,l={},function(e){var t=!0,a=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){a=!0;var r=e.key.slice(e.key.indexOf("$")+1);n.has(r)?t=!1:n.add(r)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var s=0,o=_.length;s<o;s++){var d=_[s];if(e.props.hasOwnProperty(d)){if("charSet"===d)c.has(d)?t=!1:c.add(d);else{var u=e.props[d],p=l[d]||new Set;("name"!==d||!a)&&p.has(u)?t=!1:(p.add(u),l[d]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!s&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=a({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,r.default.cloneElement(e,i)}return r.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=r.useContext(l.AmpStateContext),a=r.useContext(s.HeadManagerContext);return r.default.createElement(c.default,{reduceComponentsToState:p,headManager:a,inAmpMode:o.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,l=e.reduceComponentsToState;function s(){if(n&&n.mountedInstances){var t=a.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(l(t,e))}}return i&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),s()),r(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),r(function(){return n&&(n._pendingUpdate=s),function(){n&&(n._pendingUpdate=s)}}),c(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var a=(0,n(1598).Z)(n(7294)),i=!1,r=a.useLayoutEffect,c=i?function(){}:a.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},4801:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return N},default:function(){return S}});var a=n(5835),i=n(9008),r=n.n(i),c=n(7294),l=n(2379),s=n(8984),o=n(4494),d=n.n(o),u=n(5893);function _(){var e,t,n=(0,c.useState)(),a=n[0],i=n[1],r=(0,c.useState)(0),l=r[0],o=r[1],_=(0,c.useState)({}),p=_[0],f=_[1],g=(0,c.useState)([]),m=g[0],h=g[1],v=function(){try{var e=JSON.parse(sessionStorage.detail);f(e)}catch(e){f({})}s.SR.on("ip",function(e){var t=e.data,n=e.detail;t&&(i({ip:null==n?void 0:n.ip,data:t.data}),f(n))})},x=function(e,t){var n=t.year,a=t.month,i=t.date,r=t.hour,c=t.minute,l=t.secend;return new Date(n||e.getFullYear(),a||e.getMonth(),i||e.getDate(),r||e.getHours(),c||e.getMinutes(),l||e.getSeconds())},w=(0,c.useCallback)(function(){var e=new Date(2023,1,2,17,58),t=new Date,n=Math.round((new Date(e.getFullYear(),e.getMonth()+1,1).getTime()-new Date(e.getFullYear(),e.getMonth(),1).getTime())/864e5),a=x(e,{year:t.getFullYear()}),i=t.getFullYear()-e.getFullYear()+(t.getTime()>=a.getTime()?0:-1),r=x(e,{month:t.getMonth()}),c=(t.getMonth()-e.getMonth()+(t.getTime()>=r.getTime()?0:-1))%12,l=x(e,{month:t.getMonth(),date:t.getDate()});return[i,c,(t.getDate()-e.getDate()+(t.getTime()>=l.getTime()?0:-1)+n)%n,Math.floor((t.getTime()-e.getTime())%864e5/36e5),Math.floor((t.getTime()-e.getTime())%864e5/1e3/60)%60,Math.floor((t.getTime()-e.getTime())/1e3)%60]},[]);return(0,c.useEffect)(function(){var e=s.SR.data,t=e.preview,n=e.stayTime;t&&i(t),o(n),v();var a=setInterval(function(){o(s.SR.data.stayTime),h(w())},1e3);return function(){clearInterval(a)}},[w]),(0,u.jsxs)("div",{className:d().blog_editor_wrap,children:[(0,u.jsxs)("div",{className:d().items_wrap,children:[a&&(0,u.jsxs)("span",{className:d().tag_item,children:["IP地址：",(0,u.jsx)("span",{className:d().tag_value,children:null==a?void 0:a.ip})]}),!!(null!=a&&null!==(e=a.data)&&void 0!==e&&e.today)&&(0,u.jsxs)("span",{className:d().tag_item,children:["今日访问数：",(0,u.jsx)("span",{className:d().tag_value,children:null==a?void 0:a.data.today})]}),(0,u.jsxs)("span",{className:d().tag_item,children:["当前访问时长：",(0,u.jsxs)("span",{className:d().tag_value,children:[String(Math.floor(l/3600)).padStart(2,"0"),": ",String(Math.floor(l/60)%60).padStart(2,"0"),": ",String(Math.floor(l%60)).padStart(2,"0")]})]})]}),(0,u.jsx)("div",{children:(0,u.jsxs)("span",{className:d().tag_item,children:["IP来自：",(0,u.jsx)("span",{className:d().tag_value}),p.country," ",p.province," ",p.city," ",p.area]})}),(0,u.jsxs)("div",{className:d().items_wrap,children:[!!(null!=a&&null!==(t=a.data)&&void 0!==t&&t.total)&&(0,u.jsxs)("span",{className:d().tag_item,children:["总访问数：",(0,u.jsx)("span",{className:d().tag_value,children:null==a?void 0:a.data.total})]}),(0,u.jsxs)("span",{className:d().tag_item,children:["网站已运行：",(0,u.jsxs)("span",{className:d().tag_value,children:[m[0]?"".concat(m[0],"年"):"",m[1]||m[0]?"".concat(m[1],"月"):"",m[2]||m[1]||m[0]?"".concat(m[2],"天"):"",m[3],"小时",m[4],"分",m[5],"秒"]})]})]})]})}n(995);var p=n(3806),f=n(2999),g=n(1664),m=n.n(g),h=n(3290),v=n(1163),x=n(9550),w=n(7153),j=n(5619),b=n.n(j),y=n(1575),N=!0;function S(e){var t,n,i,o,d,g=e.artical,j=e.total,N=(0,c.useState)([]),S=N[0],P=N[1],k=(0,c.useState)(0),M=k[0],O=k[1],C=(0,c.useState)("RDL"),E=C[0],T=C[1],D=(0,c.useState)(j||0),I=D[0],R=D[1],Z=(0,c.useRef)(null),F=(0,c.useState)(g||[]),L=F[0],U=F[1],z=(0,h.wo)(".imgs_wrap .lazy").emit,A=(0,c.useState)(!1),B=A[0],H=A[1],Y=(0,v.useRouter)(),X=function(){(0,a.MG)().then(function(e){var t=e.data,n=[];try{n=t.reverse().map(function(e){return JSON.parse(e.body)})}catch(e){console.log(e)}P(n.map(function(e){var t=e.url,n=e.title,a=e.copyright,i=e.copyrightlink,r=e.enddate,c="",l="";return a.replace(/^(.+)\((.+)\)$/,function(e,t,n){return c=t.trim(),l=n.trim(),e}),{url:"https://bing.com".concat(t),title:n,content:c,copyright:l,copyrightlink:i,date:"".concat(r.slice(0,4),"/").concat(r.slice(4,6),"/").concat(r.slice(6,8))}}))})},G=function(e){(0,a.Dp)(e).then(function(e){var t=e.data,n=e.total;U(t),R(n)})},W=(0,c.useCallback)(function(e){return Date.now()-new Date(e).getTime()<3e5},[]);return(0,c.useEffect)(function(){s.SR.isGithubOwner(function(e){return H(e)}),X(),G(),T("Welcome to my world!!!")},[]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(r(),{children:[(0,u.jsx)("title",{children:E}),(0,u.jsx)("meta",{name:"description",content:"用于自我学习的博客站点,欢迎大家参观。本站基于vercel+nextjs+githubAPI搭建,比较少写blog,更多的是在自己的网上小窝开发有趣内容。"}),(0,u.jsx)("meta",{name:"keywords",content:"前端,个人博客,david,reed leaves,reedls,博客,知识展示"}),(0,u.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,u.jsx)("link",{rel:"icon",href:"/favicon.ico",type:"image/x-icon"}),(0,u.jsx)("link",{rel:"apple-touch-icon",href:"/favicon.ico"}),(0,u.jsx)("link",{rel:"manifest",href:"/manifest.json"}),(0,u.jsx)("meta",{httpEquiv:"Content-Security-Policy",content:"upgrade-insecure-requests"}),(0,u.jsx)("link",{rel:"dns-prefetch",href:"https://cn.bing.com/"}),(0,u.jsx)("link",{rel:"dns-prefetch",href:"https://empty.t-n.top/"}),(0,u.jsx)("link",{rel:"dns-prefetch",href:"https://api.t-n.top"})]}),(0,u.jsx)("main",{children:(0,u.jsxs)("div",{className:b().index_wrap,children:[!!(null!=S&&S.length)&&(0,u.jsx)(l.tq,{loop:!0,className:b().imgs_wrap,onSwiper:function(e){return Z.current=e},onSlideChangeTransitionEnd:function(e){O(e.realIndex),z()},children:S.map(function(e,t){return(0,u.jsx)(l.o5,{className:b().pic_wrap,children:t?(0,u.jsx)(f.Z,{src:null!=e&&e.url?(0,y.cn)(e.url,"&w=1920&h=1080"):s.OB.loadingGif||"",className:b().pic_item,width:"1920",height:"1080",alt:"bing"}):(0,u.jsx)("img",{src:null!=e&&e.url?(0,y.cn)(e.url,"&w=1920&h=1080"):"",className:b().pic_item,width:"1920",height:"1080",alt:"bing"})},t)})}),(0,u.jsxs)("div",{className:b().main_content,children:[(0,u.jsxs)("div",{className:b().content_left,children:[(0,u.jsx)(x.Z,{total:I,onChange:function(e){var t=e.per_page;G({per_page:void 0===t?30:t,page:e.page})}}),L.filter(function(e){return B||!W(e.created_at)}).map(function(e){return(0,u.jsxs)(m(),{"aria-label":"artical detail about ".concat(e.title),className:b().artical_wrap,href:W(e.created_at)?"/blogs/edit?number=".concat(e.number):"/blogs/".concat(e.number),children:[(0,u.jsxs)("div",{className:b().artical_content,children:[(0,u.jsxs)("h3",{className:b().artical_title,children:[B&&(0,u.jsx)("span",{className:b().artical_btn,onClick:function(t){t.preventDefault(),Y.push("/blogs/edit?number=".concat(e.number))},children:(0,u.jsx)(p.Z,{type:"edit",className:b().atl_icon})}),W(e.created_at)&&(0,u.jsx)("span",{className:b().uploading,children:"审核中"}),(0,u.jsx)("span",{children:e.title})]}),(0,u.jsx)("div",{className:"".concat(b().artical_detail," ").concat(b().hide_450),children:e.body}),(0,u.jsxs)("span",{className:b().artical_update_time,children:[(0,u.jsx)("span",{children:"—— updated at "}),(0,u.jsx)(w.Z,{render:function(e){return(0,u.jsx)("span",{children:e})},value:e.updated_at})]})]}),(0,u.jsx)(f.Z,{className:b().artical_img,width:"400",height:"200",src:(0,y.cn)(e.img,"w=400&h=200"),alt:e.title})]},e.id)})]}),(0,u.jsxs)("div",{className:b().content_right,children:[(0,u.jsx)(_,{}),(0,u.jsxs)("div",{className:b().bing_msg_wrap,children:[(0,u.jsxs)("div",{className:b().bing_handler,children:[(0,u.jsx)("button",{className:"".concat(b().bing_handle_item," ").concat(b().handle_before),"aria-label":"previous backgroundImage",onClick:function(){var e;return null===(e=Z.current)||void 0===e?void 0:e.slidePrev()},children:(0,u.jsx)(p.Z,{type:"arrow_left",fill:"#fff",width:"20"})}),(0,u.jsx)("button",{className:"".concat(b().bing_handle_item," ").concat(b().handle_after),"aria-label":"next backgroundImage",onClick:function(){var e;return null===(e=Z.current)||void 0===e?void 0:e.slideNext()},children:(0,u.jsx)(p.Z,{type:"arrow_right",fill:"#fff",width:"20"})})]}),(0,u.jsxs)("div",{className:b().bing_card,children:[(0,u.jsxs)("h3",{className:b().bing_msg_title,children:[null===(t=S[M])||void 0===t?void 0:t.title,(0,u.jsxs)("div",{className:b().time,children:["——",null===(n=S[M])||void 0===n?void 0:n.date]})]}),(0,u.jsx)("div",{className:b().bing_msg_content,children:null===(i=S[M])||void 0===i?void 0:i.content}),(0,u.jsx)("a",{className:b().copyright,href:null===(o=S[M])||void 0===o?void 0:o.copyrightlink,"aria-label":"more message about this bing image",target:"_blank",children:null===(d=S[M])||void 0===d?void 0:d.copyright})]})]})]})]}),(0,u.jsx)("div",{className:b().fixed_operate_wrap,children:B&&(0,u.jsx)(m(),{className:b().artical_btn,"aria-label":"create a new artical",href:"/blogs/create",children:(0,u.jsx)(p.Z,{type:"plus",className:b().atl_icon})})})]})})]})}},8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(4801)}])},736:function(e){e.exports={pagination_wrap:"Pagination_pagination_wrap__gP6oK",arrow:"Pagination_arrow__8YRjs",arrow_left:"Pagination_arrow_left__kn5Cp",arrow_right:"Pagination_arrow_right__RE6Cs",vals:"Pagination_vals__pOlk7",page_val:"Pagination_page_val__i116w",total_val:"Pagination_total_val__4zGza"}},4494:function(e){e.exports={blog_editor_wrap:"PreviewPannel_blog_editor_wrap__Sxazc",items_wrap:"PreviewPannel_items_wrap__kmVy_",tag_item:"PreviewPannel_tag_item__WiiYb",tag_value:"PreviewPannel_tag_value__d0agJ"}},5619:function(e){e.exports={index_wrap:"index_index_wrap__HM5h6",imgs_wrap:"index_imgs_wrap__UXDWx",bing_card:"index_bing_card__Pl6Pl",copyright:"index_copyright__cm_Id",pic_item:"index_pic_item__sMUgL",main_content:"index_main_content__TBsCD",bing_msg_wrap:"index_bing_msg_wrap__oUW3t",bing_msg_title:"index_bing_msg_title__Xibhn",time:"index_time__AuV6V",bing_msg_content:"index_bing_msg_content__G41I8",content_left:"index_content_left__KKYuN",content_right:"index_content_right__xLBhg",imgs_card_wrap:"index_imgs_card_wrap__jXUXZ",bing_handler:"index_bing_handler__ptw3F",bing_handle_item:"index_bing_handle_item__Fxo7j",artical_wrap:"index_artical_wrap__UiOFx",artical_img:"index_artical_img__0t4LS",artical_content:"index_artical_content__B6MXg",artical_title:"index_artical_title__FlMke",artical_btn:"index_artical_btn__hW2JH",artical_update_time:"index_artical_update_time__6t00u",artical_detail:"index_artical_detail__5v_tm",fixed_operate_wrap:"index_fixed_operate_wrap__d_8D2",atl_icon:"index_atl_icon__kl_Bv",uploading:"index_uploading__myH_V"}},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[880,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);