(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[745],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=s,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,o=(0,n(1598).Z)(n(7294)),u=a(n(1585)),i=n(8e3),d=n(5850),c=n(9470);function s(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var l=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,a,u,i,d=t.inAmpMode;return e.reduce(f,[]).reverse().concat(s(d).reverse()).filter((n=new Set,a=new Set,u=new Set,i={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var o=e.key.slice(e.key.indexOf("$")+1);n.has(o)?t=!1:n.add(o)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var d=0,c=l.length;d<c;d++){var s=l[d];if(e.props.hasOwnProperty(s)){if("charSet"===s)u.has(s)?t=!1:u.add(s);else{var f=e.props[s],p=i[s]||new Set;("name"!==s||!r)&&p.has(f)?t=!1:(p.add(f),i[s]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!d&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,o.default.cloneElement(e,a)}return o.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=o.useContext(i.AmpStateContext),r=o.useContext(d.HeadManagerContext);return o.default.createElement(u.default,{reduceComponentsToState:p,headManager:r,inAmpMode:c.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,i=e.reduceComponentsToState;function d(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(i(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),d()),o(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),o(function(){return n&&(n._pendingUpdate=d),function(){n&&(n._pendingUpdate=d)}}),u(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,o=r.useLayoutEffect,u=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},3353:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return c},default:function(){return s}});var r=n(9008),a=n.n(r),o=n(7294),u=n(9545),i=n.n(u),d=n(5893),c=!0;function s(){var e=(0,o.useState)(!1),t=e[0],n=e[1];return(0,o.useEffect)(function(){n(!0)},[]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(a(),{children:[(0,d.jsx)("title",{children:"Demos"}),(0,d.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,d.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,d.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,d.jsx)("main",{children:(0,d.jsx)("div",{className:i().game_2048_wrap,children:t&&(0,d.jsx)("iframe",{className:i().fire_wrap,src:"https://empty.t-n.top/html/2048.html"})})})]})}},8200:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos/2048",function(){return n(3353)}])},9545:function(e){e.exports={game_2048_wrap:"__2048_game_2048_wrap__ms0RB",fire_wrap:"__2048_fire_wrap__ODWRY"}},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8200)}),_N_E=e.O()}]);