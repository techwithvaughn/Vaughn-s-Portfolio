document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".open-popup");
    const closeButtons = document.querySelectorAll(".close-popup");
    const popupContainer = document.querySelector(".popup-container");
  
    openButtons.forEach((button) => {
      button.addEventListener("click", () => {
        popupContainer.style.display = "flex";
      });
    });
  
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        popupContainer.style.display = "none";
      });
    });
  });
  