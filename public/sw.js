if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>a(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-07a7b4f2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"f2f98c664e2d5e42ddacd50eb1ed2340"},{url:"/_next/static/HQZbk1j9vaOga_oiGueSn/_buildManifest.js",revision:"39c04c408085e9912adc25c833c9fca1"},{url:"/_next/static/HQZbk1j9vaOga_oiGueSn/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/472-1b4f24c06a11c623.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/834-44b7924a259f62da.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/app/_not-found-cd0c8ad6b6017e7e.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/app/layout-06144c36b617cdec.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/app/page-dd7990be2d9886c6.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/fd9d1056-6fae47bb4d1928e2.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/main-app-20502176c3e6ee65.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/main-d32504c7b311d53f.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/pages/_app-ee276fea40a4b191.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/pages/_error-deeb844d2074b9d8.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-cf4b80922f1634ad.js",revision:"HQZbk1j9vaOga_oiGueSn"},{url:"/_next/static/css/055ad4fd47f2ae46.css",revision:"055ad4fd47f2ae46"},{url:"/_next/static/css/922497aabc478daf.css",revision:"922497aabc478daf"},{url:"/_next/static/media/0066078b55585ece-s.p.ttf",revision:"ed86af2ed5bbaf879e9f2ec2e2eac929"},{url:"/_next/static/media/54c76208542a99cd-s.p.ttf",revision:"5e077c15f6e1d334dd4e9be62b28ac75"},{url:"/_next/static/media/62e48611196b08b2-s.p.ttf",revision:"bdb7ba651b7bdcda6ce527b3b6705334"},{url:"/_next/static/media/88a56f1a554a1e45-s.p.ttf",revision:"8f87709aa788b839c587e8a6566f960d"},{url:"/_next/static/media/941396b781615e84-s.p.ttf",revision:"cc10461cb5e0a6f2621c7179f4d6de17"},{url:"/co-create.mp4",revision:"f72a66ce7fab01c75b1758229cf924b0"},{url:"/contact_us.mp4",revision:"570c985c3ddb472519c82c1bb50caf37"},{url:"/help_faq.mp4",revision:"d6ce33bec1c04f64f6de175c0932fc94"},{url:"/logo.png",revision:"d7a99ebf591f09a2297047db3bfb4c16"},{url:"/manifest.json",revision:"9edf6c25c93fa0983be8c0af8dfa52c1"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/service-worker.js",revision:"ebdef58ce2a25832f8cc6fff2fd41074"},{url:"/svg/arrow.svg",revision:"cf30ccff03b1e73337c691c8711773ae"},{url:"/svg/call.svg",revision:"192a294c875feebd733eca70cbe90aaa"},{url:"/svg/close.svg",revision:"09c8157743af5a6c575063a01ab97590"},{url:"/svg/closeWhite.svg",revision:"bba3dd4a63e60dcf92c1454300bee452"},{url:"/svg/favicon.png",revision:"9e7863a7072ac878f981f9fd20677fea"},{url:"/svg/icon1.svg",revision:"25c819ff54c4438f3ddf1b7c87b43c62"},{url:"/svg/icon2.svg",revision:"755dabc56355c726c0f3ca5aaade0f98"},{url:"/svg/icon3.svg",revision:"48f2e93f5636c3548322d13e7e8a8e47"},{url:"/svg/left-arrow.svg",revision:"6564b6e29c52b9d0e66c10495c64d29c"},{url:"/svg/location.svg",revision:"b3a35202fffde701823a812ad1a2a2cf"},{url:"/svg/logo.svg",revision:"08e0d00fcca8acef30c4f1d731865e87"},{url:"/svg/mail.svg",revision:"9da879101201f6a28f8b17c59939691e"},{url:"/svg/menu.svg",revision:"671fea0954617df91f52039730e27efb"},{url:"/svg/pause.svg",revision:"2c61a4f6dc2d6b18582bfabd54499aed"},{url:"/svg/play.svg",revision:"41260738d2b29397d2532222c5efbfe0"},{url:"/svg/profile.svg",revision:"a73dc2e1ffe7b76075badd89a58256f3"},{url:"/svg/rotate1.svg",revision:"b1a6d6c426203a4e3e2402ca1f8fd704"},{url:"/svg/rotate2.svg",revision:"4d7e84993afb7b07fd13ed770b6ca096"},{url:"/svg/send.svg",revision:"a74f946bd892d8457c099e067f5e147b"},{url:"/svg/smile.svg",revision:"8d39e2e31599749718e82ff148f356f1"},{url:"/svg/white-cross.svg",revision:"acaa6a255fc156d92b857c2b305216d5"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
