!function(e){function r(r){for(var n,u,l=r[0],c=r[1],i=r[2],p=0,f=[];p<l.length;p++)u=l[p],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&f.push(o[u][0]),o[u]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(s&&s(r);f.length;)f.shift()();return a.push.apply(a,i||[]),t()}function t(){for(var e,r=0;r<a.length;r++){for(var t=a[r],n=!0,l=1;l<t.length;l++){var c=t[l];0!==o[c]&&(n=!1)}n&&(a.splice(r--,1),e=u(u.s=t[0]))}return e}var n={},o={0:0},a=[];function u(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=e,u.c=n,u.d=function(e,r,t){u.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,r){if(1&r&&(e=u(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)u.d(t,n,function(r){return e[r]}.bind(null,n));return t},u.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(r,"a",r),r},u.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},u.p="/";var l=window.webpackJsonp=window.webpackJsonp||[],c=l.push.bind(l);l.push=r,l=l.slice();for(var i=0;i<l.length;i++)r(l[i]);var s=c;a.push([7,1]),t()}({7:function(e,r,t){"use strict";t.r(r);var n=t(1),o=(t(3),{name:"app",components:{}}),a=t(2),u=Object(a.a)(o,(function(){var e=this.$createElement,r=this._self._c||e;return r("a-scene",{attrs:{"vr-mode-ui":"enabled: false",embedded:"",arjs:"sourceType: webcam; debugUIEnabled: false;"}},[r("a-box",{attrs:{position:"-1 0.5 -3",rotation:"0 45 0",color:"#4CC3D9"}})],1)}),[],!1,null,null,null).exports;n.a.config.ignoredElements=["a-scene","a-entity","a-camera","a-box","a-sky","a-assets","a-marker","a-marker-camera"],new n.a({render:function(e){return e(u)}}).$mount("#app")}});