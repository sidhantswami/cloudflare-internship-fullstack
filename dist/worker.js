!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){addEventListener("fetch",e=>{e.respondWith(async function(e){var t=await fetch("https://cfw-takehome.developers.workers.dev/api/variants");const{variants:n}=await t.json(),o=n[0],r=n[1],a=e.headers.get("cookie");a&&a.split("=")[1]==o&&(t=await fetch(o),console.log("cookie variant 1 used"));if(a&&a.split("=")[1]==r)t=await fetch(r),console.log("cookie variant 2 used");else{let e=n[Math.round(Math.random())];t=await fetch(e),(t=new Response(t.body,t)).headers.append("Set-Cookie","url_variant="+e),console.log("new cookie set")}return t}(e.request))})}]);