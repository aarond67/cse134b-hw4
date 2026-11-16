const themeButton = document.querySelector("#theme-toggle");
let selectedTheme = "light";

try {
    if (localStorage.getItem("theme") === "dark") {
        selectedTheme = "dark";
    }
} catch {
    selectedTheme = "light";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeButton.textContent = theme === "dark" ? "Use light theme" : "Use dark theme";
}

applyTheme(selectedTheme);

themeButton.addEventListener("click", function () {
    selectedTheme = selectedTheme === "light" ? "dark" : "light";
    applyTheme(selectedTheme);

    try {
        localStorage.setItem("theme", selectedTheme);
    } catch {
        return;
    }
});

themeButton.hidden = false;