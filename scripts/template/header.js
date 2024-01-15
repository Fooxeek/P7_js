import { recipes } from "../../data/recipes.js";
import { getRecipeCard } from "./card.js";
import { updateRecipeCount } from "../utils/updateRecipeCount.js";

export function Header() {
  const header = document.getElementById("header");

  const headerLogo = document.createElement("img");
  headerLogo.src = "../../assets/img/Les petits plats.png";
  headerLogo.alt = "logo Les petits plats";
  headerLogo.classList.add("header__logo");

  const headerGroup = document.createElement("div");
  headerGroup.classList.add("header__group");

  const headerTitle = document.createElement("h1");
  headerTitle.classList.add("header__title");
  headerTitle.textContent =
    "CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES";

  const headerSearch = document.createElement("div");
  headerSearch.classList.add("header__search");

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.classList.add("search--input");
  searchInput.placeholder = "Rechercher une recette, un ingrédient, ...";

  const searchIcon = document.createElement("img");
  searchIcon.src = "../../assets/img/search_white.svg";
  searchIcon.alt = "logo Rechercher";
  searchIcon.classList.add("search--logo");

  headerSearch.appendChild(searchInput);
  headerSearch.appendChild(searchIcon);

  headerGroup.appendChild(headerTitle);
  headerGroup.appendChild(headerSearch);

  header.appendChild(headerLogo);
  header.appendChild(headerGroup);

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    // Appliquer le filtre et mettre à jour l'affichage des recettes
    filterRecipes(query);
  }

  // Écoutez les événements de saisie pour la recherche
  searchInput.addEventListener("input", handleSearch);
}

function filterRecipes(query) {
  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    let recipe = recipes[i];
    let ingredientMatch = false;
    for (let j = 0; j < recipe.ingredients.length; j++) {
      if (recipe.ingredients[j].ingredient.toLowerCase().includes(query)) {
        ingredientMatch = true;
        break; // Sortie anticipée si un ingrédient correspond
      }
    }

    let ustensileMatch = false;
    for (let k = 0; k < recipe.ustensils.length; k++) {
      if (recipe.ustensils[k].toLowerCase().includes(query)) {
        ustensileMatch = true;
        break; // Sortie anticipée si un ustensile correspond
      }
    }
    if (
      ingredientMatch ||
      recipe.appliance.toLowerCase().includes(query) ||
      ustensileMatch
    ) {
      filteredRecipes.push(recipe);
    }
  }

  // Mettez à jour l'affichage des recettes ici
  displayFilteredRecipes(filteredRecipes);
}

function displayFilteredRecipes(filteredRecipes) {
  const recipeSection = document.getElementById("recipes__cards");
  recipeSection.innerHTML = ""; // Vide la section des recettes actuelles

  for (let i = 0; i < filteredRecipes.length; i++) {
    const recipeCard = getRecipeCard(filteredRecipes[i]); // Utilisez votre fonction existante pour créer une carte de recette
    recipeSection.appendChild(recipeCard); // Ajoutez la carte de recette à la section
  }

  updateRecipeCount(filteredRecipes.length);
}
