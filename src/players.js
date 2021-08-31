import { Repository } from "./repository.js";

let form;

document
  .querySelector(".items-container")
  .addEventListener("click", async (e) => {
    const id = Number(e.target.id);

    // Delete handler
    if (e.target.id.startsWith("deleteBtn")) {
      const id = Number(e.target.id.substring(10));
      Repository.deletePlayer(id);
      return;
    }

    // Edit handler
    if (e.target.id.startsWith("editBtn")) {
      const id = Number(e.target.id.substring(8));
      const itemContainer = e.target.parentElement.parentElement;
      const playerToEdit = findPlayer(id);

      itemContainer.innerHTML = `
      <button class="cancel-btn" id="cancelBtn" type="button">X</button> 
      <form class="new-item-form">
      <input hidden type="number" name="id" id="id" value="${playerToEdit.id}">
        <label>
            <span>Change main image</span>
            <input hidden type="file" name="image" id="image">
            <button type="button" onclick="document.getElementById('image').click()">Choose file...</button>
        </label>
        <label>
            <span>Name</span>
            <input type="text" name="name" placeholder="Add player name" id="name" value="${playerToEdit.name}">
        </label>
        <label>
            <span>Surname</span>
            <input type="text" name="surname" placeholder="Add player surname" id="surname" value="${playerToEdit.surname}">
        </label>
        <label>
            <span>Upload jerseys</span>
            <input hidden type="file" name="jerseys" id="jerseys" multiple>
            <button type="button" onclick="document.getElementById('jerseys').click()">Choose files...</button>
        </label>
        <button class="form__submit-btn" id="updatePlayerBtn" type="button">Update</button>
    </form>
      `;

      // if(form) {

      // }
      form = document.querySelector(".new-item-form");

      return;
    }

    // Add new item click handler
    if (e.target.classList.contains("item--new")) {
      e.target.innerHTML = `
    <button class="cancel-btn" id="cancelBtn" type="button">X</button> 
    <form class="new-item-form">
        <label>
            <span>Upload main image</span>
            <input hidden type="file" name="image" id="image">
            <button type="button" onclick="document.getElementById('image').click()">Choose file...</button>
        </label>
        <label>
            <span>Name</span>
            <input type="text" name="name" id="name">
        </label>
        <label>
            <span>Surname</span>
            <input type="text" name="surname" id="surname">
        </label>
        <label>
            <span>Upload jerseys</span>
            <input hidden type="file" name="jerseys" id="jerseys" multiple>
            <button type="button" onclick="document.getElementById('jerseys').click()">Choose files...</button>
        </label>
        <button class="form__submit-btn" id="addNewPlayerBtn" type="button">Submit</button>
    </form>`;

      form = document.querySelector(".new-item-form");
      return;
    }

    // Active item change handler
    if (
      !e.target.classList.contains("item--new") &&
      e.target.classList.contains("items-container__item") &&
      activePlayerIdChange.id !== id
    ) {
      activePlayerIdChange.id = Number(e.target.id);
      return;
    }

    // Add new player form handler
    if (e.target.id === "addNewPlayerBtn") {
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

      return;
    }

    // Update existing player handler
    if (e.target.id === "updatePlayerBtn") {
      const id = form.elements.id.valueAsNumber;
      const player = findPlayer(id);
      const name = form.elements.name.value;
      const surname = form.elements.surname.value;
      const img = (await toBase64(form.elements.image.files[0])) ?? player.img;
      const jerseys = form.elements.jerseys.files.length
        ? await Promise.all(
            Array.from(form.elements.jerseys.files).map(async (file) => {
              return {
                title: file.name,
                img: await toBase64(file),
              };
            })
          )
        : player.jerseys;

      const response = await Repository.updatePlayer(
        {
          name,
          surname,
          img,
          jerseys,
        },
        id
      );

      return;
    }

    // Cancel edit or insert
    if (e.target.id === "cancelBtn") {
      const parentElem = e.target.parentElement;
      if (parentElem.classList.contains("item--new")) {
        const content = getNewItemContent();

        parentElem.innerHTML = "";
        parentElem.append(...content);
      } else {
        const id = Number(parentElem.id);
        const player = findPlayer(id);
        const content = getItemContent(player);

        parentElem.innerHTML = "";
        parentElem.append(...content);
      }
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
    const html = getPlayerItemHtml(player);
    itemsContainer.appendChild(html);
  });

  itemsContainer.appendChild(addNewItemPlaceholder());
  itemsContainer.firstElementChild.click();
  itemsContainer.firstElementChild.focus();
}

function getPlayerItemHtml(player) {
  const div = createItemDiv(player);
  const content = getItemContent(player);

  div.append(...content);

  return div;
}

function createItemDiv(player) {
  const div = document.createElement("div");
  div.classList.add("items-container__item");
  div.tabIndex = 0;
  div.id = player.id;

  return div;
}

function getItemContent(player) {
  const actions = createActionsElements(player.id);
  const img = createImgElement(player);
  const span = createSpanElement(player);

  return [actions, img, span];
}

function getNewItemContent() {
  const img = document.createElement("img");
  img.classList.add("plus--small");

  img.src = "assets/plus.svg";
  img.alt = "Add new item";

  const span = document.createElement("span");
  span.innerHTML = "Add new item";

  return [img, span];
}

function createActionsElements(id) {
  const div = document.createElement("div");
  div.classList.add("item__actions");

  const editBtn = document.createElement("button");
  editBtn.id = `editBtn-${id}`;
  editBtn.classList.add("small-icon-btn");
  editBtn.classList.add("small-margin-right");

  const pencilImg = document.createElement("img");
  pencilImg.classList.add("pencil");
  pencilImg.src = "assets/pencil.svg";

  editBtn.appendChild(pencilImg);

  const deleteBtn = document.createElement("button");
  deleteBtn.id = `deleteBtn-${id}`;
  deleteBtn.classList.add("small-icon-btn");

  const trashImg = document.createElement("img");
  trashImg.classList.add("trash");
  trashImg.src = "assets/trash.svg";

  deleteBtn.appendChild(trashImg);

  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

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

  const content = getNewItemContent();

  div.append(...content);
  return div;
}

const findPlayer = (id) => {
  return players.find((player) => player.id === id);
};

initializePlayers();
