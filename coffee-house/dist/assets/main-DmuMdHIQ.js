(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const K=()=>{const t=document.querySelector("body"),e=document.querySelector(".nav-bar"),s=document.querySelector(".burger-menu"),o=document.querySelector(".burger-lines");let n=window.innerWidth;window.addEventListener("resize",()=>{n=window.innerWidth;const l=e?.classList.contains("burger-menu--open");n>864&&l&&r()});function r(){n>864||(e?.classList.toggle("burger-menu--open"),o?.classList.toggle("burger-menu--open"),t?.classList.toggle("disable-scroll"))}s?.addEventListener("click",()=>{r()}),e?.addEventListener("click",l=>{const f=l.target;f instanceof HTMLElement&&f.tagName==="A"&&r()})},N="https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com",U=async(t=!1)=>{try{const e=await fetch(`${N}/products${t?"/favorites":""}`);if(!e.ok)throw new Error("Something went wrong. Please, refresh the page");return(await e.json()).data}catch(e){const s=e instanceof Error?e.message:"Unknown error";throw console.error("Something went wrong. Please, refresh the page:",s),new Error(s)}},_=(t,e)=>{e&&t.forEach(s=>{const o=`
      <div
        class="slider-content flex-col justify-between align-center gap-20"
      >
        <div class="slider-img-wrapper">
          <img
            class="slider-img"
            src="assets/${s.id}.png"
            alt="slider image"
          />
        </div>        
        <div class="slider-desc flex-col align-center gap-12">
          <p
            class="slider-desc-name dark-txt heading-3-font weight-600"
          >
            ${s.name}
          </p>
          <p
            class="slider-desc-txt dark-txt medium-font weight-400 txt-align-center"
          >
            ${s.description}
          </p>
          <p
            class="slider-desc-price dark-txt heading-3-font weight-600"
          >
            ${s.price}$
          </p>
        </div>
      </div>
    `;e.insertAdjacentHTML("beforeend",o)})},H=(t,e)=>{const s=`
    <div class="error-message w-full gap-6 flex-row align-center justify-center medium-font weight-500 txt-align-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f44305" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path></svg>
      <p>${t}</p>
    </div>
  `;e&&(e.innerHTML=s)},S=(t,e)=>{if(!e)return;t?e.querySelector(".spinner-container")||e.insertAdjacentHTML("beforeend",`
    <div class="spinner-container">
      <span class="spinner"></span>
    </div>
  `):e.querySelector(".spinner-container")?.remove()},G=async()=>{const t=document.querySelector(".slider-container"),e=document.querySelector(".slider-area");S(!0,t);const s=document.querySelector(".left-arrow-btn"),o=document.querySelector(".right-arrow-btn"),n=document.querySelectorAll(".control-line-fill"),r=document.querySelector(".control-lines-wrapper");try{let l=function(){n.forEach((L,E)=>{E===i?L.classList.add("active-control-line"):L.classList.remove("active-control-line")})},f=function(){q.forEach((L,E)=>{L.style.transform=`translateX(${100*(E-i)}vw)`}),l()},d=function(){i===0?i=p:i-=1,f()},g=function(){i===p?i=0:i+=1,f()},b=function(){clearInterval(h),clearTimeout(w)},a=function(){b(),u=Date.now(),h=setInterval(()=>{A||g()},y)},c=function(){b(),a()},m=function(){const E=I-M,z=x-k,O=Math.abs(E),J=Math.abs(z);O<50||O<=J||(E>0?(d(),c()):(g(),c()))};const P=await U(!0);S(!1,t),r?.classList.remove("display-none"),s?.classList.remove("display-none"),o?.classList.remove("display-none"),_(P,e);const q=document.querySelectorAll(".slider-content");let i=0,p=q.length-1,y=5e3,h,w,u,v=y,A=!1;s?.addEventListener("click",()=>{d(),c()}),o?.addEventListener("click",()=>{g(),c()}),e?.addEventListener("mouseover",L=>{const E=L.target?.closest(".slider-content");if(!E||!e.contains(E))return;A=!0,b();const z=Date.now()-u;v=y-z,n[i].classList.add("paused")}),e?.addEventListener("mouseleave",()=>{A=!1,b(),w=setTimeout(()=>{g(),a()},v),n[i].classList.remove("paused")});let M=0,k=0,I=0,x=0,$=!1;e?.addEventListener("touchstart",L=>{M=L.touches[0].clientX,k=L.touches[0].clientY,I=M,x=k,$=!0,A=!0,b();const E=Date.now()-u;v=y-E,n[i].classList.add("paused")}),e?.addEventListener("touchmove",L=>{if(!$)return;I=L.touches[0].clientX,x=L.touches[0].clientY;const E=Math.abs(I-M),z=Math.abs(x-k);E>z&&L.preventDefault()}),e?.addEventListener("touchend",()=>{$&&($=!1,A=!1,n[i].classList.remove("paused"),m(),b(),w=setTimeout(()=>{g(),a()},v))}),f(),l(),a()}catch(l){console.error(l),S(!1,t),H("Something went wrong. Please, refresh the page",t),r?.classList.add("display-none")}},Q=()=>{G()};let Z=null;const B=localStorage.getItem("user");B&&(Z=JSON.parse(B));function C(){return!!Z}const ee=async t=>{try{const e=await fetch(`${N}/products/${t}`);if(!e.ok)throw new Error("Something went wrong. Please, refresh the page");return(await e.json()).data}catch(e){const s=e instanceof Error?e.message:"Unknown error";throw console.error("Something went wrong. Please, refresh the page:",s),new Error(s)}},te=(t,e,s=!1)=>{e&&(e.innerHTML="");const o=Object.entries(t.sizes),n=s&&!!t.sizes.s.discountPrice,r=o.map((d,g)=>`
      <div
        class="${g===0?"first-size-btn active-size-btn":""} size-btn flex-row align-center gap-8 medium-font dark-txt weight-600"
        data-price="${d[1].price}" ${d[1].discountPrice?`data-discount-price="${d[1].discountPrice}"`:""}
      >
        <div class="size-letter-box">
          <span class="size-letter flex-row align-center justify-center"
            >${d[0].toUpperCase()}</span
          >
        </div>
        <p id="size-1">${d[1].size}</p>

        <!-- Tooltip -->
        <div class="tooltip">
          <span class="tooltip-original-price display-none"></span>
          <span class='tooltip-price'></span>
        </div>
      </div>
  `).join(""),l=t.additives.map((d,g)=>`
      <div
        class="additive-btn flex-row align-center gap-8 medium-font dark-txt weight-600"
        data-price="${d.price}" ${d.discountPrice?`data-discount-price="${d.discountPrice}"`:""}
      >
        <div class="additive-number-box">
          <span
            class="additive-number flex-row align-center justify-center"
            >${g+1}</span
          >
        </div>
        <p id="additive-1">${d.name}</p>
        
        <!-- Tooltip -->
        <div class="tooltip">
          <span class="tooltip-additive-original-price display-none"></span>
          <span class='tooltip-additive-price'></span>
        </div>
      </div>
  `).join(""),f=`
    <div class="modal-img-box">
      <img
        class="modal-img"
        src="./assets/${t.id}.png"
        alt="coffee image"
        id="modal-img"
      />
    </div>
    <div class="modal-product-info flex-col gap-20">
      <div class="modal-product-desc flex-col gap-12">
        <p
          class="modal-product-name heading-3-font weight-600 dark-txt"
        >
          ${t.name}
        </p>
        <p
          class="modal-product-desc-txt weight-400 dark-txt medium-font"
        >
          ${t.description}
        </p>
      </div>
      <div class="modal-product-size flex-col gap-8">
        <p class="dark-txt medium-font weight-400">Size</p>
        <div class="size-buttons-container flex-row gap-8">
          ${r}
        </div>
      </div>

      <div class="modal-product-additives flex-col gap-8">
        <p class="dark-txt medium-font weight-400">Additives</p>
        <div class="additive-buttons-container flex-row gap-8">
          ${l}
        </div>
      </div>

      <div
        class="total-price-container flex-row gap-20 align-center justify-between"
      >
        <p class="heading-3-font dark-txt weight-600">Total:</p>
        <div class='total-price-wrapper'>
          <span
            class="original-price heading-3-font weight-600 ${n?"":"display-none"}"
          >
            $${t.price}
          </span>
          <span
            class="total-price heading-3-font dark-txt weight-600"
          >
            $${n?t.sizes.s.discountPrice:t.price}
          </span>
        </div>
      </div>
      <button
        class="modal-add-to-cart-btn btn w-full dark-txt weight-600 medium-font"
      >
        Add to Cart
      </button>
      <button
        class="modal-close-btn dark-txt weight-600 medium-font"
      >
        <img class='modal-close-icon' src='./assets/button-close.svg' alt='Close icon'/>
      </button>       
    </div>`;e&&(e.innerHTML=f)},se=t=>{const e=document.querySelector(".notification");e&&(e.textContent=t,e.classList.remove("display-none"),e.classList.add("show-notification"),setTimeout(()=>{e.classList.remove("show-notification"),e.classList.add("display-none")},1500))},W=(t,e,s)=>{const o=e&&t.dataset.discountPrice?Number(t.dataset.discountPrice):Number(t.dataset.price),n=t.querySelector(s==="size"?".tooltip-price":".tooltip-additive-price"),r=t.querySelector(s==="size"?".tooltip-original-price":".tooltip-additive-original-price");n&&(n.textContent=`$${o.toFixed(2)}`),e&&t.dataset.discountPrice?(r&&(r.textContent=`$${Number(t.dataset.price).toFixed(2)}`),r?.classList.remove("display-none")):r?.classList.add("display-none")},T=C(),re=async()=>{const t=document.querySelector("body"),e={coffee:document.querySelector(".coffee-products"),tea:document.querySelector(".tea-products"),dessert:document.querySelector(".dessert-products")},s=document.querySelector(".modal-container"),o=document.querySelector(".overlay");let n,r=0;Object.values(e).forEach(d=>{d instanceof HTMLElement&&d.addEventListener("click",async g=>{const a=g.target.closest(".product-item");if(a){n=a?.dataset?.productId;try{let c=function(){const u=Array.from(y).find(x=>x.classList.contains("active-size-btn")),v=Number(T&&u?.dataset.discountPrice?Number(u?.dataset.discountPrice):Number(u?.dataset.price)),A=Number(u?.dataset.price),M=Array.from(p).reduce((x,$)=>x+($.classList.contains("active-additive-btn")?Number(T&&$.dataset.discountPrice?Number($.dataset.discountPrice):Number($.dataset.price)):0),0),k=Array.from(p).reduce((x,$)=>x+($.classList.contains("active-additive-btn")?Number(Number($.dataset.price)):0),0),I=!!(T&&(u?.dataset.discountPrice||Array.from(p).some(x=>x.classList.contains("active-additive-btn")&&x.dataset.discountPrice)));r=v+M,h&&(h.textContent=`$${r.toFixed(2)}`),I?(w?.classList.remove("display-none"),w&&(w.textContent=`$${(A+k).toFixed(2)}`)):w?.classList.add("display-none")};o?.classList.remove("display-none"),S(!0,o);const m=await ee(n);console.log(m),S(!1,o),te(m,s,T),l();const P=document.querySelector(".modal-close-btn"),q=document.querySelector(".size-buttons-container"),i=document.querySelector(".additive-buttons-container"),p=document.querySelectorAll(".additive-btn"),y=document.querySelectorAll(".size-btn"),h=document.querySelector(".total-price"),w=document.querySelector(".original-price");q?.addEventListener("click",u=>{console.log("Fired");const v=u.target.closest(".size-btn");if(!v)return;q.querySelectorAll(".size-btn").forEach(M=>M.classList.remove("active-size-btn")),v.classList.add("active-size-btn"),c()}),q?.addEventListener("mouseenter",u=>{const v=u.target.closest(".size-btn");v&&W(v,T,"size")},!0),i?.addEventListener("click",u=>{const v=u.target.closest(".additive-btn");v&&(v.classList.toggle("active-additive-btn"),c())}),i?.addEventListener("mouseenter",u=>{const v=u.target.closest(".additive-btn");v&&W(v,T,"additive")},!0),P?.addEventListener("click",f),t?.addEventListener("click",u=>{u.target.classList.contains("overlay")&&f()}),document.addEventListener("keydown",u=>{u.key==="Escape"&&f()})}catch(c){console.log(c),S(!1,o),o?.classList.add("display-none"),se("Something went wrong. Please, try again")}finally{S(!1,o)}}})});function l(){s?.classList.remove("display-none"),o?.classList.remove("display-none"),t?.classList.add("disable-scroll")}function f(){s?.classList.add("display-none"),o?.classList.add("display-none"),t?.classList.remove("disable-scroll")}},V=(t,e,s,o=!1)=>{const n=t.filter(r=>r.category===s);e.innerHTML="",n.forEach((r,l)=>{const f=o&&!!r.discountPrice,d=`
      <div class="product-item ${s}-product-item flex-col cursor-pointer ${l>3?"hidden-product":""}" 
        data-product-id="${r.id}">
        <div class="img-box">
          <img class="product-img w-full h-full" src="./assets/${r.id}.png" alt="${r.name} image" />
        </div>
        <div class="product-desc flex-col justify-between dark-txt pd-20">
          <p class="coffee-name heading-3-font weight-600 mb-12">${r.name}</p>
          <p class="product-desc-txt medium-font weight-400 mb-auto">
            ${r.description}
          </p>
          <div class='product-price-wrapper flex-row align-center justify-start'>
            <p
              class="product-price-original heading-3-font weight-600 ${f?"":"display-none"}"
            >
              $${r.price}
            </p>
            <p
              class="product-price heading-3-font dark-txt weight-600"
            >
              $${f?r.discountPrice:r.price}
            </p>
          </div>
        </div>
      </div>
    `;e?.insertAdjacentHTML("beforeend",d)})},F=C(),ne=async()=>{const t=document.querySelector(".products-wrapper"),e={coffee:document.querySelector(".coffee-products"),tea:document.querySelector(".tea-products"),dessert:document.querySelector(".dessert-products")},s=document.querySelector(".tabs-wrapper"),o=document.querySelectorAll(".tab-item"),n=document.querySelector(".load-btn");let r="coffee";S(!0,t);try{let l=function(a="coffee"){Object.values(e).forEach(m=>{m&&(m.style.display="none")});const c=e[a];c&&(c.style.display="flex"),r=a,V(b,e[r],r,F),g()},f=function(a){o.forEach(c=>{c.dataset.category===a?c.classList.add("active-tab"):c.classList.remove("active-tab")})},d=function(){const a=e[r];if(!a)return;a.querySelectorAll(".hidden-product").forEach(m=>m.classList.remove("hidden-product"))},g=function(){const a=e[r];if(!a)return;const c=window.innerWidth<=768,m=a.querySelectorAll(".hidden-product");n&&(n.style.display=c&&m.length>0?"flex-row":"none")};const b=await U();S(!1,t),s?.classList.remove("display-none"),V(b,e[r],r,F),s?.addEventListener("click",a=>{const c=a.target.closest(".tab-item"),m=c?.dataset?.category;!c||!m||m===r||(l(m),f(m),g(),r=m)}),n?.addEventListener("click",()=>{d(),n.style.display="none"}),window.addEventListener("resize",()=>{g()}),document.addEventListener("DOMContentLoaded",()=>{l(),f(r),g()})}catch(l){console.error(l),S(!1,t),H("Something went wrong. Please, refresh the page",e[r]),s?.classList.add("display-none"),n?.classList.add("display-none")}},D=(t,e)=>{const s=document.querySelector(".nav-items"),o=document.querySelector(".cart-icon-wrapper"),n=`
    <a
      href="cart.html"
      class="cart-icon flex-row gap-8 align-center justify-center"
    >
      <img src="/assets/shopping-bag-desktop.svg" alt="Shopping bag" />
      <span class="cart-items-quantity">4</span>
    </a>`,r=`
    <li class="nav-item--cart">
      <a
        class="cart-nav display-none flex-row align-center gap-8 hover-underline-animation"
        href="cart.html"
        >Cart<img
          class=""
          src="assets/shopping-bag-mobile.svg"
          alt="Shopping bag"
      /></a>
    </li>`;o&&(o.innerHTML=""),s?.querySelector(".nav-item--cart")?.remove(),(e||t>0)&&(o?.insertAdjacentHTML("beforeend",n),s?.insertAdjacentHTML("beforeend",r))},oe=()=>{const t=C();D(0,t),ne(),re()},ie=[{city:"Tbilisi",streets:["Rustaveli Avenue","Agmashenebeli Avenue","Chavchavadze Avenue","Vake Street","Abashidze Street","Melikishvili Street","Tsinamdzgvrishvili Street","Saburtalo Street","Marjanishvili Street","Beliashvili Street"]},{city:"Milan",streets:["Corso Buenos Aires","Via Montenapoleone","Corso Vittorio Emanuele II","Via della Moscova","Via Torino","Via Manzoni","Viale Certosa","Corso Venezia","Via Brera","Corso Magenta"]},{city:"Chicago",streets:["Michigan Avenue","State Street","Wacker Drive","Clark Street","Dearborn Street","LaSalle Street","Madison Street","Randolph Street","Roosevelt Road","Halsted Street"]}],ae=async t=>{try{const e=await fetch(`${N}/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await e.json();if(!e.ok){const o=s?.error||s?.message||"Registration failed. Please, try again.";throw new Error(o)}return s}catch(e){const s=e instanceof Error?e.message:String(e);throw new Error(s)}},ce=(t,e)=>{t&&(t.innerHTML="");const s=e.map(o=>`<option value="${o}" class="select-option">${o}</option>`).join("");t&&(t.innerHTML=s)},X=(t,e)=>{const s=`
    <div class="success-message w-full flex-row gap-6 align-center justify-center medium-font weight-500 txt-align-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0dbb42" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
      <p>${t}</p>
    </div>
  `;e&&(e.innerHTML=s)};function Y(t){return t.trim()?/^[A-Za-z]/.test(t)?t.length<3?"Login must be at least 3 characters long.":/^[A-Za-z0-9]+$/.test(t)?null:"Only English letters and numbers are allowed.":"Login must start with a letter.":"Login is required."}function R(t){return t.trim()?t.length<6?"Password must be at least 6 characters long.":/[!@#$%^&*(),.?":{}|<>]/.test(t)?null:"Password must contain at least one special character.":"Password is required."}function le(t,e){return e.trim()?e.length<6?"Confirm password must be at least 6 characters long.":t!==e?"Passwords do not match.":null:"Please confirm your password."}function de(t){return t.trim()?null:"Please select a city."}function ue(t){return t.trim()?null:"Please select a street."}function me(t){if(!t.trim())return"House number is required.";const e=Number(t);return isNaN(e)?"House number must be a number.":e<=1?"House number must be greater than 1.":null}const pe=async()=>{const t=C();D(0,t);const e=document.querySelector(".register-form"),s={login:document.querySelector(".input-wrapper--login"),password:document.querySelector(".input-wrapper--password"),confirmPassword:document.querySelector(".input-wrapper--confirm-password"),city:document.querySelector(".input-wrapper--city"),street:document.querySelector(".input-wrapper--street"),houseNumber:document.querySelector(".input-wrapper--house-number")},o=document.querySelector(".city-select"),n=document.querySelector(".street-select"),r=document.querySelector(".street-select-options"),l=document.querySelector(".password-input"),f=document.querySelector(".confirm-password-input"),d=document.querySelector(".register-btn"),g=document.querySelector(".result-message-wrapper"),b=document.querySelector(".register-spinner-wrapper");e?.addEventListener("submit",async i=>{i.preventDefault(),S(!0,b),g&&(g.textContent=""),d&&d.classList.add("disabled-btn");const p=i.target,y=new FormData(p),h=Object.fromEntries(y.entries()),w={login:h.login.toString(),password:h.password.toString(),confirmPassword:h.confirmPassword.toString(),city:h.city.toString(),street:h.street.toString(),houseNumber:Number(h.houseNumber),paymentMethod:h.paymentMethod.toString()};try{const u=await ae(w);S(!1,b),X(u.message,g),q(),window.location.href="/login.html"}catch(u){const v=u.message;S(!1,b),H(v,g)}finally{d&&d.classList.remove("disabled-btn")}}),o?.addEventListener("change",i=>{const y=i.target.value,h=ie.find(w=>w.city.toLowerCase()===y.toLowerCase());ce(r,h?h.streets:[]),n.disabled=!1});function a(i,p){const y=u=>{u?(p.classList.add("invalid"),p.classList.remove("valid"),p.setAttribute("data-error",u)):(p.classList.remove("invalid"),p.classList.add("valid"),p.removeAttribute("data-error")),m()},h=p.querySelector("select");if(h){h.addEventListener("change",()=>{y(i(h.value))});return}const w=p.querySelector("input");w&&w.addEventListener("blur",()=>{y(i(w.value))})}function c(){s.login&&a(Y,s.login),s.password&&a(R,s.password),s.confirmPassword&&s.password&&a(i=>{const p=s.password.querySelector("input");return le(p.value,i)},s.confirmPassword),s.city&&a(de,s.city),s.street&&a(ue,s.street),s.houseNumber&&a(me,s.houseNumber)}function m(){const p=Object.values(s).filter(y=>y!==null).every(y=>y.classList.contains("valid"));d&&d.classList.toggle("disabled-btn",!p)}function P(){Object.values(s).forEach(i=>{i?.addEventListener("focus",p=>{p.target.tagName==="INPUT"&&(i.classList.remove("invalid","valid"),i.removeAttribute("data-error"))},!0)})}l?.addEventListener("input",()=>{l.value.trim()?f.disabled=!1:(f.disabled=!0,f.value="")});function q(){e&&e.reset(),Object.values(s).forEach(i=>{i?.classList.remove("valid","invalid"),i?.removeAttribute("data-error")}),o.selectedIndex=0,n.selectedIndex=0,n.disabled=!0,d?.classList.add("disabled-btn")}P(),c()},fe=async t=>{try{const e=await fetch(`${N}/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await e.json();if(!e.ok){const o=s?.error||s?.message||"Incorrect login or password.";throw new Error(o)}return s}catch(e){const s=e instanceof Error?e.message:String(e);throw new Error(s)}},ge=async()=>{const t=C();D(0,t);const e=document.querySelector(".login-form"),s={login:document.querySelector(".input-wrapper--login"),password:document.querySelector(".input-wrapper--password")},o=document.querySelector(".login-btn"),n=document.querySelector(".result-message-wrapper"),r=document.querySelector(".login-spinner-wrapper");e?.addEventListener("submit",async a=>{a.preventDefault(),S(!0,r),n&&(n.textContent=""),o&&o.classList.add("disabled-btn");const c=a.target,m=new FormData(c),P=Object.fromEntries(m.entries()),q={login:P.login.toString(),password:P.password.toString()};try{const i=await fe(q);console.log(i),S(!1,r),X(i.message,n),g(i),b(),window.location.href="/menu.html"}catch(i){const p=i.message;S(!1,r),H(p,n)}finally{o&&o.classList.remove("disabled-btn")}});function l(a,c){const m=q=>{q?(c.classList.add("invalid"),c.classList.remove("valid"),c.setAttribute("data-error",q)):(c.classList.remove("invalid"),c.classList.add("valid"),c.removeAttribute("data-error")),d()},P=c.querySelector("input");P&&P.addEventListener("blur",()=>{m(a(P.value))})}function f(){s.login&&l(Y,s.login),s.password&&l(R,s.password)}function d(){const c=Object.values(s).filter(m=>m!==null).every(m=>m.classList.contains("valid"));o&&o.classList.toggle("disabled-btn",!c)}f();function g(a){localStorage.clear(),localStorage.setItem("user",JSON.stringify(a.data))}function b(){e?.reset(),Object.values(s).forEach(a=>{a?.classList.remove("valid","invalid"),a?.removeAttribute("data-error")}),o?.classList.add("disabled-btn")}},ve=async()=>{const t=C();D(0,t)},j=document.body.dataset.page;j==="home"&&Q();j==="menu"&&oe();j==="register"&&pe();j==="login"&&ge();j==="cart"&&ve();K();
