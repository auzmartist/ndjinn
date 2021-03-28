var __assign=Object.assign;!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).core={})}(this,(function(n){"use strict";var t,e=new Uint8Array(16);function o(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}var i=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function r(n){return"string"==typeof n&&i.test(n)}for(var s,u=[],a=0;a<256;++a)u.push((a+256).toString(16).substr(1));function c(n,t,e){var i=(n=n||{}).random||(n.rng||o)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t){e=e||0;for(var s=0;s<16;++s)t[e+s]=i[s];return t}return function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=(u[n[t+0]]+u[n[t+1]]+u[n[t+2]]+u[n[t+3]]+"-"+u[n[t+4]]+u[n[t+5]]+"-"+u[n[t+6]]+u[n[t+7]]+"-"+u[n[t+8]]+u[n[t+9]]+"-"+u[n[t+10]]+u[n[t+11]]+u[n[t+12]]+u[n[t+13]]+u[n[t+14]]+u[n[t+15]]).toLowerCase();if(!r(e))throw TypeError("Stringified UUID is invalid");return e}(i)}n.DT=void 0,(s=n.DT||(n.DT={})).any="any",s.str="string",s.num="number",s.obj="object",s.uint8="uint8",s.vec2="vec2",s.vec3="vec3",s.rgb="rgb",s.rgba="rgba",s.hsl="hsl",s.hsla="hsla",s.vec4="vec4",s.mat2="mat2",s.mat3="mat3",s.mat4="mat4";const p=n=>[...Array(n).keys()];n.create=function(t,e,o){const i=function(t,e){var o;const i=(null==e?void 0:e.inputTypes)||(null==(o=p(t.length))?void 0:o.map((t=>n.DT.any))),r=(null==e?void 0:e.outputTypes)||[];return(...n)=>{var e,o;let s=t(...n)||[];return s.__inputs__=null==(e=p(t.length))?void 0:e.map(((t,e)=>i[e]||typeof n[e])),s.__outputs__=null==(o=p(s.length))?void 0:o.map(((n,t)=>r[t]||typeof s[t])),s}}(t,{inputTypes:(o=__assign({in:[],out:[]},o||{})).in.map((n=>n.type)),outputTypes:o.out.map((n=>n.type))}),r=i(...e);let s=e.map(((n,t)=>__assign(__assign({},o.in[t]),{value:n,connected:[]}))),u=r.map(((n,t)=>__assign(__assign({},o.out[t]),{value:n,connected:[]})));const a=n=>s.findIndex((t=>t.name===n));let d=new Proxy(s,(n=>({set:(t,e,o)=>{try{t[e]=o}catch(i){return!1}finally{return n(o),!0}}}))((()=>_())));const f={},l=[],g={id:c(),inputs:s,outputs:u,run:_,set:y,pipe:function(n,t=m){return f[n.id]={node:n,pipe:t},g.outputs.forEach(((t,e)=>{t.connected.find((t=>t.id===n.id&&t.port===e))||t.connected.push({id:n.id,port:e})})),n.inputs.forEach(((n,t)=>{n.connected.find((n=>n.id===g.id&&n.port===t))||n.connected.push({id:g.id,port:t})})),g.run(),n},connect:function(n,t,e){f[`${t.id}:${e}`]={node:t,pipe:(...t)=>({[e]:t[n]})};const o=g.outputs[n].connected;o.find((n=>n.id===t.id&&n.port===e))||o.push({id:t.id,port:e});const i=t.inputs[e].connected;i.find((t=>t.id===g.id&&t.port===n))||i.push({id:g.id,port:n});return g.run(),l.forEach((n=>n(g))),g},disconnect:function(n,t,e){delete f[`${t.id}:${e}`];const o=g.outputs[n].connected,i=o.findIndex((n=>n.id===t.id&&n.port===e));i>-1&&(o.splice(i,1),t.inputs[e].connected=[]);return t.reset(e),g},reset:function(n){let t=isNaN(parseInt(n))?a(n):n;y({[t]:e[t]})},subscribe:function(n){return l.push(n),l.length-1},unsubscribe:function(n){return!(n>l.length)&&(l.splice(n,1),!0)}};function _(n=s.map((n=>n.value))){const t=i(...n);return Object.assign(u,t.map(((n,t)=>__assign(__assign({},u[t]),{value:n})))),Object.values(f).forEach((({node:n,pipe:e})=>n.set(e(...t)))),l.forEach((n=>n(g))),g}function y(n){return Array.isArray(n)?Object.assign(d,n.map(((n,t)=>__assign(__assign({},s[t]),{value:n})))):"object"==typeof n?Object.entries(n).forEach((([n,t])=>{let e=isNaN(parseInt(n))?a(n):n;if(!(e>-1))throw new Error(`Unrecognized input name '${n}'.`);d[e]=__assign(__assign({},s[e]),{value:t})})):"function"==typeof n?Object.assign(d,n(...s.map((n=>n.value))).map(((n,t)=>__assign(__assign({},s[t]),{value:n})))):Object.assign(d,[n].map(((n,t)=>__assign(__assign({},s[t]),{value:n})))),l.forEach((n=>n(g))),g}const m=(...n)=>[...n];return g},Object.defineProperty(n,"__esModule",{value:!0}),n[Symbol.toStringTag]="Module"}));
