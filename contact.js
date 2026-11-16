const formFrame = document.querySelector("#contact-form-preview");
const formLinks = document.querySelectorAll(".form-switch a");

function matchFormTheme() {
    const formPage = formFrame.contentDocument;
    if (formPage) {
        formPage.documentElement.dataset.theme = document.documentElement.dataset.theme;
    }
}

const formSize = new ResizeObserver(function (entries) {
    const height = entries[0].target.getBoundingClientRect().height;
    formFrame.style.height = Math.ceil(height) + "px";
});

function fitForm() {
    formSize.disconnect();
    const formPage = formFrame.contentDocument;
    const formContent = formPage?.querySelector("main");
    for (const link of formLinks) {
        if (link.href === formPage?.URL) {
            link.setAttribute("aria-current", "true");
        } else {
            link.removeAttribute("aria-current");
        }
    }

    if (formContent) {
        matchFormTheme();
        formSize.observe(formContent, { box: "border-box" });
    }
}

formFrame.addEventListener("load", fitForm);
document.querySelector("#theme-toggle").addEventListener("click", matchFormTheme);
fitForm();