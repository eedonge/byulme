(function(e,t,n,r){typeof define=="function"&&define.amd?define(["blackbird"],function(e){return r(t,e)}):e.Logging=r(t,n)})(window,console,log,function(e,t){return{options:{defaultLevel:"debug",debug:"console",info:"console",warn:"console",error:"console",time:"console"},timers:{},config:function(e){if(!e)return;e.defaultLevel&&(this.options.defaultLevel=e.defaultLevel),e.debug&&(this.options.debug=e.debug),e.info&&(this.options.info=e.info),e.warn&&(this.options.warn=e.warn),e.error&&(this.options.error=e.error),e.time&&(this.options.time=e.time),(e.debug=="screen"||e.info=="screen"||e.warn=="screen"||e.error=="screen"||e.time=="screen")&&t.init()},doLog:function(n,r){n=n||this.options.defaultLevel;switch(this.options[n]){case"console":switch(n){case"debug":e.debug?e.debug(r):e.log(r);break;case"info":e.info(r);break;case"warn":e.warn(r);break;case"error":e.error(r)}break;case"screen":t.init(),r===null&&(r="null"),r===undefined&&(r="undefined");switch(n){case"debug":t.debug(r);break;case"info":t.info(r);break;case"warn":t.warn(r);break;case"error":t.error(r)}}},debug:function(e){this.doLog("debug",e)},info:function(e){this.doLog("info",e)},warn:function(e){this.doLog("warn",e)},error:function(e){this.doLog("error",e)},log:function(e){this.doLog(null,e)},time:function(n){this.options.time=="console"?e.time?e.time(n):(this.timers[n]=new Date,e.log(n)):this.options.time=="screen"&&(t.init(),t.profile(n))},timeEnd:function(n){this.options.time=="console"?e.time?e.timeEnd(n):this.timers[n]&&(e.log(n+": "+((new Date).getTime()-this.timers[n].getTime())+"ms"),delete this.timers[n]):this.options.time=="screen"&&(t.init(),t.profile(n))}}})