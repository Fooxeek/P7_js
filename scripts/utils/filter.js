import { recipes } from "../../data/recipes.js";
import { updateRecipeCount } from "./updateRecipeCount.js";
import { displayFilteredRecipes } from "../index/index.js";
import { updateIngredientsList } from "../template/ingredients.js";
import { updateAppareilsList } from "../template/appareils.js";
import { updateUstensilsList } from "../template/ustensiles.js";

export let currentFilteredRecipes = [...recipes]; // Commencez avec toutes les recettes

export function filterRecipes(query) {
  // Si la longueur de la requête est inférieure à 3 caractères, réinitialiser les recettes filtrées à toutes les recettes
  if (query.length < 3) {
    currentFilteredRecipes = [...recipes];
  } else {
    currentFilteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const title = recipe.name.toLowerCase();
      const description = recipe.description.toLowerCase();

      // Vérifier si le titre ou la description de la recette contient la requête
      if (title.includes(query) || description.includes(query)) {
        currentFilteredRecipes.push(recipe);
      } else {
        // Vérifier si un ingrédient de la recette contient la requête
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
          if (ingredient.includes(query)) {
            currentFilteredRecipes.push(recipe);
            break;
          }
        }
      }
    }
  }

  // Mettre à jour l'affichage des recettes
  if (currentFilteredRecipes.length === 0) {
    // Afficher le message "Aucune recette ne correspond à XXX"
    const recipesCard = document.getElementById("recipes__cards");
    const noResultMessage = document.createElement("div");
    noResultMessage.textContent = `Aucune recette ne correspond à "${query}"`;
    noResultMessage.classList.add("no-result");
    recipesCard.innerHTML = ""; // Supprimez le contenu précédent
    recipesCard.appendChild(noResultMessage);

    // Réinitialiser les filtres d'ingrédients, d'ustensiles et d'appareils
    updateIngredientsList([]);
    updateAppareilsList([]);
    updateUstensilsList([]);

    // Mettre à jour le compteur de recettes à 0
    updateRecipeCount(0);
  } else {
    displayFilteredRecipes(currentFilteredRecipes);
    updateIngredientsList();
    updateAppareilsList();
    updateUstensilsList();

    // Mettre à jour le compteur de recettes
    updateRecipeCount(currentFilteredRecipes.length);
  }

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
