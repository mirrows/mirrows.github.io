(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[528],{8e3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AmpStateContext=void 0;var r=(0,n(2648).Z)(n(7294)).default.createContext({});t.AmpStateContext=r},9470:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isInAmpMode=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=e.hybrid,r=e.hasQuery;return void 0!==t&&t||void 0!==n&&n&&void 0!==r&&r}},2717:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultHead=s,t.default=void 0;var r=n(6495).Z,a=n(2648).Z,i=(0,n(1598).Z)(n(7294)),o=a(n(1585)),d=n(8e3),u=n(5850),c=n(9470);function s(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function l(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce(function(e,t){return"string"==typeof t||"number"==typeof t?e:e.concat(t)},[])):e.concat(t)}n(6065);var f=["name","httpEquiv","charSet","itemProp"];function p(e,t){var n,a,o,d,u=t.inAmpMode;return e.reduce(l,[]).reverse().concat(s(u).reverse()).filter((n=new Set,a=new Set,o=new Set,d={},function(e){var t=!0,r=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){r=!0;var i=e.key.slice(e.key.indexOf("$")+1);n.has(i)?t=!1:n.add(i)}switch(e.type){case"title":case"base":a.has(e.type)?t=!1:a.add(e.type);break;case"meta":for(var u=0,c=f.length;u<c;u++){var s=f[u];if(e.props.hasOwnProperty(s)){if("charSet"===s)o.has(s)?t=!1:o.add(s);else{var l=e.props[s],p=d[s]||new Set;("name"!==s||!r)&&p.has(l)?t=!1:(p.add(l),d[s]=p)}}}}return t})).reverse().map(function(e,t){var n=e.key||t;if(!u&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(function(t){return e.props.href.startsWith(t)})){var a=r({},e.props||{});return a["data-href"]=a.href,a.href=void 0,a["data-optimized-fonts"]=!0,i.default.cloneElement(e,a)}return i.default.cloneElement(e,{key:n})})}t.default=function(e){var t=e.children,n=i.useContext(d.AmpStateContext),r=i.useContext(u.HeadManagerContext);return i.default.createElement(o.default,{reduceComponentsToState:p,headManager:r,inAmpMode:c.isInAmpMode(n)},t)},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1585:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t,n=e.headManager,d=e.reduceComponentsToState;function u(){if(n&&n.mountedInstances){var t=r.Children.toArray(Array.from(n.mountedInstances).filter(Boolean));n.updateHead(d(t,e))}}return a&&(null==n||null==(t=n.mountedInstances)||t.add(e.children),u()),i(function(){var t;return null==n||null==(t=n.mountedInstances)||t.add(e.children),function(){var t;null==n||null==(t=n.mountedInstances)||t.delete(e.children)}}),i(function(){return n&&(n._pendingUpdate=u),function(){n&&(n._pendingUpdate=u)}}),o(function(){return n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null),function(){n&&n._pendingUpdate&&(n._pendingUpdate(),n._pendingUpdate=null)}}),null};var r=(0,n(1598).Z)(n(7294)),a=!1,i=r.useLayoutEffect,o=a?function(){}:r.useEffect},6065:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.warnOnce=void 0,t.warnOnce=function(e){}},863:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(9008),a=n.n(r),i=n(9521),o=n(5893),d=i.ZP.div.withConfig({displayName:"demos__DIV",componentId:"sc-x0qut9-0"})(["overflow:hidden;.fire_wrap{position:fixed;width:100%;height:100%;vertical-align:bottom;z-index:-1;}"]);function u(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(a(),{children:[(0,o.jsx)("title",{children:"Demos"}),(0,o.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,o.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,o.jsx)("main",{children:(0,o.jsx)(d,{children:(0,o.jsx)("iframe",{className:"fire_wrap",src:"https://empty.t-n.top/html/WebGL%20Fluid%20Simulation.html"})})})]})}},3347:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demos",function(){return n(863)}])},9008:function(e,t,n){e.exports=n(2717)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=3347)}),_N_E=e.O()}]);