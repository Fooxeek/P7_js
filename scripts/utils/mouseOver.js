document.querySelectorAll(".cross-tag-icon").forEach((img) => {
  img.addEventListener("mouseover", () => {
    img.src = "../../assets/img/cross_yellow.svg";
    console.log("mouseover");
  });

  img.addEventListener("mouseout", () => {
    img.src = "../../assets/img/cross.svg";
  });
});
