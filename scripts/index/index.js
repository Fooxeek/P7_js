import { recipes } from "../../data/recipes.js";
import { Header } from "../template/header.js";
import { getRecipeCard } from "../template/card.js";
import { getIngredients } from "../template/ingredients.js";
import { getAppareils } from "../template/appareils.js";
import { getUstensiles } from "../template/ustensiles.js";
import { filterRecipesBySelections } from "../utils/filter.js";
import { updateRecipeCount } from "../utils/updateRecipeCount.js";
import { selections } from "../template/selections.js";
import { updateIngredientsList } from "../template/ingredients.js";
import { updateAppareilsList } from "../template/appareils.js";
import { updateUstensilsList } from "../template/ustensiles.js";

function displayData(recipes) {
  const recipeSection = document.getElementById("recipes__cards");
  recipeSection.innerHTML = "";
  recipes.forEach((recipe) => {
    recipeSection.appendChild(getRecipeCard(recipe));
  });
}

export function displayFilteredRecipes(filteredRecipes) {
  const recipeSection = document.getElementById("recipes__cards");
  recipeSection.innerHTML = ""; // Vide la section des recettes actuelles

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipeCard = getRecipeCard(filteredRecipes[i]); // Utilisez votre fonction existante pour créer une carte de recette
    recipeSection.appendChild(recipeCard); // Ajoutez la carte de recette à la section
  }

  updateRecipeCount(filteredRecipes.length);
}

function initFilters() {
  const filterSection = document.getElementById("filters");
  filterSection.appendChild(getIngredients(updateFilteredData));
  filterSection.appendChild(getAppareils(updateFilteredData));
  filterSection.appendChild(getUstensiles(updateFilteredData));
}

export function updateFilteredData() {
  // Filtrer les recettes en fonction des sélections actuelles
  const filteredRecipes = filterRecipesBySelections(selections);

  // Afficher les recettes filtrées
  displayData(filteredRecipes);

  // Mettre à jour les comptes des recettes filtrées
  updateRecipeCount(filteredRecipes.length);

  updateIngredientsList();

  updateAppareilsList();

  updateUstensilsList();
}

function init() {
  displayData(recipes);
  Header();
  initFilters();
}

init();
