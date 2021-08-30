import { Repository } from "./repository.js";

let form;

document
  .querySelector(".items-container")
  .addEventListener("click", async (e) => {
    const id = Number(e.target.id);
    if (
      !e.target.classList.contains("item--new") &&
      e.target.classList.contains("items-container__item") &&
      activePlayerIdChange.id !== id
    ) {
      activePlayerIdChange.id = Number(e.target.id);
    } else if (e.target.id === "submitBtn") {
      const name = form.elements.name.value;
      const surname = form.elements.surname.value;
      const img = await toBase64(form.elements.image.files[0]);
      const jerseys = await Promise.all(
        Array.from(form.elements.jerseys.files).map(async (file) => {
          return {
            title: file.name,
            img: await toBase64(file),
          };
        })
      );

      if (!name || !surname || !img || !jerseys.length) {
        alert("All values must be set!");
        return;
      }
      const response = await Repository.insertPlayer({
        name,
        surname,
        img,
        jerseys,
      });
      console.log(response);
    } else if (e.target.classList.contains("item--new")) {
      e.target.innerHTML = ` 
    <form class="new-item-form">
        <label>
            <span>Upload main image</span>
            <input required type="file" name="image" id="image">
        </label>
        <label>
            <span>Name</span>
            <input required type="text" name="name" id="name">
        </label>
        <label>
            <span>Surname</span>
            <input required type="text" name="surname" id="surname">
        </label>
        <label>
            <span>Upload jerseys</span>
            <input required type="file" name="jerseys" id="jerseys" multiple>
        </label>
        <button id="submitBtn" type="button">Submit</button>
    </form>`;

      form = document.querySelector(".new-item-form");
    }
  });

activePlayerIdChange.listenForChanges((id) => {
  const itemElements = document.querySelectorAll(".items-container__item");
  for (const item of itemElements) {
    if (Number(item.id) === id) {
      item.classList.add("items-container__item--active");
    } else {
      item.classList.remove("items-container__item--active");
    }
  }
});

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(undefined);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const finalBase64 = dropSignature(reader.result);
      resolve(finalBase64);
    };
    reader.onerror = (error) => reject(error);
  });

const dropSignature = (base64) => {
  const indexFrom = base64.indexOf("64,") + 3;
  return base64.substring(indexFrom);
};

const itemsContainer = document.querySelector(".items-container");
async function initializePlayers() {
  players = await Repository.getPlayers();

  renderPlayers();
}

function renderPlayers() {
  players.forEach((player) => {
    const div = createDivElement(player);
    const img = createImgElement(player);
    const span = createSpanElement(player);

    div.appendChild(img);
    div.appendChild(span);

    itemsContainer.appendChild(div);
  });

  itemsContainer.appendChild(addNewItemPlaceholder());
  itemsContainer.firstElementChild.click();
  itemsContainer.firstElementChild.focus();
}

function createDivElement(player) {
  const div = document.createElement("div");
  div.classList.add("items-container__item");
  div.tabIndex = 0;
  div.id = player.id;

  return div;
}

function createImgElement(player) {
  const img = document.createElement("IMG");
  img.src = `data:;base64,${player.img}`;
  img.alt = player.fullName;

  return img;
}

function createSpanElement(player) {
  const span = document.createElement("span");
  span.innerHTML = player.fullName;

  return span;
}

function addNewItemPlaceholder() {
  const div = document.createElement("div");
  div.classList.add("items-container__item");
  div.classList.add("item--new");
  div.tabIndex = 0;

  const img = document.createElement("img");
  img.classList.add("plus--small");

  img.src = "assets/plus.svg";
  img.alt = "Add new item";

  const span = document.createElement("span");
  span.innerHTML = "Add new item";

  div.appendChild(img);
  div.appendChild(span);
  return div;
}

initializePlayers();
