const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");let a=null;t.addEventListener("click",(()=>{a=setInterval((()=>r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`),1e3),t.setAttribute("disabled","disabled")})),e.addEventListener("click",(()=>{clearInterval(a),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.7ffbc451.js.map