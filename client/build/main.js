!function(e){var t={};function i(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){const a=i(1);i(2);window.onload=async function(){const e=document.getElementById("uploader"),t=document.getElementById("progress--loaded"),i=document.getElementById("fileBox"),n=new a({target:"http://192.168.99.100:3000/"});n.assignBrowse(e),n.cancel(),n.on("chunkingComplete",()=>n.upload()),n.on("progress",()=>{t.style.width=(240*n.progress()).toFixed(0)+"px"}),n.on("fileSuccess",()=>{r(),t.style.width="0px"});const r=async()=>{for(;i.firstChild;)i.removeChild(i.firstChild);const e=await fetch("http://192.168.99.100:3000/allFiles");(await e.json()).forEach(e=>{const t=document.createElement("div");t.classList.add("file");const a=document.createElement("span");a.textContent=e.slice(6),a.classList.add("filename"),t.appendChild(a);const n=document.createElement("button");n.classList.add("download"),n.textContent="Download",t.appendChild(n),i.appendChild(t),n.addEventListener("click",()=>{fetch(`http://192.168.99.100:3000/download?filename=${e}`).then(e=>e.blob()).then(t=>{const i=document.createElement("a");document.body.appendChild(i),i.style="display:none";const a=window.URL.createObjectURL(t);i.href=a,i.download=e,i.click(),window.URL.revokeObjectURL(a),document.body.removeChild(i)})})})};n.on("fileError",(e,t)=>alert(t)),r()}},function(e,t,i){!function(){"use strict";var t=function(e){if(!(this instanceof t))return new t(e);if(this.version=1,this.support=!("undefined"==typeof File||"undefined"==typeof Blob||"undefined"==typeof FileList||!Blob.prototype.webkitSlice&&!Blob.prototype.mozSlice&&!Blob.prototype.slice),!this.support)return!1;var i=this;i.files=[],i.defaults={chunkSize:1048576,forceChunkSize:!1,simultaneousUploads:3,fileParameterName:"file",chunkNumberParameterName:"resumableChunkNumber",chunkSizeParameterName:"resumableChunkSize",currentChunkSizeParameterName:"resumableCurrentChunkSize",totalSizeParameterName:"resumableTotalSize",typeParameterName:"resumableType",identifierParameterName:"resumableIdentifier",fileNameParameterName:"resumableFilename",relativePathParameterName:"resumableRelativePath",totalChunksParameterName:"resumableTotalChunks",throttleProgressCallbacks:.5,query:{},headers:{},preprocess:null,method:"multipart",uploadMethod:"POST",testMethod:"GET",prioritizeFirstAndLastChunk:!1,target:"/",testTarget:null,parameterNamespace:"",testChunks:!0,generateUniqueIdentifier:null,getTarget:null,maxChunkRetries:100,chunkRetryInterval:void 0,permanentErrors:[400,404,415,500,501],maxFiles:void 0,withCredentials:!1,xhrTimeout:0,clearInput:!0,chunkFormat:"blob",setChunkTypeFromFile:!1,maxFilesErrorCallback:function(e,t){var a=i.getOpt("maxFiles");alert("Please upload no more than "+a+" file"+(1===a?"":"s")+" at a time.")},minFileSize:1,minFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too small, please upload files larger than "+a.formatSize(i.getOpt("minFileSize"))+".")},maxFileSize:void 0,maxFileSizeErrorCallback:function(e,t){alert(e.fileName||e.name+" is too large, please upload files less than "+a.formatSize(i.getOpt("maxFileSize"))+".")},fileType:[],fileTypeErrorCallback:function(e,t){alert(e.fileName||e.name+" has type not allowed, please upload files of type "+i.getOpt("fileType")+".")}},i.opts=e||{},i.getOpt=function(e){var i=this;if(e instanceof Array){var n={};return a.each(e,function(e){n[e]=i.getOpt(e)}),n}if(i instanceof m){if(void 0!==i.opts[e])return i.opts[e];i=i.fileObj}if(i instanceof c){if(void 0!==i.opts[e])return i.opts[e];i=i.resumableObj}if(i instanceof t)return void 0!==i.opts[e]?i.opts[e]:i.defaults[e]},i.events=[],i.on=function(e,t){i.events.push(e.toLowerCase(),t)},i.fire=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);var a=e[0].toLowerCase();for(t=0;t<=i.events.length;t+=2)i.events[t]==a&&i.events[t+1].apply(i,e.slice(1)),"catchall"==i.events[t]&&i.events[t+1].apply(null,e);"fileerror"==a&&i.fire("error",e[2],e[1]),"fileprogress"==a&&i.fire("progress")};var a={stopEvent:function(e){e.stopPropagation(),e.preventDefault()},each:function(e,t){if(void 0!==e.length){for(var i=0;i<e.length;i++)if(!1===t(e[i]))return}else for(i in e)if(!1===t(i,e[i]))return},generateUniqueIdentifier:function(e,t){var a=i.getOpt("generateUniqueIdentifier");if("function"==typeof a)return a(e,t);var n=e.webkitRelativePath||e.fileName||e.name;return e.size+"-"+n.replace(/[^0-9a-zA-Z_-]/gim,"")},contains:function(e,t){var i=!1;return a.each(e,function(e){return e!=t||(i=!0,!1)}),i},formatSize:function(e){return e<1024?e+" bytes":e<1048576?(e/1024).toFixed(0)+" KB":e<1073741824?(e/1024/1024).toFixed(1)+" MB":(e/1024/1024/1024).toFixed(1)+" GB"},getTarget:function(e,t){var a=i.getOpt("target");if("test"===e&&i.getOpt("testTarget")&&(a="/"===i.getOpt("testTarget")?i.getOpt("target"):i.getOpt("testTarget")),"function"==typeof a)return a(t);var n=a.indexOf("?")<0?"?":"&";return a+n+t.join("&")}},n=function(e){a.stopEvent(e),e.dataTransfer&&e.dataTransfer.items?s(e.dataTransfer.items,e):e.dataTransfer&&e.dataTransfer.files&&s(e.dataTransfer.files,e)},r=function(e){e.preventDefault()};function o(e,t,i,a){var n;return e.isFile?e.file(function(e){e.relativePath=t+e.name,i.push(e),a()}):(e.isDirectory?n=e:e instanceof File&&i.push(e),"function"==typeof e.webkitGetAsEntry&&(n=e.webkitGetAsEntry()),n&&n.isDirectory?function(e,t,i,a){e.createReader().readEntries(function(e){if(!e.length)return a();l(e.map(function(e){return o.bind(null,e,t,i)}),a)})}(n,t+n.name+"/",i,a):("function"==typeof e.getAsFile&&(e=e.getAsFile())instanceof File&&(e.relativePath=t+e.name,i.push(e)),void a()))}function l(e,t){if(!e||0===e.length)return t();e[0](function(){l(e.slice(1),t)})}function s(e,t){if(e.length){i.fire("beforeAdd");var a=[];l(Array.prototype.map.call(e,function(e){return o.bind(null,e,"",a)}),function(){a.length&&p(a,t)})}}var p=function(e,t){var n=0,r=i.getOpt(["maxFiles","minFileSize","maxFileSize","maxFilesErrorCallback","minFileSizeErrorCallback","maxFileSizeErrorCallback","fileType","fileTypeErrorCallback"]);if(void 0!==r.maxFiles&&r.maxFiles<e.length+i.files.length){if(1!==r.maxFiles||1!==i.files.length||1!==e.length)return r.maxFilesErrorCallback(e,n++),!1;i.removeFile(i.files[0])}var o=[],l=[],s=e.length,p=function(){if(!--s){if(!o.length&&!l.length)return;window.setTimeout(function(){i.fire("filesAdded",o,l)},0)}};a.each(e,function(e){var s=e.name;if(r.fileType.length>0){var m=!1;for(var u in r.fileType){var f="."+r.fileType[u];if(-1!==s.toLowerCase().indexOf(f.toLowerCase(),s.length-f.length)){m=!0;break}}if(!m)return r.fileTypeErrorCallback(e,n++),!1}if(void 0!==r.minFileSize&&e.size<r.minFileSize)return r.minFileSizeErrorCallback(e,n++),!1;if(void 0!==r.maxFileSize&&e.size>r.maxFileSize)return r.maxFileSizeErrorCallback(e,n++),!1;function d(a){i.getFromUniqueIdentifier(a)?l.push(e):function(){e.uniqueIdentifier=a;var n=new c(i,e,a);i.files.push(n),o.push(n),n.container=void 0!==t?t.srcElement:null,window.setTimeout(function(){i.fire("fileAdded",n,t)},0)}(),p()}var g=a.generateUniqueIdentifier(e,t);g&&"function"==typeof g.then?g.then(function(e){d(e)},function(){p()}):d(g)})};function c(e,t,i){var n=this;n.opts={},n.getOpt=e.getOpt,n._prevProgress=0,n.resumableObj=e,n.file=t,n.fileName=t.fileName||t.name,n.size=t.size,n.relativePath=t.relativePath||t.webkitRelativePath||n.fileName,n.uniqueIdentifier=i,n._pause=!1,n.container="";var r=void 0!==i,o=function(e,t){switch(e){case"progress":n.resumableObj.fire("fileProgress",n,t);break;case"error":n.abort(),r=!0,n.chunks=[],n.resumableObj.fire("fileError",n,t);break;case"success":if(r)return;n.resumableObj.fire("fileProgress",n),n.isComplete()&&n.resumableObj.fire("fileSuccess",n,t);break;case"retry":n.resumableObj.fire("fileRetry",n)}};return n.chunks=[],n.abort=function(){var e=0;a.each(n.chunks,function(t){"uploading"==t.status()&&(t.abort(),e++)}),e>0&&n.resumableObj.fire("fileProgress",n)},n.cancel=function(){var e=n.chunks;n.chunks=[],a.each(e,function(e){"uploading"==e.status()&&(e.abort(),n.resumableObj.uploadNextChunk())}),n.resumableObj.removeFile(n),n.resumableObj.fire("fileProgress",n)},n.retry=function(){n.bootstrap();var e=!1;n.resumableObj.on("chunkingComplete",function(){e||n.resumableObj.upload(),e=!0})},n.bootstrap=function(){n.abort(),r=!1,n.chunks=[],n._prevProgress=0;for(var e=n.getOpt("forceChunkSize")?Math.ceil:Math.floor,t=Math.max(e(n.file.size/n.getOpt("chunkSize")),1),i=0;i<t;i++)!function(e){window.setTimeout(function(){n.chunks.push(new m(n.resumableObj,n,e,o)),n.resumableObj.fire("chunkingProgress",n,e/t)},0)}(i);window.setTimeout(function(){n.resumableObj.fire("chunkingComplete",n)},0)},n.progress=function(){if(r)return 1;var e=0,t=!1;return a.each(n.chunks,function(i){"error"==i.status()&&(t=!0),e+=i.progress(!0)}),e=t?1:e>.99999?1:e,e=Math.max(n._prevProgress,e),n._prevProgress=e,e},n.isUploading=function(){var e=!1;return a.each(n.chunks,function(t){if("uploading"==t.status())return e=!0,!1}),e},n.isComplete=function(){var e=!1;return a.each(n.chunks,function(t){var i=t.status();if("pending"==i||"uploading"==i||1===t.preprocessState)return e=!0,!1}),!e},n.pause=function(e){n._pause=void 0===e?!n._pause:e},n.isPaused=function(){return n._pause},n.resumableObj.fire("chunkingStart",n),n.bootstrap(),this}function m(e,t,i,n){var r=this;r.opts={},r.getOpt=e.getOpt,r.resumableObj=e,r.fileObj=t,r.fileObjSize=t.size,r.fileObjType=t.file.type,r.offset=i,r.callback=n,r.lastProgressCallback=new Date,r.tested=!1,r.retries=0,r.pendingRetry=!1,r.preprocessState=0;var o=r.getOpt("chunkSize");return r.loaded=0,r.startByte=r.offset*o,r.endByte=Math.min(r.fileObjSize,(r.offset+1)*o),r.fileObjSize-r.endByte<o&&!r.getOpt("forceChunkSize")&&(r.endByte=r.fileObjSize),r.xhr=null,r.test=function(){r.xhr=new XMLHttpRequest;var e=function(e){r.tested=!0;var t=r.status();"success"==t?(r.callback(t,r.message()),r.resumableObj.uploadNextChunk()):r.send()};r.xhr.addEventListener("load",e,!1),r.xhr.addEventListener("error",e,!1),r.xhr.addEventListener("timeout",e,!1);var t=[],i=r.getOpt("parameterNamespace"),n=r.getOpt("query");"function"==typeof n&&(n=n(r.fileObj,r)),a.each(n,function(e,a){t.push([encodeURIComponent(i+e),encodeURIComponent(a)].join("="))}),t=t.concat([["chunkNumberParameterName",r.offset+1],["chunkSizeParameterName",r.getOpt("chunkSize")],["currentChunkSizeParameterName",r.endByte-r.startByte],["totalSizeParameterName",r.fileObjSize],["typeParameterName",r.fileObjType],["identifierParameterName",r.fileObj.uniqueIdentifier],["fileNameParameterName",r.fileObj.fileName],["relativePathParameterName",r.fileObj.relativePath],["totalChunksParameterName",r.fileObj.chunks.length]].filter(function(e){return r.getOpt(e[0])}).map(function(e){return[i+r.getOpt(e[0]),encodeURIComponent(e[1])].join("=")})),r.xhr.open(r.getOpt("testMethod"),a.getTarget("test",t)),r.xhr.timeout=r.getOpt("xhrTimeout"),r.xhr.withCredentials=r.getOpt("withCredentials");var o=r.getOpt("headers");"function"==typeof o&&(o=o(r.fileObj,r)),a.each(o,function(e,t){r.xhr.setRequestHeader(e,t)}),r.xhr.send(null)},r.preprocessFinished=function(){r.preprocessState=2,r.send()},r.send=function(){var e=r.getOpt("preprocess");if("function"==typeof e)switch(r.preprocessState){case 0:return r.preprocessState=1,void e(r);case 1:return}if(!r.getOpt("testChunks")||r.tested){r.xhr=new XMLHttpRequest,r.xhr.upload.addEventListener("progress",function(e){new Date-r.lastProgressCallback>1e3*r.getOpt("throttleProgressCallbacks")&&(r.callback("progress"),r.lastProgressCallback=new Date),r.loaded=e.loaded||0},!1),r.loaded=0,r.pendingRetry=!1,r.callback("progress");var t=function(e){var t=r.status();if("success"==t||"error"==t)r.callback(t,r.message()),r.resumableObj.uploadNextChunk();else{r.callback("retry",r.message()),r.abort(),r.retries++;var i=r.getOpt("chunkRetryInterval");void 0!==i?(r.pendingRetry=!0,setTimeout(r.send,i)):r.send()}};r.xhr.addEventListener("load",t,!1),r.xhr.addEventListener("error",t,!1),r.xhr.addEventListener("timeout",t,!1);var i=[["chunkNumberParameterName",r.offset+1],["chunkSizeParameterName",r.getOpt("chunkSize")],["currentChunkSizeParameterName",r.endByte-r.startByte],["totalSizeParameterName",r.fileObjSize],["typeParameterName",r.fileObjType],["identifierParameterName",r.fileObj.uniqueIdentifier],["fileNameParameterName",r.fileObj.fileName],["relativePathParameterName",r.fileObj.relativePath],["totalChunksParameterName",r.fileObj.chunks.length]].filter(function(e){return r.getOpt(e[0])}).reduce(function(e,t){return e[r.getOpt(t[0])]=t[1],e},{}),n=r.getOpt("query");"function"==typeof n&&(n=n(r.fileObj,r)),a.each(n,function(e,t){i[e]=t});var o=r.fileObj.file.slice?"slice":r.fileObj.file.mozSlice?"mozSlice":r.fileObj.file.webkitSlice?"webkitSlice":"slice",l=r.fileObj.file[o](r.startByte,r.endByte,r.getOpt("setChunkTypeFromFile")?r.fileObj.file.type:""),s=null,p=[],c=r.getOpt("parameterNamespace");if("octet"===r.getOpt("method"))s=l,a.each(i,function(e,t){p.push([encodeURIComponent(c+e),encodeURIComponent(t)].join("="))});else if(s=new FormData,a.each(i,function(e,t){s.append(c+e,t),p.push([encodeURIComponent(c+e),encodeURIComponent(t)].join("="))}),"blob"==r.getOpt("chunkFormat"))s.append(c+r.getOpt("fileParameterName"),l,r.fileObj.fileName);else if("base64"==r.getOpt("chunkFormat")){var m=new FileReader;m.onload=function(e){s.append(c+r.getOpt("fileParameterName"),m.result),r.xhr.send(s)},m.readAsDataURL(l)}var u=a.getTarget("upload",p),f=r.getOpt("uploadMethod");r.xhr.open(f,u),"octet"===r.getOpt("method")&&r.xhr.setRequestHeader("Content-Type","application/octet-stream"),r.xhr.timeout=r.getOpt("xhrTimeout"),r.xhr.withCredentials=r.getOpt("withCredentials");var d=r.getOpt("headers");"function"==typeof d&&(d=d(r.fileObj,r)),a.each(d,function(e,t){r.xhr.setRequestHeader(e,t)}),"blob"==r.getOpt("chunkFormat")&&r.xhr.send(s)}else r.test()},r.abort=function(){r.xhr&&r.xhr.abort(),r.xhr=null},r.status=function(){return r.pendingRetry?"uploading":r.xhr?r.xhr.readyState<4?"uploading":200==r.xhr.status||201==r.xhr.status?"success":a.contains(r.getOpt("permanentErrors"),r.xhr.status)||r.retries>=r.getOpt("maxChunkRetries")?"error":(r.abort(),"pending"):"pending"},r.message=function(){return r.xhr?r.xhr.responseText:""},r.progress=function(e){void 0===e&&(e=!1);var t=e?(r.endByte-r.startByte)/r.fileObjSize:1;if(r.pendingRetry)return 0;switch(r.xhr&&r.xhr.status||(t*=.95),r.status()){case"success":case"error":return 1*t;case"pending":return 0*t;default:return r.loaded/(r.endByte-r.startByte)*t}},this}return i.uploadNextChunk=function(){var e=!1;if(i.getOpt("prioritizeFirstAndLastChunk")&&(a.each(i.files,function(t){return t.chunks.length&&"pending"==t.chunks[0].status()&&0===t.chunks[0].preprocessState?(t.chunks[0].send(),e=!0,!1):t.chunks.length>1&&"pending"==t.chunks[t.chunks.length-1].status()&&0===t.chunks[t.chunks.length-1].preprocessState?(t.chunks[t.chunks.length-1].send(),e=!0,!1):void 0}),e))return!0;if(a.each(i.files,function(t){if(!1===t.isPaused()&&a.each(t.chunks,function(t){if("pending"==t.status()&&0===t.preprocessState)return t.send(),e=!0,!1}),e)return!1}),e)return!0;var t=!1;return a.each(i.files,function(e){if(!e.isComplete())return t=!0,!1}),t||i.fire("complete"),!1},i.assignBrowse=function(e,t){void 0===e.length&&(e=[e]),a.each(e,function(e){var a;"INPUT"===e.tagName&&"file"===e.type?a=e:((a=document.createElement("input")).setAttribute("type","file"),a.style.display="none",e.addEventListener("click",function(){a.style.opacity=0,a.style.display="block",a.focus(),a.click(),a.style.display="none"},!1),e.appendChild(a));var n=i.getOpt("maxFiles");void 0===n||1!=n?a.setAttribute("multiple","multiple"):a.removeAttribute("multiple"),t?a.setAttribute("webkitdirectory","webkitdirectory"):a.removeAttribute("webkitdirectory");var r=i.getOpt("fileType");void 0!==r&&r.length>=1?a.setAttribute("accept",r.map(function(e){return"."+e}).join(",")):a.removeAttribute("accept"),a.addEventListener("change",function(e){p(e.target.files,e),i.getOpt("clearInput")&&(e.target.value="")},!1)})},i.assignDrop=function(e){void 0===e.length&&(e=[e]),a.each(e,function(e){e.addEventListener("dragover",r,!1),e.addEventListener("dragenter",r,!1),e.addEventListener("drop",n,!1)})},i.unAssignDrop=function(e){void 0===e.length&&(e=[e]),a.each(e,function(e){e.removeEventListener("dragover",r),e.removeEventListener("dragenter",r),e.removeEventListener("drop",n)})},i.isUploading=function(){var e=!1;return a.each(i.files,function(t){if(t.isUploading())return e=!0,!1}),e},i.upload=function(){if(!i.isUploading()){i.fire("uploadStart");for(var e=1;e<=i.getOpt("simultaneousUploads");e++)i.uploadNextChunk()}},i.pause=function(){a.each(i.files,function(e){e.abort()}),i.fire("pause")},i.cancel=function(){i.fire("beforeCancel");for(var e=i.files.length-1;e>=0;e--)i.files[e].cancel();i.fire("cancel")},i.progress=function(){var e=0,t=0;return a.each(i.files,function(i){e+=i.progress()*i.size,t+=i.size}),t>0?e/t:0},i.addFile=function(e,t){p([e],t)},i.addFiles=function(e,t){p(e,t)},i.removeFile=function(e){for(var t=i.files.length-1;t>=0;t--)i.files[t]===e&&i.files.splice(t,1)},i.getFromUniqueIdentifier=function(e){var t=!1;return a.each(i.files,function(i){i.uniqueIdentifier==e&&(t=i)}),t},i.getSize=function(){var e=0;return a.each(i.files,function(t){e+=t.size}),e},i.handleDropEvent=function(e){n(e)},i.handleChangeEvent=function(e){p(e.target.files,e),e.target.value=""},i.updateQuery=function(e){i.opts.query=e},this};e.exports=t}()},function(e,t,i){"use strict";var a=i(3);e.exports=new a(i(4))},function(e,t,i){"use strict";function a(){this._types=Object.create(null),this._extensions=Object.create(null);for(var e=0;e<arguments.length;e++)this.define(arguments[e]);this.define=this.define.bind(this),this.getType=this.getType.bind(this),this.getExtension=this.getExtension.bind(this)}a.prototype.define=function(e,t){for(var i in e){for(var a=e[i],n=0;n<a.length;n++){if("*"!=(r=a[n])[0]){if(!t&&r in this._types)throw new Error('Attempt to change mapping for "'+r+'" extension from "'+this._types[r]+'" to "'+i+'". Pass `force=true` to allow this, otherwise remove "'+r+'" from the list of extensions for "'+i+'".');this._types[r]=i}}if(t||!this._extensions[i]){var r=a[0];this._extensions[i]="*"!=r[0]?r:r.substr(1)}}},a.prototype.getType=function(e){var t=(e=String(e)).replace(/^.*[\/\\]/,"").toLowerCase(),i=t.replace(/^.*\./,"").toLowerCase(),a=t.length<e.length;return(i.length<t.length-1||!a)&&this._types[i]||null},a.prototype.getExtension=function(e){return(e=/^\s*([^;\s]*)/.test(e)&&RegExp.$1)&&this._extensions[e.toLowerCase()]||null},e.exports=a},function(e){e.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["x3db","x3dbz"],"model/x3d+vrml":["x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]}}]);