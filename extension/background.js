(()=>{"use strict";var e="SUNDAY|MONDAY|TUESDAY|WEDNESDAY|THURSDAY|FRIDAY|SATURDAY",t=e.split("|"),r=[{name:"ebay",group:t=>new RegExp("("+e+") ([0-9:]+) (AM|PM)","g").exec(t.replaceAll(/[^A-Za-z0-9: ]/g,"").toUpperCase()),format:e=>{let r=e[1],n=e[2],a=e[3],l=(t.indexOf(r)-(new Date).getDay()+7)%7,o=new Date;o.setDate(o.getDate()+l);let i=[[o.getFullYear(),o.getMonth()+1,o.getDate()].join("/"),n,a].join(" ");return new Date(i)}}],n=e=>{let t=""+e;return 1===t.length?"0"+t:t},a=(e,t)=>{let r=[e.getFullYear(),n(e.getMonth()+1),n(e.getDate()),"T",n(e.getHours()),n(e.getMinutes()),n(e.getSeconds())].join("");return["https://calendar.google.com/calendar/u/0/r/eventedit?dates=",r,"/",r,"&","ctz=",Intl.DateTimeFormat().resolvedOptions().timeZone,"&","text=",t.title,"&","location=",t.url].join("")};chrome.contextMenus.onClicked.addListener(((e,t)=>{let n=e.selectionText,l=r.map((e=>{let r=e.group(n);if(r)return{name:e.name,url:a(e.format(r),t)}})).filter((e=>!!e));if(l.length)chrome.tabs.create({url:l[0].url});else{{let e=new Date(n);if("Invalid Date"!==e.toString()){let r=a(e,t);return void chrome.tabs.create({url:r})}}chrome.tabs.create({url:"assets/error.html"})}})),chrome.runtime.onInstalled.addListener((()=>{chrome.contextMenus.create({title:"Add to Google Calendar",contexts:["selection"],id:"selection"})}))})();