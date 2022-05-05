const drawingBoard = document.getElementById("drawing-board");
const colorPicker = document.getElementById('colorPicker');
const drawBtn = document.getElementById('drawBtn');
const gridBtn = document.getElementById('gridBtn');
const sizeSlider = document.getElementById('sizeSlider');
const sliderLabel = document.getElementById('sliderLabel');

let pixelsPerSide = sizeSlider.value;
let pixelHeight = 512/pixelsPerSide;
let pixelArray = [];
let gridOn = false;

drawingBoard.style = "grid-template-columns: repeat(" + pixelsPerSide + ", " + pixelHeight + "px)";


let currentColor = "#444444";
let currentMode = "draw";

function setColor(color){
    currentColor = color;
}

function setMode(mode){
    currentMode = mode;
}

for(let i = 0; i < (pixelsPerSide*pixelsPerSide); i++){
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "pixel");
    newDiv.style.height = pixelHeight + "px";
    drawingBoard.appendChild(newDiv);
    pixelArray.push(newDiv);
}

sizeSlider.oninput = () => {
    pixelArray.forEach(pixel => {
        drawingBoard.removeChild(pixel);
    });

    pixelsPerSide = sizeSlider.value;
    pixelHeight = 512/pixelsPerSide;
    sliderLabel.textContent = "Size: " + pixelsPerSide + "x" + pixelsPerSide;

    pixelArray = [];
    for(let i = 0; i < (pixelsPerSide*pixelsPerSide); i++){
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", "pixel");
        newDiv.style.height = pixelHeight + "px";
        drawingBoard.appendChild(newDiv);
        pixelArray.push(newDiv);
    }

    drawingBoard.style = "grid-template-columns: repeat(" + pixelsPerSide + ", " + pixelHeight + "px)";
    if(gridOn){
        pixelArray.forEach(pixel => {
            pixel.style.height = (pixelHeight - 2) + "px";
            pixel.classList.add('grid');
        });
    } else {
        pixelArray.forEach(pixel => {
            pixel.style.height = (pixelHeight) + "px";
            pixel.classList.remove('grid');
        });
    }
};

gridBtn.addEventListener("click", () => {
    if(gridOn){
        pixelArray.forEach(pixel => {
            pixel.classList.remove('grid');
            pixel.style.height = pixelHeight + "px";
        });
        gridOn = false;
    } else {
        pixelArray.forEach(pixel => {
            pixel.classList.add('grid');
            pixel.style.height = (pixelHeight - 2) + "px";
        });
        gridOn = true;
    }
});