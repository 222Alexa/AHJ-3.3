import Card from "./Card";
import Storage from "./Storage";
import Popover from "./Popover";

export default class CardController {
  constructor(gallery) {
    this.gallery = gallery;
    this.state = [];
  }

  init() {
    this.gallery.createGallery();
    this.container = document.querySelector("#container");

    this.addSubscribe(this.container);

    this.storage = new Storage();
    this.state = this.storage.getPinCards();
    this.loadState(this.state);
  }

  addSubscribe(element) {
    element.addEventListener("click", this.onClickAddCard.bind(this));
    element.addEventListener("click", this.onClickDeleteCard.bind(this));
    element.addEventListener("keyup", this.keyUp.bind(this));
    element.addEventListener("click", this.completionField.bind(this));
    element.addEventListener("input", this.completionField.bind(this));
    element.addEventListener("mouseover", (e) => this.preview(e));
    element.addEventListener("mouseout", (e) => this.cancelPreview(e));

  }

  renderingCard(name, url) {
    const image = document.createElement("img");
    image.src = url.value;
    image.alt = name.value;

    image.onerror = () => {
   //не отловить задвоенный тултип, появляется через раз
      const templateTooltip = this.addTooltyp(url.parentElement);

      templateTooltip.tooltipText = "Некорректный url";
      url.nextElementSibling.style.top = "80px";
      this.cardName.value = name.value;
    };

    image.onload = () => {
      const card = new Card();
      const result = card.constructor.template(image.alt, image.src);

      document
        .querySelector(".gallery-wrapper")
        .insertAdjacentHTML("beforeend", result);
      const arrTitles = document.querySelectorAll(".image__title");

      const parent = [...arrTitles].find(
        (elem) => elem.textContent === image.alt
      );
      image.classList.add("picture");
      parent.nextElementSibling.append(image);

      this.saveCard(new Card(image.alt, image.src));
    };

  
    name.value = "";
    url.value = "";
  }

  preview(e) {
    // задержка удаления крестика. или пробовать другое событие
    // или как победить задержку
    if (!e.target.classList.contains("picture")) {
      return;
    }
    const parentImg = e.target.parentElement;
    parentImg.nextElementSibling.classList.add("hidden");
  }

  cancelPreview(e) {
    if (!e.target.classList.contains("picture")) {
      return;
    }
    const parentImg = e.target.parentElement;
    parentImg.nextElementSibling.classList.remove("hidden");
  }

  completionField(e) {
    // заполнеие полей и удаление подсказок пр этом
    if (
      !e.target.classList.contains("input-tooltip") ||
      !document.querySelector(".tooltip")
    ) {
      return;
    }
this.removeTooltip = document.querySelectorAll(".tooltip");
[...this.removeTooltip].forEach(elem => elem.remove());

  }

  saveCard(value) {
    this.state.push(value);
    this.storage.save(this.state);
  }

  removeItem(arr, value) {
    const item = arr.findIndex((elem) => elem.name === value);

    this.state.splice(item, 1);
    this.storage.save(this.state);
  }

  loadState(arr) {
    if (arr) {
      arr.forEach((elem) => {
        const card = new Card();
        const result = card.constructor.template(elem.name, elem.url);

        document
          .querySelector(".gallery-wrapper")
          .insertAdjacentHTML("beforeend", result);

        this.preloadImage(elem.name, elem.url);
      });
    }
  }

  validityFields(field) {
    if (field.value === "") {
      
      const templateTooltip = this.addTooltyp(field.parentElement);

      if (field.classList.contains("input-image-url")) {
        field.nextElementSibling.style.top = "80px";
      }
      if (field.classList.contains("input-image-name")) {
        field.nextElementSibling.style.top = "35px";
      }
      templateTooltip.tooltipText = "Заполните поле";
    }
  }

  onClickAddCard(e) {
    this.cardName = document.querySelector(".input-image-name");
    this.cardUrl = document.querySelector(".input-image-url");
    if (document.querySelector(".tooltip")) {
      return;
    }

    e.preventDefault();

    if (!e.target.classList.contains("image__add-button")) {
      return;
    }

    if (this.cardName.value === "" || this.cardUrl.value === "") {
      //задваивается подсказка в поле url
      this.validityFields(this.cardName);
      this.validityFields(this.cardUrl);
      return;
    }

    this.renderingCard(this.cardName, this.cardUrl);

    this.cardUrl.value = "";
  }

  onClickDeleteCard(e) {
    // Удалить карточку из галереи
    e.preventDefault();

    if (!e.target.classList.contains("image-card__del")) {
      return;
    }

    const name = e.target.previousElementSibling.firstElementChild.alt;

    this.removeItem(this.state, name);
    e.target.parentElement.closest(".image-box").remove();
  }

  addTooltyp(parent) {
    // на чем подключить этот тултип
    this.tooltyp = new Popover(parent);
    this.tooltyp.init();
    return this.tooltyp;
  }

  keyUp(e) {
    // удаление подсказки  по Enter.... карточка и так добавляется...
    if (document.querySelector(".tooltip")) {
      return;
    }
    this.parentEl = e.target.parentElement;
    if (e.target.classList.contains("input-tooltip")) {
      this.parentEl.querySelector(".tooltip")
        ? this.parentEl.querySelector(".tooltip").remove()
        : this.validityFields(e.target);
    }
  }

  preloadImage(alt, url) {
    /**
     * как переработать эту функцию и рендеринг, чтобы и загрузка стейта работала
     * и карточки не путались
     * и те, у которых src не работает сейчас или потом
     * не добавлялись в стейт или удалялись из него при загрузке.
     * и код сократить -
     * ушла думать
     *
     * подумала - оставить карточку(у которой url отвалился уже после добавления в галерею) на доске,
     * сделать надпись - недоступно
     * сделать активной кнопку delet
     *
     */
    const image = document.createElement("img");
    image.src = url;
    image.alt = alt;

    image.onload = () => {
      const arrTitles = document.querySelectorAll(".image__title");

      const parent = [...arrTitles].find(
        (elem) => elem.textContent === image.alt
      );
      parent.nextElementSibling.append(image);
      image.classList.add("picture");
    };
  }
}
// https://im0-tub-ru.yandex.net/i?id=da14fffcba65dd34ce86e3ff6445634d-l&ref=rim&n=13&w=640&h=640
