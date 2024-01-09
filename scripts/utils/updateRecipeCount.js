export function updateRecipeCount(count) {
  const recipeCountElement = document.querySelector("#sort p");
  if (recipeCountElement) {
    recipeCountElement.textContent = `${count} recettes`;
  }
}
