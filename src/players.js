import { Repository } from "./repository.js";

document.querySelector(".items-container").addEventListener("click", (e) => {
  if (
    e.target.classList.contains("items-container__item") &&
    activePlayerIdChange.id !== Number(e.target.id)
  ) {
    activePlayerIdChange.id = Number(e.target.id);
  } else if (
    e.target.parentElement.classList.contains("items-container__item") &&
    activePlayerIdChange.id !== Number(e.target.parentElement.id)
  ) {
    activePlayerIdChange.id = Number(e.target.parentElement.id);
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

initializePlayers();
