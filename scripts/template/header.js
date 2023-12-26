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
}
