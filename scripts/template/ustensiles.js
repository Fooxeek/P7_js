import { currentFilteredRecipes } from "../utils/filter.js";
import { selections, updateGlobalTags } from "./selections.js";
import { updateFilteredData } from "../index/index.js";

// Variables globales pour les éléments de l'interface
let searchInput, filteredChoicesDiv, searchIcon, crossIcon;

// Initialisation de la liste des ingrédients
let choices = [];

export function updateUstensilsList() {
  choices = getUstensilsList();
  updateFilteredChoices();
}

function getUstensilsList() {
  const ustensils = new Set();
  currentFilteredRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });
  return Array.from(ustensils);
}

function updateFilteredChoices(filteredChoices = choices) {
  filteredChoicesDiv.innerHTML = filteredChoices
    .map((choice) => {
      const isSelected = selections.ustensiles.has(choice);
      return `<span class="filter-choice ${
        isSelected ? "selected" : ""
      }" data-ustensiles="${choice}">${choice}</span>`;
    })
    .join("\n");

  attachClickEventToChoices();
}

function filterChoices(searchInputValue) {
  const searchLower = searchInputValue.toLowerCase();
  const filtered = [];
  for (const choice of choices) {
    if (choice.includes(searchLower)) {
      filtered.push(choice);
    }
  }
  return filtered;
}

function toggleUstensilSelection(ustensil) {
  if (selections.ustensiles.has(ustensil)) {
    selections.ustensiles.delete(ustensil);
  } else {
    selections.ustensiles.add(ustensil);
  }
  updateFilteredChoices();
  const tagSection = document.getElementById("tags");
  updateGlobalTags(tagSection);
  updateFilteredData();
}

function attachClickEventToChoices() {
  filteredChoicesDiv
    .querySelectorAll(".filter-choice")
    .forEach((choiceElement) => {
      choiceElement.addEventListener("click", function () {
        const ustensil = this.getAttribute("data-ustensiles");
        toggleUstensilSelection(ustensil);
      });
    });
}

export function getUstensiles() {
  const container = document.createElement("div");
  container.classList.add("filter__ustensiles");

  const button = document.createElement("button");
  button.classList.add("dropdown__button");
  button.textContent = "Ustensiles";
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

  crossIcon = document.createElement("img");
  crossIcon.src = "../../assets/img/cross.svg";
  crossIcon.classList.add("cross-icon");
  crossIcon.style.display = "none";

  searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.style.display = "none";

  filteredChoicesDiv = document.createElement("div");
  filteredChoicesDiv.classList.add("filtered-choices");
  filteredChoicesDiv.style.display = "none";

  button.addEventListener("click", function () {
    const colorFilter = document.querySelector(".filter__ustensiles");
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

  updateUstensilsList();

  return container;
}
