// fichier filters.js
import { recipes } from "../../data/recipes.js";
import { updateRecipeCount } from "./updateRecipeCount.js";

export function filterRecipesBySelections(selections) {
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      filterByIngredients(recipe, selections.ingredients) &&
      filterByAppareils(recipe, selections.appareils) &&
      filterByUstensiles(recipe, selections.ustensiles)
    );
  });

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

  return Array.from(selectedIngredients).every((ingredient) =>
    recipe.ingredients.some(
      (recipeIngredient) => recipeIngredient.ingredient === ingredient
    )
  );
}

function filterByUstensiles(recipe, selectedUstensiles) {
  if (selectedUstensiles.size === 0) return true;

  return Array.from(selectedUstensiles).every((ustensile) =>
    recipe.ustensils.includes(ustensile)
  );
}
