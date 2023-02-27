var b=Object.defineProperty;var p=(o,t,r)=>t in o?b(o,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):o[t]=r;var m=(o,t,r)=>(p(o,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();const h=()=>{const o=[];for(let t=1;t<=90;t++)o.push(t);return o};class a extends HTMLElement{constructor(){super();m(this,"numbers",[]);this.attachShadow({mode:"open"})}static get styles(){return`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          background: #9e1c23;
          width: 300px;
          height: 225px;
          display: flex;
          flex-direction: column;
        }

        h1 {
          color: #fff;
          text-align: center;
        }

        .numbers {
          flex: 1;
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          grid-template-columns: repeat(5, 1fr);
          gap: 5px;
          padding: 5px;
        }

        .numbers div {
          background: #eee;
          display: grid;
          place-content: center;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .numbers div.checked {
          color:  #54090d;
          text-decoration: line-through;
          background: transparent;
        }
    `}connectedCallback(){this.render(),this.insertNumbersToPlay()}checkCell(r,s){this.shadowRoot.getElementById(r).classList.add("checked"),this.numbers.splice(s,1)}insertNumbersToPlay(){const r=h(),s=this.shadowRoot.querySelector(".numbers");for(let e=0;e<15;e++){const n=Math.floor(Math.random()*r.length),i=r[n];this.numbers.includes(i)?e--:this.numbers.push(r[n])}for(const e of this.numbers){const n=document.createElement("div");n.id=e,n.textContent=e,s.appendChild(n)}}render(){this.shadowRoot.innerHTML=`
        <style>${a.styles}</style>
        <div class="container">
            <h1>${this.getAttribute("name")}</h1>
            <div class="numbers"></div>
        </div>
    `}}customElements.define("bingo-card",a);const c=h(),u=document.querySelector(".number");let f=!1;u.addEventListener("click",()=>{if(c.length!==0&&!f){const o=Math.floor(Math.random()*c.length),t=c[o],r=document.querySelector(".history"),s=document.querySelectorAll("bingo-card");u.textContent=t;const e=document.createElement("div");e.textContent=t,r.appendChild(e);const n=s[0].numbers.findIndex(l=>l===t),i=s[1].numbers.findIndex(l=>l===t);n!==-1&&s[0].checkCell(t,n),i!==-1&&s[1].checkCell(t,i),s[0].numbers.length===0&&s[1].numbers.length===0?d("Empate"):s[0].numbers.length===0?d("Player Wins"):s[1].numbers.length===0&&d("CPU Wins"),c.splice(o,1)}});const d=o=>{u.textContent=o,f=!0};
