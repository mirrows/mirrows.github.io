(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[197],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var a=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=a},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,a=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==a&&a}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=s,t.default=void 0;var a=n(6495).Z,r=n(2648).Z,i=(0,n(1598).Z)(n(7294)),o=r(n(1585)),u=n(8e3),d=n(5850),c=n(9470);function s(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function l(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var f=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,r,o,u,d=t.inAmpMode;return e.reduce(l,[]).reverse().concat(s(d).reverse()).filter((n=new Set,r=new Set,o=new Set,u={},function(e){var t=!0,a=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){a=!0;var i=e.key.slice(e.key.indexOf("$")+1);n.has(i)?t=!1:n.add(i)}switch(e.type){case"title":case"base":r.has(e.type)?t=!1:r.add(e.type);break;case"meta":for(var d=0,c=f.length;d<c;d++){var s=f[d];if(e.props.hasOwnProperty(s)){if("charSet"===s)o.has(s)?t=!1:o.add(s);else{var l=e.props[s],p=u[s]||new Set;("name"!==s||!a)&&p.has(l)?t=!1:(p.add(l),u[s]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!d&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var r=a({},e.props||{});return r["data-href"]=r.href,r.href=void 0,r["data-optimized-fonts"]=!0,i.default.cloneElement(e,r)}return i.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=i.useContext(u.AmpStateContext),a=i.useContext(d.HeadManagerContext);return i.default.createElement(o.default,{reduceComponentsToState:p,headManager:a,inAmpMode:c.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,u=e.reduceComponentsToState;function d(){if(n&&n.mountedInstances){var t=a.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(u(t,e))}}return r&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),d()),i(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),i(function(){return n&&(n._pendingUpdate=d),function(){n&&(n._pendingUpdate=d)}}),o(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var a=(0,n(1598).Z)(n(7294)),r=!1,i=a.useLayoutEffect,o=r?function(){}:a.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},5274:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return s},default:function(){return l}});var a=n(9008),r=n.n(a),i=n(1664),o=n.n(i),u=n(9521),d=n(5893),c=u.ZP.div.withConfig({displayName:"sc-404__DIV",componentId:"sc-146ka26-0"})(["&.wrap{width:fit-content;margin:10vh auto;text-align:center;}.img{max-width:100%;height:unset;max-height:60vh;object-fit:contain;}.back{display:block;text-shadow:0 0 10px gray;font-weight:bold;font-size:6vh;color:#fff}"]),s=!0;function l(){return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(r(),{children:[(0,d.jsx)("title",{children:"404"}),(0,d.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,d.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsx)("main",{children:(0,d.jsxs)(c,{className:"wrap",children:[(0,d.jsx)("img",{className:"img",width:"800",height:"600",src:"https://empty.t-n.top/pub_lic/2023_07_06/pic1688608901221777.gif",alt:"404"}),(0,d.jsx)(o(),{href:"/",className:"back","aria-label":"back to homepage",children:"BACK"})]})})]})}},9305:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/404",function(){return n(5274)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=9305)}),_N_E=e.O()}]);