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
    const label = theme === "dark" ? "Use light theme" : "Use dark theme";
    themeButton.setAttribute("aria-label", label);
    themeButton.title = label;
}

applyTheme(selectedTheme);

themeButton.addEventListener("click", function () {
    selectedTheme = selectedTheme === "light" ? "dark" : "light";
    const updateTheme = () => applyTheme(selectedTheme);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (typeof document.startViewTransition === "function" && !reduceMotion) {
        document.startViewTransition(updateTheme);
    } else {
        updateTheme();
    }

    try {
        localStorage.setItem("theme", selectedTheme);
    } catch {
        return;
    }
});

themeButton.hidden = false;