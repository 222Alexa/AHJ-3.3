(()=>{"use strict";class t{constructor(t,e){this.name=t,this.url=e}init(){this.bindToDOM()}static template(t,e){return`\n    <div class="image-box">\n      <h3 class="image__title">${t}</h3>\n      <div class="image-card" data-url="${e}">\n        \n    </div>\n      <button class="image-card__del">X</button>\n  </div>\n\n`}bindToDOM(){const t=document.querySelector(".gallery-wrapper"),e=this.addTask(this.name,this.url);t.insertAdjacentHTML("beforeend",e)}addTask(){const t=document.querySelector(".input-image-name"),e=document.querySelector(".input-image-url");if(this.name=t.value.trim(),this.url=e.value.trim(),this.name&&this.url){return this.constructor.template(this.name,this.url)}return!1}}class e{getPinCards(){return JSON.parse(localStorage.getItem("imageCards"))||[]}save(t){localStorage.setItem("imageCards",JSON.stringify(t))}}class i{constructor(t){this.container=t}init(){this.bindToDOM()}static get markUp(){return'\n\t<div class="tooltip">\n\t\t<div class="tooltip_content">\n\t\t\t<h3 class="tooltip_title"></h3>\n\t\t\t<p class="tooltip_text"></p>\n\t\t</div>\n</div>\n'}get tooltip(){return this.container.querySelector(".tooltip")}get tooltipText(){return this.container.querySelector(".tooltip_text")}set tooltipText(t){return this.container.querySelector(".tooltip_text").textContent=t}bindToDOM(){this.container.insertAdjacentHTML("beforeend",this.constructor.markUp)}}const n=document.querySelector("#gallery-container"),r=new class{constructor(t){this.container=t,this.board=null}createGallery(){this.gallery=document.createElement("div"),this.gallery.classList.add("gallery"),this.bindToDOM()}static get markup(){return'\n    <div id="container">\n\t\t  <form class="form-box">\n      <div class="input-wrapper">\n      <label for="lfname">Название:</label> \n\t\t\t  <input class="input-tooltip input-image-name" type="text" placeholder="Введите название"/>\n        </div>\n        <div class="input-wrapper">\n        <label for="lfname">Ссылка:</label> \n\t\t\t  <input class="input-tooltip input-image-url" type="text" placeholder="Введите url-адрес"/>\n        </div>\n\t\t\t  <button class="image__add-button">Добавить</button>\n\t\t  </form>\n\t\t  <div class="gallery-wrapper"></div>\n\t\t</div>\n\t</div>'}bindToDOM(){this.container.insertAdjacentHTML("afterbegin",this.constructor.markup)}}(n),a=new class{constructor(t){this.gallery=t,this.state=[]}init(){this.gallery.createGallery(),this.container=document.querySelector("#container"),this.addSubscribe(this.container),this.storage=new e,this.state=this.storage.getPinCards(),this.loadState(this.state)}addSubscribe(t){t.addEventListener("click",this.onClickAddCard.bind(this)),t.addEventListener("click",this.onClickDeleteCard.bind(this)),t.addEventListener("keyup",this.keyUp.bind(this)),t.addEventListener("click",this.completionField.bind(this)),t.addEventListener("input",this.completionField.bind(this)),t.addEventListener("mouseover",(t=>this.preview(t))),t.addEventListener("mouseout",(t=>this.cancelPreview(t)))}renderingCard(e,i){const n=document.createElement("img");n.src=i.value,n.alt=e.value,n.onerror=()=>{this.addTooltyp(i.parentElement).tooltipText="Некорректный url",i.nextElementSibling.style.top="80px",this.cardName.value=e.value},n.onload=()=>{const e=(new t).constructor.template(n.alt,n.src);document.querySelector(".gallery-wrapper").insertAdjacentHTML("beforeend",e);const i=[...document.querySelectorAll(".image__title")].find((t=>t.textContent===n.alt));n.classList.add("picture"),i.nextElementSibling.append(n),this.saveCard(new t(n.alt,n.src))},e.value="",i.value=""}preview(t){if(!t.target.classList.contains("picture"))return;t.target.parentElement.nextElementSibling.classList.add("hidden")}cancelPreview(t){if(!t.target.classList.contains("picture"))return;t.target.parentElement.nextElementSibling.classList.remove("hidden")}completionField(t){t.target.classList.contains("input-tooltip")&&document.querySelector(".tooltip")&&(this.removeTooltip=document.querySelectorAll(".tooltip"),[...this.removeTooltip].forEach((t=>t.remove())))}saveCard(t){this.state.push(t),this.storage.save(this.state)}removeItem(t,e){const i=t.findIndex((t=>t.name===e));this.state.splice(i,1),this.storage.save(this.state)}loadState(e){e&&e.forEach((e=>{const i=(new t).constructor.template(e.name,e.url);document.querySelector(".gallery-wrapper").insertAdjacentHTML("beforeend",i),this.preloadImage(e.name,e.url)}))}validityFields(t){if(""===t.value){if(this.addTooltyp(t.parentElement).tooltipText="Заполните поле",t.classList.contains("input-image-url"))return t.nextElementSibling.style.top="80px",!1;if(t.classList.contains("input-image-name"))return t.nextElementSibling.style.top="35px",!1}if(""!==t.value){if(this.state.find((e=>e.name===t.value))){const e=this.addTooltyp(t.parentElement);return t.nextElementSibling.style.top="35px",e.tooltipText="Такое имя уже используется",!1}}return!0}onClickAddCard(t){if(this.cardName=document.querySelector(".input-image-name"),this.cardUrl=document.querySelector(".input-image-url"),document.querySelector(".tooltip"))return;if(t.preventDefault(),!t.target.classList.contains("image__add-button"))return;const e=this.validityFields(this.cardName),i=this.validityFields(this.cardUrl);e&&i&&(this.renderingCard(this.cardName,this.cardUrl),this.cardUrl.value="")}onClickDeleteCard(t){if(t.preventDefault(),!t.target.classList.contains("image-card__del"))return;const e=t.target.previousElementSibling.firstElementChild.alt;this.removeItem(this.state,e),t.target.parentElement.closest(".image-box").remove()}addTooltyp(t){return this.tooltyp=new i(t),this.tooltyp.init(),this.tooltyp}keyUp(t){t.preventDefault(),document.querySelector(".tooltip")||(this.parentEl=t.target.parentElement,t.target.classList.contains("input-tooltip")&&(this.validityFields(t.target),this.parentEl=t.target.parentElement,this.parentEl.querySelector(".tooltip")&&this.parentEl.querySelector(".tooltip").remove()))}preloadImage(t,e){const i=document.createElement("img");i.src=e,i.alt=t,i.onload=()=>{[...document.querySelectorAll(".image__title")].find((t=>t.textContent===i.alt)).nextElementSibling.append(i),i.classList.add("picture")}}}(r);a.init()})();