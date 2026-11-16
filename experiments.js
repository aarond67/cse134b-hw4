class HelloWorld extends HTMLElement {
    connectedCallback() {
        console.log("Hello World!");
    }
}
customElements.define("hello-world", HelloWorld);
const canvas = document.getElementById("pipeline-canvas");
const context = canvas.getContext("2d");
if (context) {
    context.font = "14px sans-serif";
    context.strokeRect(4, 25, 80, 50);
    context.strokeRect(104, 25, 80, 50);
    context.strokeRect(204, 25, 80, 50);
    context.fillText("Collect", 18, 55);
    context.fillText("Store", 126, 55);
    context.fillText("Report", 219, 55);
    context.fillText("→", 86, 55);
    context.fillText("→", 186, 55);
}