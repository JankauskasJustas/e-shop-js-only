import { Carousel } from "./carousel.js";
import { Players } from "./players.js";

document
  .querySelector(".items-container")
  .addEventListener("click", async (e) => {
    const id = Number(e.target.id);

    // Delete handler
    if (e.target.id.startsWith("deleteBtn")) {
      Players.deletePlayer(e);
    }
    // Edit handler
    if (e.target.id.startsWith("editBtn")) {
      Players.startEditingPlayer(e);
    }
    // Add new item click handler
    if (e.target.classList.contains("item--new")) {
      Players.startCreatingNewItem(e);
    }
    // Active item change handler
    if (
      !e.target.classList.contains("item--new") &&
      e.target.classList.contains("items-container__item") &&
      activePlayerIdChange.id !== id
    ) {
      Players.activeItemChange(id);
    }
    // Add new player form handler
    if (e.target.id === "addNewPlayerBtn") {
      await Players.addNewPlayer();
    }
    // Update existing player handler
    if (e.target.id === "updatePlayerBtn") {
      await Players.updatePlayer();
    }
    // Cancel edit or insert
    if (e.target.id === "cancelBtn") {
      Players.cancelEditing(e);
    }
  });

document
  .getElementById("carousel__button--next")
  .addEventListener("click", () => {
    Carousel.moveToNextSlide();
  });

document
  .getElementById("carousel__button--prev")
  .addEventListener("click", () => {
    Carousel.moveToPrevSlide();
  });
