!function e(t,n,s){function a(r,i){if(!n[r]){if(!t[r]){var u="function"==typeof require&&require;if(!i&&u)return u(r,!0);if(o)return o(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[r]={exports:{}};t[r][0].call(l.exports,function(e){return a(t[r][1][e]||e)},l,l.exports,e,t,n,s)}return n[r].exports}for(var o="function"==typeof require&&require,r=0;r<s.length;r++)a(s[r]);return a}({"/Users/Joseph/Sites/small/stems/node_modules/@artcommacode/q/index.js":[function(e,t,n){"use strict";function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(n,"__esModule",{value:!0});var a=function(e){return[].concat(s(e))},o=function(e){return e[0]},r=function(e){throw new Error('"'+String(e)+"\" does't exist in the document")},i=function(e){return e?document&&document.body&&document.body.contains(e)?e:r(e):document},u=n.query=function(e,t){var n=i(t);return n?a(n.querySelectorAll(e)):[]};n.queryOne=function(e,t){return o(u(e,t))}},{}],"/Users/Joseph/Sites/small/stems/src/js/components/Button.js":[function(e,t,n){"use strict";function s(e,t,n){var s={};return s.element=e,s.enable=function(){s.enabled=!0,s.element.classList.add("enabled")},s.disable=function(){s.enabled=!1,s.element.classList.remove("enabled")},s.toggleEnabled=function(){s.enabled?s.disable():s.enable()},s.activate=function(){s.enabled||s.enable(),s.active=!0,s.element.classList.add("active")},s.deactivate=function(){s.active=!1,s.element.classList.remove("active")},s.toggleActive=function(e){s.active=e||!s.active,!0===s.active?s.activate():s.deactivate()},n.subscribe("enableButtons",function(e){t<=e-1?(s.enable(),s.activate()):(s.disable(),s.deactivate())}),s.element.addEventListener("click",function(){s.toggleActive();var e=s.active?"stemActivated":"stemDeactivated";n.emit(e,t)}),s}Object.defineProperty(n,"__esModule",{value:!0}),n.default=s},{}],"/Users/Joseph/Sites/small/stems/src/js/components/Stem.js":[function(e,t,n){"use strict";function s(e){var t={};return t.audio=new Audio,t.load=function(n){t.fileName=e.replace(/\/$/).split("/").pop();var s=new XMLHttpRequest;s.open("GET",encodeURI(e),!0),s.setRequestHeader("Content-Type","application/json"),s.responseType="blob",s.onload=function(e){var a=new Blob([s.response],{type:"audio/mp3"}),o=URL.createObjectURL(a);t.audio.src=o,t.audio.onload=function(){URL.revokeObjectURL(o)},t.ready=!0;var r=200!==e.target.status&&e.target.status+" "+e.target.statusText;n(r)},s.send()},t.play=function(){console.log("playing "+t.fileName),t.ready&&(t.unmute(),t.audio.play()),t.active=!0;try{t.audio.play()}catch(e){}},t.reset=function(){t.stop(),t.audio.volume=1},t.stop=function(){t.active=!1,t.audio.pause(),t.audio.currentTime=0},t.unmute=function(){t.active=!0,t.audio.volume=1},t.mute=function(){t.active=!1,t.audio.volume=0},t}Object.defineProperty(n,"__esModule",{value:!0}),e("@artcommacode/q"),n.default=s},{"@artcommacode/q":"/Users/Joseph/Sites/small/stems/node_modules/@artcommacode/q/index.js"}],"/Users/Joseph/Sites/small/stems/src/js/components/Track.js":[function(e,t,n){"use strict";function s(e,t,n){function s(e){p+=1,e&&(c.hasError=!0,c.element.classList.add("has-errors")),p===f.length&&(c.isLoaded=!0,c.element.classList.remove("loading"),c.element.classList.add("loaded"),m&&c.play())}function o(){c.isLoaded?c.play():c.load()}function i(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0",s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"right",a=e.toString(),o=t-e.length,r=0;r<o;r+=1)"right"===s?a+=n:a=n+a;return a}function u(e,t,n){var s=e.toString().split(".");return 1===s.length&&s.push("0"),i(s[0],t,"0","left")+"."+i(s[1],n,"0","right").substr(0,n)}var c={};c.element=e;var l=JSON.parse(c.element.getAttribute("data-stems")),d=c.element.hasAttribute("autoload")&&"false"!==c.element.getAttribute("autoload"),m=c.element.hasAttribute("autoplay")&&"false"!==c.element.getAttribute("autoplay");console.log(d,m);var f=[],p=0;l.map(function(e){var t=(0,r.default)(e);f.push(t)}),c.load=function(){c.element.classList.add("loading"),f.map(function(e){return e.load(s)})},c.play=function(){n.emit("trackPlayed",t),c.active=!0,f.map(function(e){return e.play()}),n.emit("enableButtons",f.length),c.element.classList.add("playing")},c.stop=function(){c.active=!1,f.map(function(e){return e.reset()}),n.emit("enableButtons",f.length),c.element.classList.remove("playing")},c.element.addEventListener("click",o),n.subscribe("trackPlayed",function(e){e!==t&&(c.active=!1,c.stop())}),n.subscribe("stemActivated",function(e){c.active&&f[e].unmute()}),n.subscribe("stemDeactivated",function(e){c.active&&f[e].mute()}),n.subscribe("allStemsActivated",function(){c.active&&(f.map(function(e){return e.play()}),n.emit("enableButtons",f.length))}),d&&c.load();var v=(0,a.queryOne)("#debug-output");return n.subscribe("trackPlayed",function(){v.innerHTML=""}),setInterval(function(){if(c.active){var e=["*******"],t=void 0,n=void 0;f.map(function(s,a){if(s.audio){var o=s.active?"activated":"deactivated",r=Math.round(1e4*s.audio.currentTime)/1e4,i=u(r,3,4);t=t?Math.min(t,r):r,n=n?Math.max(n,r):r,0===r&&s.audio.play(),e.push("   stem "+a+": "+i+" | "+s.fileName+" - "+o+" | "+s.audio.buffered.end(0)+" / "+s.audio.duration)}});var s=u(n-t,1,6);e.push("   max diff: "+s),v.innerHTML=e.join("<br>")}},100),c.stemsCount=f.length,c}Object.defineProperty(n,"__esModule",{value:!0});var a=e("@artcommacode/q"),o=e("./Stem"),r=function(e){return e&&e.__esModule?e:{default:e}}(o);n.default=s},{"./Stem":"/Users/Joseph/Sites/small/stems/src/js/components/Stem.js","@artcommacode/q":"/Users/Joseph/Sites/small/stems/node_modules/@artcommacode/q/index.js"}],"/Users/Joseph/Sites/small/stems/src/js/components/publisher.js":[function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t}}(),o=function(){function e(){s(this,e),this.listeners=new Map}return a(e,[{key:"subscribe",value:function(e,t){this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).push(t)}},{key:"unsubscribe",value:function(e,t){var n=this.listeners.get(e),s=void 0;return!!(n&&n.length&&(s=n.reduce(function(e,t,n){},-1))>-1)&&(n.splice(s,1),this.listeners.set(e,n),!0)}},{key:"emit",value:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];var a=this.listeners.get(e);return!(!a||!a.length||(a.forEach(function(e){e.apply(void 0,n)}),0))}}]),e}(),r=new o;n.default=r},{}],"/Users/Joseph/Sites/small/stems/src/js/stems.js":[function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var a=e("@artcommacode/q"),o=e("./components/publisher"),r=s(o),i=e("./components/Track"),u=s(i),c=e("./components/Button"),l=s(c),d=(0,a.query)(".stem-track"),m=(0,a.queryOne)(".stem-button--play-all")||!1,f=[],p=[];d.map(function(e,t){var n=(0,u.default)(e,t,r.default);p.push(n)}),(0,a.query)(".stem-buttons .stem-button").map(function(e,t){var n=(0,l.default)(e,t,r.default);f.push(n)}),m&&m.addEventListener("click",function(){r.default.emit("allStemsActivated")})},{"./components/Button":"/Users/Joseph/Sites/small/stems/src/js/components/Button.js","./components/Track":"/Users/Joseph/Sites/small/stems/src/js/components/Track.js","./components/publisher":"/Users/Joseph/Sites/small/stems/src/js/components/publisher.js","@artcommacode/q":"/Users/Joseph/Sites/small/stems/node_modules/@artcommacode/q/index.js"}]},{},["/Users/Joseph/Sites/small/stems/src/js/stems.js"]);
//# sourceMappingURL=stems.js.map
