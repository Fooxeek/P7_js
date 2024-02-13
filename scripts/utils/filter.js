import { recipes } from "../../data/recipes.js";
import { updateRecipeCount } from "./updateRecipeCount.js";
import { displayFilteredRecipes } from "../index/index.js";
import { updateIngredientsList } from "../template/ingredients.js";
import { updateAppareilsList } from "../template/appareils.js";
import { updateUstensilsList } from "../template/ustensiles.js";

export let currentFilteredRecipes = [...recipes]; // Commencez avec toutes les recettes

export function filterRecipes(query) {
  currentFilteredRecipes = recipes.filter((recipe) => {
    let titleMatch = recipe.name.toLowerCase().includes(query.toLowerCase());
    let descriptionMatch = recipe.description
      .toLowerCase()
      .includes(query.toLowerCase());
    let ingredientMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
    );

    return titleMatch || descriptionMatch || ingredientMatch;
  });

  // Mettez à jour l'affichage des recettes ici
  displayFilteredRecipes(currentFilteredRecipes);
  updateIngredientsList();
  updateAppareilsList();
  updateUstensilsList();

  return currentFilteredRecipes;
}
export function filterRecipesBySelections(selections) {
  if (selections.appareils.size > 1) {
    return [];
  }

  const filteredRecipes = currentFilteredRecipes.filter(
    (recipe) =>
      filterByIngredients(recipe, selections.ingredients) &&
      filterByAppareils(recipe, selections.appareils) &&
      filterByUstensiles(recipe, selections.ustensiles)
  );

  displayFilteredRecipes(filteredRecipes);
  updateRecipeCount(filteredRecipes.length);
  return filteredRecipes;
}

function filterByAppareils(recipe, selectedAppareils) {
  // Si aucun appareil n'est sélectionné, la recette passe le filtre
  if (selectedAppareils.size === 0) return true;
  // La recette passe le filtre si son appareil est dans les appareils sélectionnés
  return selectedAppareils.has(recipe.appliance);
}

function filterByIngredients(recipe, selectedIngredients) {
  return [...selectedIngredients].every((selectedIngredient) =>
    recipe.ingredients.some(
      (ingredient) => ingredient.ingredient === selectedIngredient
    )
  );
}

function filterByUstensiles(recipe, selectedUstensiles) {
  return [...selectedUstensiles].every((selectedUstensile) =>
    recipe.ustensils.includes(selectedUstensile)
  );
}
