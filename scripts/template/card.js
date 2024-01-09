/** Fonction pour afficher le contenu de 'ingrédients' pour nos cards. **/
/* getIngredients is used on our factory 'getRecipeCard' */
function getIngredients(ingredients) {
  const column = document.createElement("div");
  column.classList.add("ingredients__detailled--bloc");

  let ingredientName;

  for (const ingredient of ingredients) {
    ingredientName = document.createElement("div");
    ingredientName.setAttribute("data-ingredient", ingredient.ingredient);

    if (ingredient.unit === "" || ingredient.unit == null) {
      if (ingredient.quantity) {
        const ingredientElement = document.createElement("p");
        ingredientElement.classList.add("ingredient__ingredient");
        ingredientElement.innerHTML = `${ingredient.ingredient}`;

        const quantityElement = document.createElement("p");
        quantityElement.classList.add("ingredient__quantity");
        quantityElement.innerHTML = ` ${ingredient.quantity}`;

        ingredientName.appendChild(ingredientElement);
        ingredientName.appendChild(quantityElement);
      } else {
        const ingredientElement = document.createElement("p");
        ingredientElement.classList.add("ingredient__ingredient");
        ingredientElement.innerHTML = `${ingredient.ingredient}`;
        ingredientName.appendChild(ingredientElement);
      }
    } else {
      const ingredientElement = document.createElement("p");
      ingredientElement.classList.add("ingredient__ingredient");
      ingredientElement.innerHTML = `${ingredient.ingredient}`;

      ingredientName.appendChild(ingredientElement);

      if (ingredient.quantity) {
        const quantityElement = document.createElement("p");
        quantityElement.classList.add("ingredient__quantity");
        quantityElement.innerHTML = `${ingredient.quantity} ${ingredient.unit}`;
        ingredientName.appendChild(quantityElement);
      }
    }

    column.appendChild(ingredientName);
  }

  return column;
}

export function getRecipeCard(data) {
  const {
    id,
    name,
    image,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;

  const article = document.createElement("article");
  article.setAttribute("id", id);
  article.setAttribute("servings", servings);

  const cardHeader = document.createElement("header");

  const recipeImage = document.createElement("img");
  recipeImage.setAttribute("src", "../../assets/recipes/" + image);
  recipeImage.setAttribute("alt", name);
  recipeImage.setAttribute("width", "100%");
  recipeImage.setAttribute("height", "100%");
  recipeImage.className = "image";

  const recipeName = document.createElement("h2");
  recipeName.textContent = name;
  recipeName.className = "nom";

  const recipeRecette = document.createElement("p");
  recipeRecette.textContent = "Recette";
  recipeRecette.className = "recette";

  const recipeDuration = document.createElement("h3");
  recipeDuration.textContent = `${time} min`;
  recipeDuration.className = "durée";

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("informations");
  cardInfo.setAttribute("appliance", appliance);
  cardInfo.setAttribute("ustensils", ustensils);

  const recipeIngredient = document.createElement("p");
  recipeIngredient.textContent = "Ingrédients";
  recipeIngredient.className = "ingredients";

  /* getIngredients est définit en début de page */
  const recipeIngredients = getIngredients(ingredients);

  const recipeDescription = document.createElement("p");
  recipeDescription.textContent = description;
  recipeDescription.className = "description";

  const hidden = document.createElement("div");
  hidden.classList.add("is-hidden");

  /* Append section */
  article.appendChild(cardHeader);
  cardHeader.appendChild(recipeImage);
  cardHeader.appendChild(recipeDuration);
  article.appendChild(cardInfo);
  cardInfo.appendChild(recipeName);
  cardInfo.appendChild(recipeRecette);
  cardInfo.appendChild(recipeDescription);
  cardInfo.appendChild(recipeIngredient);
  cardInfo.appendChild(recipeIngredients);
  article.appendChild(hidden);

  return article;
}
