import { currentFilteredRecipes } from "../utils/filter.js";
import { selections, updateGlobalTags } from "./selections.js";
import { updateFilteredData } from "../index/index.js";

// Variables globales pour les éléments de l'interface
let searchInput, filteredChoicesDiv, searchIcon, crossIcon;

// Initialisation de la liste des ingrédients
let choices = [];

// Mise à jour de la liste des ingrédients basée sur les recettes filtrées
export function updateIngredientsList() {
  choices = getIngredientsList();
  updateFilteredChoices();
}

// Récupération de la liste des ingrédients
function getIngredientsList() {
  const ingredients = new Set();
  currentFilteredRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
  });
  return Array.from(ingredients);
}

// Affichage des ingrédients filtrés
function updateFilteredChoices(filteredChoices = choices) {
  filteredChoicesDiv.innerHTML = filteredChoices
    .map((choice) => {
      const isSelected = selections.ingredients.has(choice);
      return `<span class="filter-choice ${
        isSelected ? "selected" : ""
      }" data-ingredient="${choice}">${choice}</span>`;
    })
    .join("");

  attachClickEventsToChoices();
}

// Filtrage des ingrédients selon la saisie
function filterChoices(inputValue) {
  return choices.filter((choice) =>
    choice.toLowerCase().includes(inputValue.toLowerCase())
  );
}

// Gestion de la sélection d'ingrédients
function toggleIngredientSelection(ingredient) {
  if (selections.ingredients.has(ingredient)) {
    selections.ingredients.delete(ingredient);
  } else {
    selections.ingredients.add(ingredient);
  }

  const tagSection = document.getElementById("tags");
  updateGlobalTags(tagSection);
  updateFilteredData();
}

// Ajout d'événements aux choix d'ingrédients
function attachClickEventsToChoices() {
  const choiceElements = filteredChoicesDiv.querySelectorAll(".filter-choice");
  choiceElements.forEach((element) => {
    element.onclick = () => {
      const ingredient = element.getAttribute("data-ingredient");
      toggleIngredientSelection(ingredient);
    };
  });
}

// Création et configuration des éléments du filtre d'ingrédients
export function getIngredients() {
  const container = document.createElement("div");
  container.classList.add("filter__ingredients");

  const button = document.createElement("button");
  button.classList.add("dropdown__button");
  button.textContent = "Ingrédients";

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

  // Ajout de l'écouteur d'événements au bouton pour afficher/masquer les éléments
  button.addEventListener("click", () => {
    const colorFilter = document.querySelector(".filter__ingredients");
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

  updateIngredientsList(); // Initialisation des ingrédients

  return container;
}
