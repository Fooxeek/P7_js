import { recipes } from "../../data/recipes.js";
import { Header } from "../template/header.js";
import { getRecipeCard } from "../template/card.js";
import { getIngredients } from "../template/ingredients.js";
import { getAppareils } from "../template/appareils.js";
import { getUstensiles } from "../template/ustensiles.js";

function displayData(recipes) {
  const recipeSection = document.getElementById("recipes__cards");
  recipeSection.innerHTML = "";
  for (const recipe of recipes) {
    const recipeCard = getRecipeCard(recipe);
    recipeSection.appendChild(recipeCard);
  }

  Header();
  const filterSection = document.getElementById("filters");
  const ingredients = getIngredients();
  filterSection.appendChild(ingredients);
  const appareils = getAppareils();
  filterSection.appendChild(appareils);
  const ustensiles = getUstensiles();
  filterSection.appendChild(ustensiles);
}

function init() {
  displayData(recipes);
}

init();
