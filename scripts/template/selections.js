export const selections = {
  ingredients: new Set(),
  appareils: new Set(),
  ustensiles: new Set(),
};

export function updateGlobalTags(tagSection) {
  tagSection.innerHTML = ""; // Clear existing tags

  // Correct the type parameter for each call to createTag
  selections.ingredients.forEach((ingredient) => {
    const ingredientTag = createTag(ingredient, "ingredients", tagSection);
    tagSection.appendChild(ingredientTag);
  });

  selections.appareils.forEach((appareil) => {
    const appareilTag = createTag(appareil, "appareils", tagSection);
    tagSection.appendChild(appareilTag);
  });

  selections.ustensiles.forEach((ustensile) => {
    const ustensileTag = createTag(ustensile, "ustensiles", tagSection);
    tagSection.appendChild(ustensileTag);
  });
}

function updateFilterChoiceSelectedState(type, ingredient, isSelected) {
  const filterChoiceElement = document.querySelector(
    `.filter-choice[data-${type}="${ingredient}"]`
  );
  if (filterChoiceElement) {
    if (isSelected) {
      filterChoiceElement.classList.add("selected");
    } else {
      filterChoiceElement.classList.remove("selected");
    }
  }
}

function createTag(text, type, tagSection) {
  if (!selections[type]) {
    console.error(`Invalid type: ${type}`);
    return;
  }

  const group = document.createElement("div");
  group.classList.add("tag-group");

  const tag = document.createElement("span");
  tag.textContent = text;
  tag.classList.add("tag", `tag-${type}`);

  const crossIcon = document.createElement("img");
  crossIcon.src = "../../assets/img/cross.svg";
  crossIcon.classList.add("cross-tag-icon");

  // Ajoutez le span tag à la div group
  group.appendChild(tag);
  group.appendChild(crossIcon);

  group.addEventListener("click", function () {
    // Retirer le tag des sélections et mettre à jour l'affichage
    selections[type].delete(text);
    updateGlobalTags(tagSection);

    updateFilterChoiceSelectedState(type, text, false);
  });

  // Retournez la div group au lieu du span tag
  return group;
}
