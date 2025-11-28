function themeToggler() {
    let root = document.querySelector("html");
    let icon = document.querySelector(".theme-icon");
    let toggler = document.querySelector(".theme-toggle-btn");
    toggler.addEventListener("click", () => {
        icon.className = icon.className === "theme-icon bx bx-sun" ? "theme-icon bx bx-moon" : "theme-icon bx bx-sun";
        root.className = root.className === "light" ? "dark" : "light";
    })
}
themeToggler();