(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[922],{9922:function(e,t,n){"use strict";var r=n(9499),o=n(29),a=n(7812),c=n(4730),i=n(7794),l=n.n(i),s=n(7167),u=n(7989),p=n(3290),d=n(7294),f=n(3806),m=n(3243),_=n(7620),h=n.n(_),v=n(5893),g=["clickable","children","operateLine","autoUpload","onStartUpload","personal","onFinish","className","allowUrl","allowClick","align"];function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var y=(0,d.forwardRef)(function(e,t){var n,r,i,_,w=e.clickable,y=void 0===w||w,j=e.children,O=(e.operateLine,e.autoUpload),x=void 0!==O&&O,P=e.onStartUpload,R=void 0===P?function(){}:P,N=e.personal,E=void 0!==N&&N,S=e.onFinish,D=void 0===S?function(){}:S,U=e.className,k=void 0===U?"":U,I=e.allowUrl,Z=e.allowClick,C=void 0===Z||Z,L=e.align,T=(0,c.Z)(e,g),A=(0,d.useRef)(null),M=(0,d.useRef)(null),z=(0,d.useState)([]),Y=z[0],q=z[1],B=(0,d.useState)([]),X=B[0],G=B[1],H=(0,d.useState)(""),V=H[0],F=H[1],W=(0,d.useState)(!1),K=W[0],J=W[1],Q=(0,d.useRef)(E),$=(0,d.useRef)(null),ee=(0,d.useRef)((null===(i=window)||void 0===i?void 0:i.URL)||(null===(_=window)||void 0===_?void 0:_.webkitURL)),et=(0,d.useMemo)(function(){return[].concat((0,a.Z)(Y.map(function(e){var t,n=(null===(t=ee.current)||void 0===t?void 0:t.createObjectURL(e))||"";return{id:btoa(encodeURI(e.name+e.type+e.size)),type:"file",src:n}})),(0,a.Z)(X.map(function(e){return{id:e.slice(30,50),type:"url",src:e}})))},[X,Y]),en=(0,d.useState)({}),er=en[0],eo=en[1],ea=function(){var e;K||null===(e=M.current)||void 0===e||e.click()},ec=(n=(0,o.Z)(l().mark(function e(t,n,r,o){var a,c,i,u,d;return l().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(a=!(t.type.match("gif")&&!r.match("mini")))){e.next=7;break}return e.next=4,(0,p.el)(t,n);case 4:e.t0=e.sent,e.next=8;break;case 7:e.t0=t;case 8:return c=e.t0,e.next=11,(0,p.Uc)(c);case 11:if(i=e.sent,!(c.size>2936012.8&&a)){e.next=20;break}return e.next=15,(0,p.QO)(i);case 15:return u=e.sent,e.next=18,(0,p.Uc)(u);case 18:i=e.sent,console.log("compress again",c.size,"to",u.size);case 20:return e.next=22,(0,s.iS)({content:i.split(",")[1],path:r,mode:o});case 22:return d=e.sent,e.abrupt("return",d);case 24:case"end":return e.stop()}},e)})),function(e,t,r,o){return n.apply(this,arguments)}),ei=(r=(0,o.Z)(l().mark(function e(t){var n,r,o,a,c,i,p,d,f,m,_,h,v,g;return l().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:for(o in null==t||t.stopPropagation(),J(!0),R(),Q.current=E,n=Q.current?s.VD.PRIVATE:s.VD.PHOTO,r={},er)r[o]="WAIT";eo(b({},r)),a=[],c=0;case 10:if(!(c<Y.length)){e.next=25;break}return i="pic"+Date.now()+String(Math.random()).slice(4,7)+"."+Y[c].name.split(".").reverse()[0],p="".concat((0,u.ED)(new Date,"YYYY_MM_DD"),"/").concat(i),d="LOADING",r[et[c].id]=d,eo(b({},r)),e.next=18,ec(Y[c],{quality:2097152>Y[c].size?2097152/Y[c].size:.8},"normal/".concat(p),n);case 18:!(null!=(f=e.sent)&&f.data)||null!=f&&f.code?d="ERROR":a.push({normal:f.data}),r[et[c].id]="LOADING"===d?"SUCCESS":d,eo(b({},r));case 22:c++,e.next=10;break;case 25:m=0;case 26:if(!(m<X.length)){e.next=42;break}return _="LOADING",r[et[m+Y.length].id]=_,eo(b({},r)),h="pic"+Date.now()+String(Math.random()).slice(4,7),v="".concat((0,u.ED)(new Date,"YYYY_MM_DD"),"/").concat(h),e.next=34,(0,s.P_)({url:X[m],path:"normal/".concat(v),mode:n});case 34:g=e.sent,a.push({normal:g.data}),g.code&&(_="ERROR"),r[et[m+Y.length].id]="LOADING"===_?"SUCCESS":_,eo(b({},r));case 39:m++,e.next=26;break;case 42:D(a),G(function(e){return e.filter(function(e,t){return"ERROR"===r[et[t+Y.length].id]})}),q(function(e){return e.filter(function(e,t){return"ERROR"===r[et[t].id]})}),M.current&&(M.current.value=""),J(!1);case 47:case"end":return e.stop()}},e)})),function(e){return r.apply(this,arguments)}),el=function(){V&&!K&&(G(function(e){return Array.from(new Set([].concat((0,a.Z)(e),(0,a.Z)(V.split(",").map(function(e){return(0,u.cn)(e,"")})))))}),F(""))},es=function(e,t){"file"===e.type?q(function(e){var n=(0,a.Z)(e);return n.splice(t,1),n}):"url"===e.type&&G(function(e){var n=(0,a.Z)(e);return n.splice(t-Y.length,1),n})},eu=function(e){var t;null===(t=$.current)||void 0===t||t.open(et.map(function(t){return{cdn_url:t.src,sha:Date.now().toString()+e}}),e)},ep=function(e){q(function(t){return[].concat((0,a.Z)(t),(0,a.Z)(e))})};return(0,d.useImperativeHandle)(t,function(){return{addFile:ep}}),(0,d.useEffect)(function(){var e=ee.current;return function(){et.forEach(function(t){"file"===t.type&&t.src&&(null==e||e.revokeObjectURL(t.src))})}},[et]),(0,d.useEffect)(function(){!Y.length&&M.current&&(M.current.value="")},[Y]),(0,d.useEffect)(function(){x&&et.length&&ei(),eo(function(e){var t={};return et.forEach(function(n){t[n.id]=e[n.id]||"WAIT"}),t})},[et,x]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",b(b({ref:A,className:"".concat(h().imgupload_wrap," ").concat(h().con_input_wrap).concat(K?" invalid":"").concat(k?" ".concat(k):"")},T),{},{onClick:function(){return C&&y&&ea()},onDrop:function(e){var t;e.preventDefault(),e.stopPropagation(),!K&&(null===(t=e.dataTransfer.files)||void 0===t?void 0:t.length)&&q(function(t){return[].concat((0,a.Z)(t),(0,a.Z)(Array.from(e.dataTransfer.files)))})},onDragOver:function(e){return e.preventDefault()},children:[Array.isArray(j)?(0,d.cloneElement)(j[0],b(b({},j[0].props),{},{className:"".concat(h().upload_children_wrap," ").concat(j[0].props.className||"").concat(et.length?" hide":"")})):(0,d.cloneElement)(j,b(b({},j.props),{},{className:"".concat(h().upload_children_wrap," ").concat(j.props.className||"").concat(et.length?" hide":"")})),(0,v.jsx)("input",{ref:M,type:"file",name:"",id:"",multiple:!0,accept:"image/*",style:{display:"none"},onChange:function(e){var t;(null===(t=e.target.files)||void 0===t?void 0:t.length)&&q((0,a.Z)(Array.from(e.target.files)))}}),(0,v.jsx)("div",{className:"scroll_er ".concat(h().tmp_wrap),children:et.map(function(e,t){return(0,v.jsxs)("div",{className:"".concat(h().tmp_item_wrap," upload_").concat(er[e.id]),onClick:function(e){return e.stopPropagation()},children:[(0,v.jsx)("img",{className:h().tmp_item,width:"40",height:"96",src:e.src,alt:"",onClick:function(){return eu(t)}}),K||(0,v.jsx)(f.Z,{className:h().tmp_del_btn,type:"close",onClick:function(){return es(e,t)}}),{SUCCESS:(0,v.jsx)(f.Z,{className:h().tmp_status_btn,type:"yes",fill:"green"}),ERROR:(0,v.jsx)(f.Z,{className:h().tmp_status_btn,type:"no",fill:"red"}),WAIT:"",LOADING:(0,v.jsx)(f.Z,{className:"".concat(h().tmp_status_btn," rotate"),type:"loading",fill:"gray"})}[er[e.id]]]},e.id)})}),(0,v.jsxs)("div",{className:"up_operate_".concat(void 0===L?"bottom":L),children:[(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[C&&y||(0,v.jsx)(f.Z,{width:26,type:"image",style:{marginRight:"10px"},onClick:ea}),(void 0===I||I)&&(0,v.jsxs)("div",{className:h().url_input_wrap,onClick:function(e){return e.stopPropagation()},children:[(0,v.jsx)("input",{className:"normal_input ".concat(h().url_input),type:"text",placeholder:"".concat(et.length||0," pics will be uploaded"),value:V,disabled:K,onInput:function(e){return F(e.currentTarget.value)},onKeyUp:function(e){"Enter"===e.key&&el()}}),(0,v.jsx)(f.Z,{className:h().enter_icon,type:"enter",style:K?{opacity:.5,cursor:"default"}:{},onClick:el})]})]}),x||!!et.length&&(0,v.jsx)("button",{className:"normal_btn ".concat(h().submit_btn),disabled:K,onClick:ei,children:"upload"}),Array.isArray(j)?(0,d.cloneElement)(j[1],b({},j[1].props)):""]})]})),(0,v.jsx)(m.Z,{ref:$,slice:!1})]})});y.displayName="ImgUpload",t.Z=y},2999:function(e,t,n){"use strict";var r=n(9499),o=n(4730),a=n(7294),c=n(5893),i=n(3454),l=["loadingPic","src","className","beforeLoad","onLoad","noReload","children","isShow"];function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}t.Z=function(e){var t=e.loadingPic,n=e.src,u=e.className,p=(e.beforeLoad,e.onLoad),d=void 0===p?function(e){return Promise.resolve(e)}:p,f=e.noReload,m=void 0!==f&&f,_=e.children,h=e.isShow,v=void 0===h||h,g=(0,o.Z)(e,l),w=(0,a.useRef)(t||"https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2023_09_10/pic1694333133502339.gif&w=130&fit=cover&n=-1&q=80"),b=(0,a.useRef)(i.env.NEXT_PUBLIC_FAIL_IMG),y=(0,a.useState)(w.current),j=y[0],O=y[1],x=(0,a.useState)(!1),P=x[0],R=x[1],N=(0,a.useRef)(null),E=(0,a.useRef)(0);return(0,a.useEffect)(function(){if(!E.current){var e,t,r=document.documentElement.clientHeight,o=document.documentElement.clientWidth;m||null===(e=N.current)||void 0===e||e.classList.add("lazy"),R(!1),N.current&&!(N.current.getBoundingClientRect().top<-N.current.clientHeight||N.current.getBoundingClientRect().top>1.5*r)&&!(N.current.getBoundingClientRect().left<-o||N.current.getBoundingClientRect().left>1.5*o)&&N.current.getBoundingClientRect().width&&N.current.getBoundingClientRect().height&&v&&(m&&(E.current=1),null===(t=N.current)||void 0===t||t.classList.remove("lazy"),O(n))}},[n,v,m]),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("img",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){(0,r.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({className:"".concat(u?"lazy ".concat(u):"lazy"),ref:N,src:j,"data-src":n,alt:"",onLoad:function(){var e;R(!0),n===(null===(e=N.current)||void 0===e?void 0:e.src)&&d(n)},onError:function(){var e;null===(e=N.current)||void 0===e||e.classList.add("lazy"),O(b.current),R(!0)}},g)),P||_]})}},3243:function(e,t,n){"use strict";var r=n(2379),o=n(2999),a=n(7294),c=n(3290),i=n(7989),l=n(3806);n(995);var s=n(4520),u=n.n(s),p=n(5893),d=(0,a.forwardRef)(function(e,t){var n,s=e.pics,d=e.slice,f=void 0===d||d,m=e.onChange,_=void 0===m?function(){}:m,h=e.beforeLoad,v=void 0===h?function(e){return Promise.resolve(e)}:h,g=(0,a.useState)(!1),w=g[0],b=g[1],y=(0,a.useRef)(null),j=(0,a.useState)(0),O=j[0],x=j[1],P=(0,a.useState)(!1),R=P[0],N=P[1],E=(0,c.wo)(".img_swiper_wrap .lazy").emit,S=(0,a.useState)(s||[]),D=S[0],U=S[1],k=(0,a.useRef)({obj:"body",val:0}),I=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;U(e),x(n),y.current?(null===(t=y.current)||void 0===t||t.slideTo(n),setTimeout(function(){b(!0)},300)):setTimeout(function(){var e;null===(e=y.current)||void 0===e||e.slideTo(n),setTimeout(function(){b(!0)},2e3)},500)},Z=function(){U([]),b(!1)};return(0,a.useImperativeHandle)(t,function(){return{open:I,close:Z}}),(0,a.useEffect)(function(){s&&U(s)},[s]),(0,a.useEffect)(function(){N((0,i.tq)())},[]),(0,a.useEffect)(function(){if(w)document.body.scrollTop?k.current={obj:"body",val:document.body.scrollTop}:document.documentElement.scrollTop&&(k.current={obj:"documentElement",val:document.documentElement.scrollTop}),document.body.classList.add("disabled_scroll"),E();else{if(U([]),document.body.classList.remove("disabled_scroll"),!k.current.val)return;document[k.current.obj].scrollTop=k.current.val,k.current.val=0}},[w,E]),(0,p.jsxs)("div",{className:"".concat(u().pic_modal_wrap," ").concat(u().imgs_wrap).concat(w?" flow_up":""),onScroll:function(e){e.stopPropagation()},onWheel:function(e){e.stopPropagation()},children:[(0,p.jsxs)("div",{className:u().swiper_header,children:[(0,p.jsx)("span",{className:u().name,children:(null===(n=D[O])||void 0===n?void 0:n.name)||""}),(0,p.jsx)(l.Z,{type:"close",width:"30",height:"30",fill:"#fff",className:u().close_swiper,onClick:function(){return b(!1)}})]}),(0,p.jsx)(r.tq,{loop:!0,className:u().img_swiper_wrap,onSwiper:function(e){return y.current=e},onSlideChangeTransitionEnd:function(e){x(e.realIndex),_(),E()},children:D.map(function(e,t){return(0,p.jsx)(r.o5,{className:u().pic_wrap,children:(0,p.jsx)(o.Z,{src:f?"https://wsrv.nl/?url=".concat((e.preview_url||e.download_url||"").replace("https://","")).concat(R?"&w=480":"","&n=-1&q=80"):e.cdn_url||"",className:u().pic_item,width:"1920",height:"1080",alt:"bing",beforeLoad:v})},t)})})]})});d.displayName="PicModal",t.Z=d},7167:function(e,t,n){"use strict";n.d(t,{Is:function(){return u},P_:function(){return i},VD:function(){return o},Zb:function(){return l},iS:function(){return c},yJ:function(){return s}});var r,o,a=n(842);(r=o||(o={})).PHOTO="photo",r.PRIVATE="private";var c=function(e){return(0,a.Xv)({path:"/demos/uploadBase64",method:"put",headers:{timestamp:Date.now()},params:e})},i=function(e){return(0,a.Xv)({path:"/demos/uploadUrl",method:"put",headers:{timestamp:Date.now()},params:e})},l=function(e,t){return(0,a.Xv)({path:"/demos/queryPicList",method:"post",params:{path:e,mode:t}})},s=function(e,t){return(0,a.Xv)({path:"/demos/queryPic",method:"post",params:{path:e,mode:t}})},u=function(e){return(0,a.Xv)({path:"/demos/deletePic",method:"post",headers:{timestamp:Date.now()},params:e})}},7620:function(e){e.exports={con_input_wrap:"ImgUpload_con_input_wrap__xRY_s",url_input_wrap:"ImgUpload_url_input_wrap__EYjfX",url_input:"ImgUpload_url_input__6UZJe",enter_icon:"ImgUpload_enter_icon__tQqoz",file_wrap:"ImgUpload_file_wrap__Y6KUl",tmp_wrap:"ImgUpload_tmp_wrap__qh2BV",tmp_item_wrap:"ImgUpload_tmp_item_wrap__6vaH0",tmp_item:"ImgUpload_tmp_item__OKZez",tmp_del_btn:"ImgUpload_tmp_del_btn__jQkY6",tmp_status_btn:"ImgUpload_tmp_status_btn__B5984",submit_btn:"ImgUpload_submit_btn__ijJqD",upload_children_wrap:"ImgUpload_upload_children_wrap__o5VLx"}},4520:function(e){e.exports={pic_modal_wrap:"PicModal_pic_modal_wrap__s7XSv",imgs_wrap:"PicModal_imgs_wrap__zU4_N",pic_wrap:"PicModal_pic_wrap__4Lh_y",pic_item:"PicModal_pic_item__U3ezf",swiper_header:"PicModal_swiper_header__AfNZ0",name:"PicModal_name__lqRKe",img_swiper_wrap:"PicModal_img_swiper_wrap__GPSAD",tmp_status_btn:"PicModal_tmp_status_btn__XWbj3"}}}]);