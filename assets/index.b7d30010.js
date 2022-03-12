import{o as j,a as J,r as c,d as q,t as Q,w as P,b as F,c as K,e as p,f as ee,g as te,h as oe,i as ne,j as se,k as le}from"./vendor.d72bfc6e.js";const ie=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const n of u.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerpolicy&&(u.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?u.credentials="include":l.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function o(l){if(l.ep)return;l.ep=!0;const u=s(l);fetch(l.href,u)}};ie();function Z(e){const t=window.getComputedStyle(e),s=new DOMMatrixReadOnly(t.transform);return{translateX:s.m41,translateY:s.m42}}const E=(e,t,s)=>Math.min(Math.max(t,e),s),v=()=>{};var k=(e=>(e.Top="top",e.Bottom="bottom",e.Right="right",e.Left="left",e.TopRight="top-right",e.TopLeft="top-left",e.BottomRight="bottom-right",e.BottomLeft="botton-left",e))(k||{});function ae(e,t){let s=v,o=v,l=v,u=v,n=v,R=v,y=v,g=v,M=v,z=v,b=v,B=v,D=v,a=v,L=v,_=v,m=0,h=0,W=0,C=0,T=null,O=window.innerWidth,$=window.innerHeight;function A({pos:d,elem:i,event:r,initPos:w}){if(e.value){if(d==="top"){const{translateX:f}=Z(i);e.value.style.transform=`translate(
					${E(f,0-w.value.left,O)}px,
					${E(r.pageY-w.value.top,0-w.value.top,$)}px)`}else if(d==="left"){const{translateY:f}=Z(i);e.value.style.transform=`translate(
					${E(r.pageX-w.value.left,0-w.value.left,O)}px,
					${E(f,0-w.value.top,$)}px)`}}}function N({frame:d,initHeight:i=0,deltaY:r=0,position:w="top",event:f,initPos:H=c({left:0,top:0})}){d.value&&f&&T&&(d.value.style.height=E(i+r,0,i+T.top)+"px",A({pos:w,elem:d.value,event:f,initPos:H}))}function S({frame:d,initHeight:i=0,deltaY:r=0}){d.value&&T&&(d.value.style.height=E(i-r,0,$-T.top)+"px")}function X({frame:d,initWidth:i=0,deltaX:r=0,position:w="left",event:f,initPos:H=c({left:0,top:0})}){d.value&&f&&T&&(d.value.style.width=E(i+r,0,i+T.left)+"px",A({pos:w,elem:d.value,event:f,initPos:H}))}function Y({frame:d,initWidth:i=0,deltaX:r=0}){d.value&&T&&(d.value.style.width=E(i-r,0,O-T.left)+"px")}const U=d=>i=>{const r=W-i.clientX,w=C-i.clientY;if(e.value)switch(d){case"top":N({frame:e,initHeight:h,deltaY:w,event:i,initPos:t});break;case"bottom":S({frame:e,initHeight:h,deltaY:w});break;case"left":X({frame:e,initWidth:m,deltaX:r,event:i,initPos:t});break;case"right":Y({frame:e,initWidth:m,deltaX:r});break;case"top-right":N({frame:e,initHeight:h,deltaY:w,event:i,initPos:t}),Y({frame:e,initWidth:m,deltaX:r});break;case"top-left":N({frame:e,initHeight:h,deltaY:w,event:i,initPos:t}),X({frame:e,initWidth:m,deltaX:r,event:i,initPos:t});break;case"bottom-right":S({frame:e,initHeight:h,deltaY:w}),Y({frame:e,initWidth:m,deltaX:r});break;case"botton-left":S({frame:e,initHeight:h,deltaY:w}),X({frame:e,initWidth:m,deltaX:r,event:i,initPos:t});break;default:throw new TypeError("HANDLE_RESIZE_MOUSE_MOVE: no such position")}},G=d=>i=>{var r,w,f,H,V,I;switch(m=(w=(r=e.value)==null?void 0:r.offsetWidth)!=null?w:0,h=(H=(f=e.value)==null?void 0:f.offsetHeight)!=null?H:0,W=i.clientX,C=i.clientY,O=window.innerWidth,$=window.innerHeight,T=(I=(V=e.value)==null?void 0:V.getBoundingClientRect())!=null?I:null,d){case"top":window.addEventListener("mousemove",M),window.addEventListener("mouseup",s);break;case"bottom":window.addEventListener("mousemove",z),window.addEventListener("mouseup",o);break;case"left":window.addEventListener("mousemove",b),window.addEventListener("mouseup",l);break;case"right":window.addEventListener("mousemove",B),window.addEventListener("mouseup",u);break;case"top-right":window.addEventListener("mousemove",D),window.addEventListener("mouseup",n);break;case"top-left":window.addEventListener("mousemove",L),window.addEventListener("mouseup",y);break;case"bottom-right":window.addEventListener("mousemove",a),window.addEventListener("mouseup",R);break;case"botton-left":window.addEventListener("mousemove",_),window.addEventListener("mouseup",g);break;default:throw new TypeError("HANDLE_RESIZE_MOUSE_DOWN: no such position")}},x=d=>()=>{switch(d){case"top":window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",s);break;case"bottom":window.removeEventListener("mousemove",z),window.removeEventListener("mouseup",o);break;case"left":window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",l);break;case"right":window.removeEventListener("mousemove",B),window.removeEventListener("mouseup",u);break;case"top-right":window.removeEventListener("mousemove",D),window.removeEventListener("mouseup",n);break;case"top-left":window.removeEventListener("mousemove",L),window.removeEventListener("mouseup",y);break;case"bottom-right":window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",R);break;case"botton-left":window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",g);break;default:throw new TypeError("HANDLE_RESIZE_MOUSE_UP: no such position")}};return j(()=>{s=x("top"),o=x("bottom"),l=x("left"),u=x("right"),n=x("top-right"),y=x("top-left"),R=x("bottom-right"),g=x("botton-left"),M=U("top"),z=U("bottom"),b=U("left"),B=U("right"),D=U("top-right"),L=U("top-left"),a=U("bottom-right"),_=U("botton-left")}),{handleResizeMouseDown:G}}function de(e,t,s){var B,D;const o="window__titlebar--grabbing",l="window--active";let u=0,n=0,R=window.innerWidth,y=window.innerHeight,g=(D=(B=e.value)==null?void 0:B.getBoundingClientRect())!=null?D:null;function M(a){if(e.value&&g){const L=a.pageX,_=a.pageY;e.value.style.transform=`translate(
				${E(L-u-s.value.left,0-s.value.left,R-g.width-s.value.left)}px,
				${E(_-n-s.value.top,0-s.value.top,y-g.height-s.value.top)}px)`}}function z(a){var _,m,h,W,C;if(a.target.tagName==="BUTTON"||a.target.classList.contains("window__controls"))return;g=(m=(_=e.value)==null?void 0:_.getBoundingClientRect())!=null?m:null,R=window.innerWidth,y=window.innerHeight;const L=(W=(h=t.value)==null?void 0:h.getBoundingClientRect())!=null?W:{x:0,y:0};u=a.clientX-L.x,n=a.clientY-L.y,(C=t.value)==null||C.classList.add(o),window.addEventListener("mousemove",M),window.addEventListener("mouseup",b)}function b(){var a;(a=t.value)==null||a.classList.remove(o),window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",b)}return J(()=>{window.removeEventListener("mousemove",M),window.removeEventListener("mouseup",b),e.value&&e.value.classList.remove(l)}),{handleTitleBarMouseDown:z}}var ue=(e,t)=>{const s=e.__vccOpts||e;for(const[o,l]of t)s[o]=l;return s};const re=q({name:"VWindow",props:{initPos:{type:Object,default:()=>({top:0,left:0})},title:{type:String,default:""}},emits:["close"],setup(e,{emit:t}){const{initPos:s}=Q(e),o=c(null),l=c(null),u="window--active",n="window--max";let R=c(),y=c(),g=c(),M=c(),z=c(),b=c(),B=c(),D=c();const{handleResizeMouseDown:a}=ae(o,s),{handleTitleBarMouseDown:L}=de(o,l,s);function _(){t("close")}let m="auto",h="auto",W="";function C(){o.value&&(o.value.classList.toggle(n),o.value.classList.contains(n)?(m=o.value.style.width,h=o.value.style.height,W=o.value.style.transform,o.value.style.width="auto",o.value.style.height="auto",o.value.style.transform="none",o.value.style.top=0+"px",o.value.style.left=0+"px",o.value.style.right=0+"px",o.value.style.bottom=0+"px"):(o.value.style.width=m,o.value.style.height=h,o.value.style.transform=W))}return j(()=>{o.value&&(o.value.style.top=s.value.top+"px",o.value.style.left=s.value.left+"px",o.value.classList.add(u),s.value.top>window.innerWidth-o.value.clientWidth&&(s.value.left=0),s.value.top>window.innerHeight-o.value.clientHeight&&(s.value.left=0))}),P(()=>{R.value=a(k.Top),y.value=a(k.Bottom),g.value=a(k.Left),M.value=a(k.Right),z.value=a(k.TopRight),b.value=a(k.BottomRight),B.value=a(k.TopLeft),D.value=a(k.BottomLeft)}),{frame:o,titlebar:l,closeWindow:_,maximizeWindow:C,handleTitleBarMouseDown:L,handleTopMouseDown:R.value,handleBottomMouseDown:y.value,handleLeftMouseDown:g.value,handleRightMouseDown:M.value,handleTopRightMouseDown:z.value,handleTopLeftMouseDown:B.value,handleBottomRightMouseDown:b.value,handleBottomLeftMouseDown:D.value}}}),we={ref:"frame",class:"window"},ve={class:"window__title"},pe={class:"window__controls"},me={class:"window__content"};function he(e,t,s,o,l,u){return F(),K("div",we,[p("div",{class:"window__top window__border",onMousedown:t[0]||(t[0]=(...n)=>e.handleTopMouseDown&&e.handleTopMouseDown(...n))},null,32),p("div",{class:"window__bottom window__border",onMousedown:t[1]||(t[1]=(...n)=>e.handleBottomMouseDown&&e.handleBottomMouseDown(...n))},null,32),p("div",{class:"window__left window__border",onMousedown:t[2]||(t[2]=(...n)=>e.handleLeftMouseDown&&e.handleLeftMouseDown(...n))},null,32),p("div",{class:"window__right window__border",onMousedown:t[3]||(t[3]=(...n)=>e.handleRightMouseDown&&e.handleRightMouseDown(...n))},null,32),p("div",{class:"window__top-right window__border window__border--small",onMousedown:t[4]||(t[4]=(...n)=>e.handleTopRightMouseDown&&e.handleTopRightMouseDown(...n))},null,32),p("div",{class:"window__top-left window__border window__border--small",onMousedown:t[5]||(t[5]=(...n)=>e.handleTopLeftMouseDown&&e.handleTopLeftMouseDown(...n))},null,32),p("div",{class:"window__bottom-right window__border window__border--small",onMousedown:t[6]||(t[6]=(...n)=>e.handleBottomRightMouseDown&&e.handleBottomRightMouseDown(...n))},null,32),p("div",{class:"window__bottom-left window__border window__border--small",onMousedown:t[7]||(t[7]=(...n)=>e.handleBottomLeftMouseDown&&e.handleBottomLeftMouseDown(...n))},null,32),p("div",{ref:"titlebar",class:"window__titlebar",onMousedown:t[10]||(t[10]=(...n)=>e.handleTitleBarMouseDown&&e.handleTitleBarMouseDown(...n))},[p("h2",ve,ee(e.title),1),p("span",pe,[p("button",{class:"window__button window__button--maximize","aria-label":"maximize",onClick:t[8]||(t[8]=(...n)=>e.maximizeWindow&&e.maximizeWindow(...n))}),p("button",{class:"window__button window__button--close","aria-label":"close",onClick:t[9]||(t[9]=(...n)=>e.closeWindow&&e.closeWindow(...n))})])],544),p("div",me,[te(e.$slots,"default",{},void 0,!0)])],512)}var fe=ue(re,[["render",he],["__scopeId","data-v-43ca5088"]]);const ce={class:"wrapper"},ge=se(" hello "),Me=q({setup(e){function t(){console.log("close")}return(s,o)=>(F(),K("div",ce,[oe(fe,{title:"asdfasdasdfasdfasdfasdfasdasdfasdfff",onClose:t},{default:ne(()=>[ge]),_:1})]))}});le(Me).mount("#app");