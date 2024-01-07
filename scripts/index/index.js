import { recipes } from "../../data/recipes.js";
import { Header } from "../template/header.js";
import { getRecipeCard } from "../template/card.js";
import { getIngredients } from "../template/ingredients.js";
import { getAppareils } from "../template/appareils.js";
import { getUstensiles } from "../template/ustensiles.js";
import { filterRecipesBySelections } from "../utils/filter.js";
import { selections } from "../template/selections.js";

function displayData(recipes) {
  const recipeSection = document.getElementById("recipes__cards");
  recipeSection.innerHTML = "";
  recipes.forEach(recipe => {
    recipeSection.appendChild(getRecipeCard(recipe));
  });
}

function initFilters() {
  const filterSection = document.getElementById("filters");
  filterSection.appendChild(getIngredients(updateFilteredData));
  filterSection.appendChild(getAppareils(updateFilteredData));
  filterSection.appendChild(getUstensiles(updateFilteredData));
}

export function updateFilteredData() {
  const filteredRecipes = filterRecipesBySelections(selections);
  displayData(filteredRecipes);
}

function init() {
  displayData(recipes);
  Header();
  initFilters();
}

init();


