(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[877],{2307:function(e,t,n){"use strict";var r=n(7294),i=n(6912),a=n.n(i),o=n(5893),c=(0,r.forwardRef)(function(e,t){var n=e.onClose,i=e.children,c=(0,r.useState)(!1),u=c[0],s=c[1],l=function(){s(!0)},d=function(){s(!1),null==n||n()};return(0,r.useImperativeHandle)(t,function(){return{close:d,open:l}}),(0,o.jsx)(o.Fragment,{children:u&&(0,o.jsx)("div",{className:a().mask,onClick:d,children:(0,o.jsx)("div",{onClick:function(e){e.stopPropagation()},children:i})})})});c.displayName="Modal",t.Z=c},8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=l,t.default=void 0;var r=n(6495).Z,i=n(2648).Z,a=(0,n(1598).Z)(n(7294)),o=i(n(1585)),c=n(8e3),u=n(5850),s=n(9470);function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function d(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var _=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,i,o,c,u=t.inAmpMode;return e.reduce(d,[]).reverse().concat(l(u).reverse()).filter((n=new Set,i=new Set,o=new Set,c={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var a=e.key.slice(e.key.indexOf("$")+1);n.has(a)?t=!1:n.add(a)}switch(e.type){case"title":case"base":i.has(e.type)?t=!1:i.add(e.type);break;case"meta":for(var u=0,s=_.length;u<s;u++){var l=_[u];if(e.props.hasOwnProperty(l)){if("charSet"===l)o.has(l)?t=!1:o.add(l);else{var d=e.props[l],f=c[l]||new Set;("name"!==l||!r)&&f.has(d)?t=!1:(f.add(d),c[l]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!u&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var i=r({},e.props||{});return i["data-href"]=i.href,i.href=void 0,i["data-optimized-fonts"]=!0,a.default.cloneElement(e,i)}return a.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=a.useContext(c.AmpStateContext),r=a.useContext(u.HeadManagerContext);return a.default.createElement(o.default,{reduceComponentsToState:f,headManager:r,inAmpMode:s.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,c=e.reduceComponentsToState;function u(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(c(t,e))}}return i&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),u()),a(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),a(function(){return n&&(n._pendingUpdate=u),function(){n&&(n._pendingUpdate=u)}}),o(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),i=!1,a=r.useLayoutEffect,o=i?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},6193:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return C},default:function(){return Z}});var r=n(29),i=n(9499),a=n(7812),o=n(7794),c=n.n(o),u=n(9008),s=n.n(u),l=n(4e3),d=n.n(l),_=n(3806),f=n(7294),p=n(842),m=n(8984),h=n(3454).env.NEXT_PUBLIC_EXTRA_URL,v=n(277),g=n(8924),b=n.n(g),w=n(9980),y=n.n(w);function x(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j=function(){var e,t;function n(){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,n),(0,i.Z)(this,"db",void 0),(0,i.Z)(this,"table",void 0),this.db=null,this.table=""}return e=[{key:"init",value:function(e){var t=this,n=e.name,r=e.version,i=void 0===r?1:r,a=e.table;return new Promise(function(e,r){if(console.log(t),!t.db){var o,c=null===(o=indexedDB)||void 0===o?void 0:o.open(n,i);c.onupgradeneeded=function(){var e,n;t.db=c.result,null!==(e=t.db)&&void 0!==e&&e.objectStoreNames.contains(a)||null===(n=t.db)||void 0===n||n.createObjectStore(a,{keyPath:"id"})},c.onsuccess=function(){t.db=c.result,e(t)},c.onerror=function(e){r(e)}}})}},{key:"create",value:function(e,t){var n=this;return new Promise(function(r,i){if(!n.db){i("db not found");return}console.log(n.db);var a=n.db.transaction(e,"readwrite").objectStore(e).add(t);a.onsuccess=function(){r(n)},a.onerror=function(e){i(e)}})}},{key:"del",value:function(e,t){var n=this;return new Promise(function(r,i){if(!n.db){i("db not found");return}var a=n.db.transaction(e,"readwrite").objectStore(e).delete(t);a.onsuccess=function(){r(n)},a.onerror=function(e){i(e)}})}},{key:"update",value:function(e,t){var n=this;return new Promise(function(r,i){if(!n.db){i("db not found");return}var a=n.db.transaction(e,"readwrite").objectStore(e).put(t);a.onsuccess=function(){r(n)},a.onerror=function(e){i(e)}})}},{key:"query",value:function(e,t){var n=this;return new Promise(function(r,i){if(!n.db){i("db not found");return}var a=n.db.transaction(e).objectStore(e).get(t);a.onsuccess=function(){r(a.result)},a.onerror=function(e){i(e)}})}},{key:"each",value:function(e,t){var n=this;return new Promise(function(i,a){var o;if(!n.db){a("db not found");return}n.db.transaction(e).objectStore(e).openCursor().onsuccess=(o=(0,r.Z)(c().mark(function e(n){var r;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=n.target.result)){e.next=7;break}return e.next=4,t(r.value);case 4:r.continue(),e.next=8;break;case 7:i("finish");case 8:return e.abrupt("return");case 9:case"end":return e.stop()}},e)})),function(e){return o.apply(this,arguments)})})}}],x(n.prototype,e),t&&x(n,t),n}(),k=n(1575),S=n(2307),N=n(5893);function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var C=!0;function Z(){var e,t,n,i=new(y()),o=(0,f.useState)(""),u=o[0],l=o[1],g=(0,f.useState)(0),w=g[0],x=g[1],O=(0,f.useState)(""),C=O[0],Z=O[1],E=(0,f.useRef)(""),I=(0,f.useRef)(""),M=(0,f.useState)(!1),R=M[0],U=M[1],A=(0,f.useState)([]),T=A[0],D=A[1],H=(0,f.useState)([]),L=H[0],G=H[1],X=(0,f.useRef)([]),z=(0,f.useRef)(null),F=(0,f.useRef)(),q=(0,k.XA)(),B=(0,f.useRef)(null),K=(0,f.useState)(null),$=K[0],J=K[1],Q=function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;(0,p.IO)({baseUrl:h,path:"/gemini/answer",method:"POST",params:{id:t},headers:{token:btoa(m.SR.get("ipDetail").ip)}}).then(function(r){if(r.code){console.log(r);return}var i=X.current,o=i[i.length-1];if(!r.data.answer.length||r.data.answer.length>((null===(c=o.parts)||void 0===c?void 0:c.length)||0)||n<3){var c,u,s,l=r.data.answer.length===((null===(u=o.parts)||void 0===u?void 0:u.length)||0)?n+1:1;r.data.answer.length!==(null===(s=o.parts)||void 0===s?void 0:s.length)&&(o.parts=r.data.answer,X.current=[].concat((0,a.Z)(X.current.slice(0,-1)),[o]),D(function(){return(0,a.Z)(X.current)})),console.log(X.current),setTimeout(function(){e(t,l)},3e3)}}).catch(function(e){var t=X.current[X.current.length-1];t.parts=[{text:"这个问题，我母鸡啊，CPU都给干坏了,正在重启服务呀,请稍等\n"}],x(0),U(!0),X.current=[].concat((0,a.Z)(X.current.slice(0,-1)),[t]),D(function(){return(0,a.Z)(X.current)}),setTimeout(function(){W({id:I.current,title:C,history:X.current}).then(function(){t.parts.push({text:"服务重启好了，问个别的问题吧"}),X.current=[].concat((0,a.Z)(X.current.slice(0,-1)),[t]),U(!1),D(function(){return(0,a.Z)(X.current)})})},1e4),console.log(e)})},W=function(e){var t,n,r=(null==e?void 0:e.id)||Date.now().toString(),i=(null==e?void 0:e.title)||new Date(+r).toISOString(),a=e;return a&&(a.history=(null==e?void 0:e.history.map(function(e){return P(P({},e),{},{parts:e.parts.length?e.parts:[{text:"\n...我什么都不知道，并试图萌混过关...\n"}]})}))||[]),I.current=r,E.current=i,null!=a&&a.id||null===(n=F.current)||void 0===n||n.update("chat",{id:r,title:i,history:(null==a?void 0:a.history)||[]}),D((null==a?void 0:a.history)||[]),Z(i),(t=null!=a&&a.id?{history:a.history}:{},(0,p.IO)({baseUrl:h,path:"/gemini/init_global",method:"POST",params:t,headers:{token:btoa(m.SR.get("ipDetail").ip)}})).then(function(e){console.log(e),I.current===r&&x((null==e?void 0:e.times)||0)})},Y=(e=(0,r.Z)(c().mark(function e(){return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W();case 2:ee();case 3:case"end":return e.stop()}},e)})),function(){return e.apply(this,arguments)}),V=(t=(0,r.Z)(c().mark(function e(t){return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.id!==I.current){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,W(t);case 4:case"end":return e.stop()}},e)})),function(e){return t.apply(this,arguments)}),ee=(n=(0,r.Z)(c().mark(function e(){var t,n;return c().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,null===(t=F.current)||void 0===t?void 0:t.each("chat",function(e){n.push(e)});case 3:console.log(n),G(n);case 5:case"end":return e.stop()}},e)})),function(){return n.apply(this,arguments)}),et=function(e,t){var n;null==e||e.stopPropagation(),console.log(t),null===(n=B.current)||void 0===n||n.open(),J(t||{id:I.current,title:C,history:T})},en=function(e){J(function(t){return t&&P(P({},t),{},{title:e})})},er=function(e,t){var n;null==e||e.stopPropagation(),null===(n=F.current)||void 0===n||n.del("chat",(null==t?void 0:t.id)||I.current||Date.now().toString()),ee(),I.current="",Z(""),D([]),x(0)},ei=function(){var e;$&&(null===(e=F.current)||void 0===e||e.update("chat",$).then(function(){var e;ee(),null===(e=B.current)||void 0===e||e.close(),Z($.title)}))};return(0,f.useEffect)(function(){var e,t;null===(e=z.current)||void 0===e||e.scrollIntoView({behavior:"smooth",block:"start"}),I.current&&(null===(t=F.current)||void 0===t||t.update("chat",{id:I.current,title:E.current,history:T}).then(function(){ee()}))},[T]),(0,f.useEffect)(function(){E.current=C},[C]),(0,f.useEffect)(function(){var e=new j;e.init({name:"gemini",table:"chat"}).then((0,r.Z)(c().mark(function t(){return c().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:F.current=e,ee();case 2:case"end":return t.stop()}},t)})))},[]),(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(s(),{children:[(0,N.jsx)("title",{children:"Gemini"}),(0,N.jsx)("meta",{name:"description",content:"AI chat use in Gemini"}),(0,N.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,N.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,N.jsxs)("main",{children:[(0,N.jsxs)("div",{className:d().wrap,children:[(0,N.jsxs)("div",{className:d().left_wrap+(R?" err_area":""),children:[(0,N.jsx)("div",{className:d().new_chat_items+" scroll_er",children:L.map(function(e){return(0,N.jsxs)("div",{className:"".concat(d().chat_item_wrap," ").concat(e.id===I.current?d().active:""),style:q||e.id!==I.current?{}:{paddingRight:"2.6rem"},onClick:function(){return V(e)},children:[(0,N.jsx)("div",{className:"two_line",children:e.title?e.title:new Date(+e.id).toISOString()}),q||e.id!==I.current?"":(0,N.jsxs)("div",{className:d().operate_wrap,children:[(0,N.jsx)("button",{className:d().operate_icon_btn,onClick:function(t){return et(t,e)},children:(0,N.jsx)(_.Z,{type:"edit",className:d().operate_icon})}),(0,N.jsx)("button",{className:d().operate_icon_btn,onClick:function(t){return er(t,e)},children:(0,N.jsx)(_.Z,{type:"close",className:d().operate_icon})})]})]},e.id)})}),(0,N.jsx)("div",{className:d().new_chat_wrap,onClick:Y,children:(0,N.jsx)(_.Z,{type:"plus",className:d().new_chat_btn})})]}),(0,N.jsxs)("div",{className:d().right_wrap,children:[C?(0,N.jsxs)("div",{className:d().cur_chat_title,children:[(0,N.jsxs)("span",{className:d().title_txt,children:[(0,N.jsx)(_.Z,{type:"edit",className:d().title_edit_icon,onClick:function(){return et()}}),C]}),(0,N.jsx)(_.Z,{type:"close",className:d().title_close_icon,onClick:function(){return er()}})]}):"",(0,N.jsxs)("div",{className:d().right_contact_wrap+" scroll_er md_detail",children:[T.map(function(e,t){return(0,N.jsxs)("div",{className:d().gemini_msg_item,style:{marginLeft:"user"===e.role?"auto":"0"},children:[(0,N.jsx)("div",{className:d().avatar,style:{order:"user"===e.role?"1":"0"},children:(0,N.jsx)("img",{className:d().avatar_img,src:"user"===e.role?"/gemini_user.png":"/gemini_model.webp",alt:"avatar"})}),e.parts.length?(0,N.jsx)("div",{className:d().gemini_msg_item_content,style:{marginLeft:"user"===e.role?"auto":""},dangerouslySetInnerHTML:{__html:(0,v.K)(b()(i.render((0,v.S)(e.parts.map(function(e){return e.text}).join("")))))}}):(0,N.jsx)("div",{className:d().gemini_msg_item_content,style:{textAlign:"center",padding:"30px 50px",color:"#c9c9c9"},children:"莫打扰，我正在在思考... ..."})]},t)}),(0,N.jsx)("div",{ref:z})]}),w?(0,N.jsxs)("div",{className:d().right_input_wrap,children:[(0,N.jsx)("input",{type:"text",value:u,autoFocus:!0,className:d().input,placeholder:"请在此处开启聊天(剩余聊天次数：".concat(w,"次)"),onInput:function(e){var t;return l(null===(t=e.target)||void 0===t?void 0:t.value)}}),(0,N.jsx)(_.Z,{type:"enter",disabled:!u,className:d().enter_icon,onClick:function(){var e=u.trim();e&&(X.current=[].concat((0,a.Z)(T),[{role:"user",parts:[{text:e}]},{role:"model",parts:[]}]),D(function(){return(0,a.Z)(X.current)}),l(""),(0,p.IO)({baseUrl:h,path:"/gemini/question",method:"POST",params:{msg:e},headers:{token:btoa(m.SR.get("ipDetail").ip)}}).then(function(e){console.log(e),x(e.times||0),e.id&&Q(e.id)}).catch(function(e){console.log(e)}))}})]}):""]})]}),(0,N.jsx)(S.Z,{ref:B,children:(0,N.jsxs)("div",{className:d().rename_wrap,children:[(0,N.jsx)("div",{className:d().rename_modal_title,children:"重命名"}),(0,N.jsx)("div",{className:d().rename_item,children:(0,N.jsx)("input",{type:"text",className:d().rename_input,value:null==$?void 0:$.title,onInput:function(e){return en(e.target.value)}})}),(0,N.jsxs)("div",{className:d().footer,children:[(0,N.jsx)("button",{className:"outlined_btn",onClick:function(){var e;return null===(e=B.current)||void 0===e?void 0:e.close()},children:"cancel"}),(0,N.jsx)("button",{className:"normal_btn",onClick:function(){return ei()},children:"confirm"})]})]})})]})]})}},277:function(e,t,n){"use strict";n.d(t,{K:function(){return i},S:function(){return a}});var r={lazyImg:function(e){return e.replace(/\<img src/g,'<img class="lazy" src="'.concat("https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80",'" data-src'))},tableScroll:function(e){return e.replace(/\<table\>/g,'<div class="scroll_table"><table>').replace(/\<\/table\>/g,"</table></div>")}},i=function(e,t){var n={};null==t||t.forEach(function(e){n[e]=!0});var i=e;return Object.keys(r).forEach(function(e){n[e]||(i=r[e](i))}),i},a=function(e){return e.replace(/\*\*(.+)\*\*(\S)/g,"**$1** $2")}},396:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/gemini",function(){return n(6193)}])},6912:function(e){e.exports={mask:"Modal_mask__Pjkoc"}},4e3:function(e){e.exports={wrap:"gemini_wrap__GXUx1",left_wrap:"gemini_left_wrap___2dxb",right_wrap:"gemini_right_wrap__0UCQ_",right_input_wrap:"gemini_right_input_wrap__KpZEO",input:"gemini_input__HlZGJ",enter_icon:"gemini_enter_icon__BPZtR",right_contact_wrap:"gemini_right_contact_wrap__vX815",new_chat_items:"gemini_new_chat_items__eaHYs",new_chat_wrap:"gemini_new_chat_wrap__izz5c",new_chat_btn:"gemini_new_chat_btn__EwgRu",gemini_msg_item:"gemini_gemini_msg_item__Yy8PF",avatar_img:"gemini_avatar_img__bPdiC",gemini_msg_item_content:"gemini_gemini_msg_item_content__gpShy",chat_item_wrap:"gemini_chat_item_wrap__IPHlI",operate_wrap:"gemini_operate_wrap__SIoyH",active:"gemini_active__5ov25",operate_icon_btn:"gemini_operate_icon_btn__Bp4u0",operate_icon:"gemini_operate_icon__3AvJM",rename_wrap:"gemini_rename_wrap__DpCju",footer:"gemini_footer__cLb_v",rename_item:"gemini_rename_item__rkRbG",rename_key:"gemini_rename_key__KhLvy",rename_input:"gemini_rename_input__lGkaj",rename_modal_title:"gemini_rename_modal_title__iSGNO",cur_chat_title:"gemini_cur_chat_title__XLjTW",title_txt:"gemini_title_txt__iJ6d_",title_edit_icon:"gemini_title_edit_icon__tqR7w",title_close_icon:"gemini_title_close_icon__ux1_z"}},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[811,774,888,179],function(){return e(e.s=396)}),_N_E=e.O()}]);