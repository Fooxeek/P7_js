import { recipes } from "../../data/recipes.js";
import { updateRecipeCount } from "./updateRecipeCount.js";

export function filterRecipesBySelections(selections) {
  const filteredRecipes = [];
  for (const recipe of recipes) {
    if (
      filterByIngredients(recipe, selections.ingredients) &&
      filterByAppareils(recipe, selections.appareils) &&
      filterByUstensiles(recipe, selections.ustensiles)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  // Mise à jour du nombre de recettes
  updateRecipeCount(filteredRecipes.length);

  return filteredRecipes;
}

function filterByAppareils(recipe, selectedAppareils) {
  if (selectedAppareils.size === 0) return true;
  return selectedAppareils.has(recipe.appliance);
}

function filterByIngredients(recipe, selectedIngredients) {
  if (selectedIngredients.size === 0) return true;

  for (const ingredient of selectedIngredients) {
    let ingredientFound = false;
    for (const recipeIngredient of recipe.ingredients) {
      if (recipeIngredient.ingredient === ingredient) {
        ingredientFound = true;
        break;
      }
    }
    if (!ingredientFound) return false;
  }
  return true;
}

function filterByUstensiles(recipe, selectedUstensiles) {
  if (selectedUstensiles.size === 0) return true;

  for (const ustensile of selectedUstensiles) {
    if (!recipe.ustensils.includes(ustensile)) {
      return false;
    }
  }
  return true;
}
