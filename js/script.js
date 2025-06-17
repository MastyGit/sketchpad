const body = document.querySelector("body");

const setGridSize = document.createElement("div");
body.appendChild(setGridSize);

const span = document.createElement("span");
span.style.color = "white";
span.textContent = "Pick grid size between 1 and 100 and press enter";
setGridSize.appendChild(span);

const input = document.createElement("input");
input.style.marginLeft = "20px";
input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
	const size = parseInt(input.value);
	size < 1 || size > 100 || isNaN(size)
	    ? console.log("Doh!") 
	    : createGrid(size);
    }
});
setGridSize.appendChild(input);

let randomColor = false;
const toggleRandomColor = document.createElement("button");
toggleRandomColor.textContent = "Random color is OFF";
toggleRandomColor.addEventListener("click", () => {
    if (randomColor) {
	randomColor = false;
	toggleRandomColor.textContent = "Random color is OFF";
    } else {
	randomColor = true;
	toggleRandomColor.textContent = "Random color is ON";
    }
});
setGridSize.appendChild(toggleRandomColor);

function createGrid(size) {
    const containerExists = document.querySelector(".container");
    if (containerExists !== null) {
	containerExists.remove();
    }
    const container = document.createElement("div");
    container.className = "container";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.flex = "auto";
    container.style.height = "800px";
    container.style.width = "800px";
    container.style.maxHeight = "800px";
    container.style.maxWidth = "800px";
    container.addEventListener("contextmenu", e => 
	{
	    e.preventDefault();
	});
    container.addEventListener("mousedown", e => handler(e));
    container.addEventListener("mouseover", e => handler(e));


    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flex = "1 1 auto";

    const square = document.createElement("div");
    square.className = "square";
    square.style.backgroundColor = "#888888";
    square.style.border = "1px solid black";
    square.style.flex = "1 1 auto";
    square.style.aspectRatio = "1 / 1"

    for (let i = 0; i < size; i++) {
	const rowClone = row.cloneNode()
	container.appendChild(rowClone);

	for(let j = 0; j < size; j++) {
	    const squareClone = square.cloneNode();
	    rowClone.appendChild(squareClone);
	}
    }
    body.appendChild(container);
}

function handler(event) {
    event.preventDefault();
    const target = event.target;
    const buttons = event.buttons;
    if (target.className === "square" &&
	buttons === 1 &&
    !randomColor) {
	target.style.backgroundColor = "white";
    }
    if (target.className === "square" &&
    buttons === 1 &&
    randomColor) {
	const color = randomizeColor();
	target.style.backgroundColor = `rgb(${color.join(",")})`;
    }
    if (target.className === "square" && buttons === 2) {
	target.style.backgroundColor = "#888888";
    }
}


function randomizeColor() {
    const rgb = [];
    for (let i = 0; i < 3; i++) {
	const num = Math.floor(Math.random() * 255 + 1);
	rgb.push(num);
    }
    return rgb;
}
