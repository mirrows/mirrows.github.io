(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[521],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=c,t.default=void 0;var r=n(6495).Z,o=n(2648).Z,a=(0,n(1598).Z)(n(7294)),i=o(n(1585)),d=n(8e3),l=n(5850),p=n(9470);function c(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var s=["name","httpEquiv","charSet","itemProp"];function f(e,t){var n,o,i,d,l=t.inAmpMode;return e.reduce(u,[]).reverse().concat(c(l).reverse()).filter((n=new Set,o=new Set,i=new Set,d={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var a=e.key.slice(e.key.indexOf("$")+1);n.has(a)?t=!1:n.add(a)}switch(e.type){case"title":case"base":o.has(e.type)?t=!1:o.add(e.type);break;case"meta":for(var l=0,p=s.length;l<p;l++){var c=s[l];if(e.props.hasOwnProperty(c)){if("charSet"===c)i.has(c)?t=!1:i.add(c);else{var u=e.props[c],f=d[c]||new Set;("name"!==c||!r)&&f.has(u)?t=!1:(f.add(u),d[c]=f)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!l&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var o=r({},e.props||{});return o["data-href"]=o.href,o.href=void 0,o["data-optimized-fonts"]=!0,a.default.cloneElement(e,o)}return a.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=a.useContext(d.AmpStateContext),r=a.useContext(l.HeadManagerContext);return a.default.createElement(i.default,{reduceComponentsToState:f,headManager:r,inAmpMode:p.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,d=e.reduceComponentsToState;function l(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(d(t,e))}}return o&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),l()),a(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),a(function(){return n&&(n._pendingUpdate=l),function(){n&&(n._pendingUpdate=l)}}),i(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),o=!1,a=r.useLayoutEffect,i=o?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},1369:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c},default:function(){return u}});var r=n(9008),o=n.n(r),a=n(7294),i=n(9521),d=n(5893),l=i.ZP.div.withConfig({displayName:"about__DIV",componentId:"sc-1rlodvf-0"})(["position:fixed;top:0;bottom:0;left:0;right:0;z-index:-1;"]),p=i.ZP.div.withConfig({displayName:"about__BlogContent",componentId:"sc-1rlodvf-1"})(['position:absolute;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;margin:60px auto;color:#fff;line-height:1.2;pointer-events:none;vertical-align:bottom;.blog_wrap{padding:10px;margin:5px;background-color:rgba(200,200,200,.5);box-sizing:border-box;border-radius:8px;}.blog_left{display:flex;flex-direction:column;flex:1 1 680px;max-width:680px;overflow:hidden;}.add_comment{pointer-events:all;}.text_area{width:100%;padding:10px;background-color:rgba(255,255,255,.8);border:none;box-sizing:border-box;border-radius:6px;vertical-align:bottom;resize:none;outline:none;font-size:16px;}.operate_wrap{display:flex;justify-content:space-between;.preview{width:24px;height:24px;padding:0 2px;margin:0 4px;vertical-align:middle;cursor:pointer;&:hover{background-color:rgba(200,200,200,.5);border-radius:4px;}}.submit{padding:4px 16px;font-weight:bold;margin-bottom:10px;background-color:#fff;border:none;border-radius:4px;font-size:14px;color:#000;cursor:pointer;}}.blog_content{padding:10px;box-sizing:border-box;border-radius:8px;pointer-events:all;}.blog_content,.comment_detail{blockquote{padding:4px 0 4px 1em;margin:0;margin-bottom:8px;border-left:4px solid gray;white-space:normal;background-color:#5c5c5c;border-radius:0 6px 6px 0;opacity:0.8;font-size:14px;p{margin:0;line-height:1.2;}}p{margin:0 0 10px;;white-space:pre-wrap;line-height:1.5;word-break:break-all;}a{pointer-events:all;}img{max-width:100%;}table{border-collapse:collapse;}table th,table td{min-width:80px;padding:4px;border:1px solid #000;}ul{margin:10px 0;}ul li:before{content:"⚪";float:left;margin-right:10px;font-weight:900;}code{background-color:#f5f5f5;overflow:auto;color:#000;}pre{padding:10px;background-color:#f5f5f5;overflow:auto;border-radius:8px;color:#000;}pre{&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}}.preview_detail_wrap{max-height:160px;overflow:auto;}.preview_detail{pointer-events:none;}.preview_detail_wrap,.text_area,.comment_detail{pointer-events:all;&::-webkit-scrollbar{width:8px;height:8px;}&::-webkit-scrollbar-thumb{border-radius:10px;background:#a5a5a5;}}.comments_wrap{display:flex;flex-direction:column;min-width:240px;margin:5px;position:sticky;top:40px;max-height:calc(100vh - 80px);overflow:auto;&::-webkit-scrollbar{display:none;}}.avator{width:36px;height:36px;margin-right:10px;border-radius:4px;}.author_msg{display:flex;padding:5px;box-shadow:0px 5px 10px -5px #999;}.comment_content_wrap{background-color:rgba(200,200,200,.5);border-radius:5px;margin-bottom:10px;pointer-events:all;.comment_detail_wrap{padding:10px;}.comment_detail{max-height:400px;overflow:auto;}}@media (min-width:680px){.comment_detail{max-width:400px;}}.text_small{font-size:12px;color:#c1c1c1;}@media (max-width:680px){display:block;.comments_wrap{max-height:unset;}}']),c=!0;function u(e){var t=e.artical;e.comments;var n=(0,a.useState)(t),r=n[0];return n[1],(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(o(),{children:[(0,d.jsx)("title",{children:"about"}),(0,d.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,d.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsxs)("main",{children:[(0,d.jsx)(l,{id:"test"}),(0,d.jsx)(p,{children:(0,d.jsx)("span",{style:{color:"#000"},children:(null==r?void 0:r.body)||""})})]})]})}},8318:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/about",function(){return n(1369)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8318)}),_N_E=e.O()}]);