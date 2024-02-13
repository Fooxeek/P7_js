import { updateFilteredData } from "../index/index.js";

export const selections = {
  ingredients: new Set(),
  appareils: new Set(),
  ustensiles: new Set(),
};

export function updateGlobalTags(tagSection) {
  tagSection.innerHTML = "";

  for (const ingredient of selections.ingredients) {
    const ingredientTag = createTag(ingredient, "ingredients", tagSection);
    tagSection.appendChild(ingredientTag);
  }

  for (const appareil of selections.appareils) {
    const appareilTag = createTag(appareil, "appareils", tagSection);
    tagSection.appendChild(appareilTag);
  }

  for (const ustensile of selections.ustensiles) {
    const ustensileTag = createTag(ustensile, "ustensiles", tagSection);
    tagSection.appendChild(ustensileTag);
  }
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
  const group = document.createElement("div");
  group.classList.add("tag-group");

  const tag = document.createElement("span");
  tag.textContent = text;
  tag.classList.add("tag", `tag-${type}`);

  const crossIcon = document.createElement("img");
  crossIcon.src = "../../assets/img/cross.svg";
  crossIcon.classList.add("cross-tag-icon");
  group.appendChild(tag);
  group.appendChild(crossIcon);

  group.addEventListener("click", function () {
    selections[type].delete(text);
    updateGlobalTags(tagSection);
    updateFilterChoiceSelectedState(type, text, false);
    updateFilteredData();
  });

  return group;
}
