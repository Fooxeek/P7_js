import { currentFilteredRecipes } from "../utils/filter.js";
import { selections, updateGlobalTags } from "./selections.js";
import { updateFilteredData } from "../index/index.js";

// Variables globales pour les éléments de l'interface
let searchInput, filteredChoicesDiv, searchIcon, crossIcon;

// Initialisation de la liste des ingrédients
let choices = [];

// Mise à jour de la liste des ingrédients basée sur les recettes filtrées
export function updateAppareilsList() {
  choices = getAppareilsList();
  updateFilteredChoices();
}

function getAppareilsList() {
  const appareils = new Set();
  currentFilteredRecipes.forEach((recipe) => {
    appareils.add(recipe.appliance);
  });
  return Array.from(appareils);
}

function updateFilteredChoices(filteredChoices = choices) {
  filteredChoicesDiv.innerHTML = filteredChoices
    .map((choice) => {
      const isSelected = selections.appareils.has(choice);
      return `<span class="filter-choice ${
        isSelected ? "selected" : ""
      }" data-appareils="${choice}">${choice}</span>`;
    })
    .join("\n");

  attachClickEventsToChoices();
}

function filterChoices(searchInputValue) {
  return choices.filter((choice) =>
    choice.toLowerCase().includes(searchInputValue.toLowerCase())
  );
}

function toggleApplianceSelection(appliance) {
  if (selections.appareils.has(appliance)) {
    selections.appareils.delete(appliance);
  } else {
    selections.appareils.add(appliance);
  }
  updateFilteredChoices();
  const tagSection = document.getElementById("tags");
  updateGlobalTags(tagSection);
  updateFilteredData();
}

function attachClickEventsToChoices() {
  const choiceElements = filteredChoicesDiv.querySelectorAll(".filter-choice");
  choiceElements.forEach((element) => {
    element.onclick = () => {
      const appareil = element.getAttribute("data-appareils");
      toggleApplianceSelection(appareil);
    };
  });
}

export function getAppareils() {
  const container = document.createElement("div");
  container.classList.add("filter__appareils");

  const button = document.createElement("button");
  button.classList.add("dropdown__button");
  button.textContent = "Appareils";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "dropdown__logo");
  svg.setAttribute("width", "15");
  svg.setAttribute("height", "8");
  svg.setAttribute("viewBox", "0 0 15 8");
  svg.setAttribute("fill", "none");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M1 1L7.5 7L14 1");
  path.setAttribute("stroke", "#1B1B1B");
  path.setAttribute("stroke-linecap", "round");
  svg.appendChild(path);

  // Ajoute le SVG au bouton
  button.appendChild(svg);

  const searchInputContainer = document.createElement("div");
  searchInputContainer.classList.add("search-input-container");

  searchIcon = document.createElement("img");
  searchIcon.src = "../../assets/img/search_grey.svg";
  searchIcon.classList.add("search-icon");
  searchIcon.style.display = "none";

  searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.style.display = "none";

  crossIcon = document.createElement("img");
  crossIcon.src = "../../assets/img/cross.svg";
  crossIcon.classList.add("cross-icon");
  crossIcon.style.display = "none";

  filteredChoicesDiv = document.createElement("div");
  filteredChoicesDiv.classList.add("filtered-choices");
  filteredChoicesDiv.style.display = "none";

  button.addEventListener("click", function () {
    const colorFilter = document.querySelector(".filter__appareils");
    const isInputVisible = searchInput.style.display === "block";

    if (isInputVisible) {
      colorFilter.style.backgroundColor = "";
      searchInput.style.display = "none";
      filteredChoicesDiv.style.display = "none";
      searchIcon.style.display = "none";
    } else {
      colorFilter.style.backgroundColor = "#FFF";
      searchInput.style.display = "block";
      filteredChoicesDiv.style.display = "flex";
      searchIcon.style.display = "block";
      searchInput.focus();
    }

    updateFilteredChoices();
  });

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value;
    crossIcon.style.display = searchValue ? "block" : "none";
    const filteredChoices = filterChoices(searchValue);
    updateFilteredChoices(filteredChoices);
  });

  crossIcon.addEventListener("click", function () {
    searchInput.value = "";
    crossIcon.style.display = "none";
    updateFilteredChoices(choices);
  });

  searchInputContainer.appendChild(searchInput);
  searchInputContainer.appendChild(searchIcon);
  searchInputContainer.appendChild(crossIcon);

  container.appendChild(button);
  container.appendChild(searchInputContainer);
  container.appendChild(filteredChoicesDiv);

  updateAppareilsList();

  return container;
}
