export default class Gallery {
  constructor(container) {
    this.container = container;
    this.board = null;
  }

  createGallery() {
    this.gallery = document.createElement("div");
    this.gallery.classList.add("gallery");
    this.bindToDOM();
  }

  static get markup() {
    return `
    <div id="container">
		  <form class="form-box">
      <div class="input-wrapper">
      <label for="lfname">Название:</label> 
			  <input class="input-tooltip input-image-name" type="text" placeholder="Введите название"/>
        </div>
        <div class="input-wrapper">
        <label for="lfname">Ссылка:</label> 
			  <input class="input-tooltip input-image-url" type="text" placeholder="Введите url-адрес"/>
        </div>
			  <button class="image__add-button">Добавить</button>
		  </form>
		  <div class="gallery-wrapper"></div>
		</div>
	</div>`;
  }

  bindToDOM() {
    this.container.insertAdjacentHTML("afterbegin", this.constructor.markup);
  }
}
