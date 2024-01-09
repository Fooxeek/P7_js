import { recipes } from "../../data/recipes.js";
import { selections, updateGlobalTags } from "./selections.js";

export function getUstensiles() {
  const button = document.createElement("button");
  button.classList.add("dropdown__button");
  button.textContent = "Ustensiles";
  button.innerHTML +=
    '<svg xmlns="http://www.w3.org/2000/svg" class="dropdown__logo" width="15" height="8" viewBox="0 0 15 8" fill="none"><path d="M1 1L7.5 7L14 1" stroke="#1B1B1B" stroke-linecap="round"/></svg>';

  const filterInfo = document.createElement("div");
  filterInfo.classList.add("filter__ustensiles");

  const searchInputContainer = document.createElement("div");
  searchInputContainer.classList.add("search-input-container");

  const searchIcon = document.createElement("img");
  searchIcon.src = "../../assets/img/search_grey.svg";
  searchIcon.classList.add("search-icon");
  searchIcon.style.display = "none";

  const crossIcon = document.createElement("img");
  crossIcon.src = "../../assets/img/cross.svg";
  crossIcon.classList.add("cross-icon");
  crossIcon.style.display = "none";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.style.display = "none";

  const filteredChoicesDiv = document.createElement("div");
  filteredChoicesDiv.classList.add("filtered-choices");
  filteredChoicesDiv.style.display = "none";

  function getUstensilsList() {
    const ustensils = new Set();
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        ustensils.add(ustensil);
      });
    });
    return Array.from(ustensils);
  }

  const choices = getUstensilsList();

  function filterChoices(searchInputValue) {
    const searchLower = searchInputValue.toLowerCase();
    const filtered = [];
    for (const choice of choices) {
      if (choice.includes(searchLower)) {
        filtered.push(choice);
      }
    }
    return filtered;
  }

  function toggleUstensilSelection(ustensil) {
    if (selections.ustensiles.has(ustensil)) {
      selections.ustensiles.delete(ustensil);
    } else {
      selections.ustensiles.add(ustensil);
    }
    updateFilteredChoices();
    const tagSection = document.getElementById("tags");
    updateGlobalTags(tagSection);
  }

  function updateFilteredChoices(filteredChoices = choices) {
    filteredChoicesDiv.innerHTML = filteredChoices
      .map((choice) => {
        const isSelected = selections.ustensiles.has(choice);
        return `<span class="filter-choice ${
          isSelected ? "selected" : ""
        }" data-ustensiles="${choice}">${choice}</span>`;
      })
      .join("\n");

    attachClickEventToChoices();
  }

  function attachClickEventToChoices() {
    filteredChoicesDiv
      .querySelectorAll(".filter-choice")
      .forEach((choiceElement) => {
        choiceElement.addEventListener("click", function () {
          const ustensil = this.getAttribute("data-ustensiles");
          toggleUstensilSelection(ustensil);
        });
      });
  }

  button.addEventListener("click", function () {
    const colorFilter = document.querySelector(".filter__ustensiles");
    const isInputVisible = searchInput.style.display === "block";

    if (isInputVisible) {
      colorFilter.style.backgroundColor = "";
      searchInput.style.display = "none";
      filteredChoicesDiv.style.display = "none";
      searchIcon.style.display = "none";
    } else {
      colorFilter.style.backgroundColor = "#FFF";
      searchInput.style.display = "block";
      filteredChoicesDiv.style.display = "flex";
      searchIcon.style.display = "block";
      searchInput.focus();
    }

    updateFilteredChoices();
  });

  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value;
    crossIcon.style.display = searchValue ? "block" : "none";
    const filteredChoices = filterChoices(searchValue);
    updateFilteredChoices(filteredChoices);
  });

  crossIcon.addEventListener("click", function () {
    searchInput.value = ""; 
    crossIcon.style.display = "none";
    updateFilteredChoices(choices);
  });

  searchInputContainer.appendChild(searchInput);
  searchInputContainer.appendChild(searchIcon);
  searchInputContainer.appendChild(crossIcon);

  filterInfo.appendChild(button);
  filterInfo.appendChild(searchInputContainer);
  filterInfo.appendChild(filteredChoicesDiv);

  return filterInfo;
}
