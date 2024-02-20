import { recipes } from "../../data/recipes.js";
import { updateRecipeCount } from "./updateRecipeCount.js";
import { displayFilteredRecipes } from "../index/index.js";
import { updateIngredientsList } from "../template/ingredients.js";
import { updateAppareilsList } from "../template/appareils.js";
import { updateUstensilsList } from "../template/ustensiles.js";

export let currentFilteredRecipes = [...recipes]; // Copie initiale de toutes les recettes

export function filterRecipes(query) {
  // Filtrer les recettes en fonction de la requête
  currentFilteredRecipes =
    query.length < 3
      ? [...recipes] // Si la requête est courte, afficher toutes les recettes
      : recipes.filter((recipe) => {
          // Sinon, filtrer les recettes en fonction de la requête
          const title = recipe.name.toLowerCase();
          const description = recipe.description.toLowerCase();
          return (
            title.includes(query.toLowerCase()) ||
            description.includes(query.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
            )
          );
        });

  // Affichage des résultats
  if (currentFilteredRecipes.length === 0) {
    // Si aucune recette ne correspond à la requête, afficher un message d'erreur
    const recipesCard = document.getElementById("recipes__cards");
    const noResultMessage = document.createElement("div");
    noResultMessage.textContent = `Aucune recette ne correspond à "${query}"`;
    noResultMessage.classList.add("no-result");
    recipesCard.innerHTML = "";
    recipesCard.appendChild(noResultMessage);

    // Réinitialisation des filtres et du compteur de recettes
    updateIngredientsList([]);
    updateAppareilsList([]);
    updateUstensilsList([]);
    updateRecipeCount(0);
  } else {
    // Si des recettes sont trouvées, les afficher et mettre à jour les filtres et le compteur
    displayFilteredRecipes(currentFilteredRecipes);
    updateIngredientsList();
    updateAppareilsList();
    updateUstensilsList();
    updateRecipeCount(currentFilteredRecipes.length);
  }

  return currentFilteredRecipes; // Retourner les recettes filtrées
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
