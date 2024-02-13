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
  const filteredRecipes = currentFilteredRecipes.filter((recipe) => {
    if (selections.appareils.size > 1) {
      return null;
    }
    return (
      filterByIngredients(recipe, selections.ingredients) &&
      filterByAppareils(recipe, selections.appareils) &&
      filterByUstensiles(recipe, selections.ustensiles)
    );
  });

  // Afficher les recettes filtrées
  displayFilteredRecipes(filteredRecipes);

  // Mise à jour du nombre de recettes
  updateRecipeCount(filteredRecipes.length);

  return filteredRecipes;
}

function filterByAppareils(recipe, selectedAppareils) {
  // Si aucun appareil n'est sélectionné, toutes les recettes passent le filtre
  if (selectedAppareils.size === 0) return true;

  // Parcourir chaque appareil sélectionné pour vérifier si la recette actuelle a cet appareil
  for (const appareil of selectedAppareils) {
    if (recipe.appliance === appareil) {
      return true;
    }
  }
  return false;
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
    let ustensileFound = false;
    for (const recipeUstensile of recipe.ustensils) {
      if (recipeUstensile === ustensile) {
        ustensileFound = true;
        break;
      }
    }
    if (!ustensileFound) return false;
  }
  return true;
}
