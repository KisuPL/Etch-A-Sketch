function clearDrawingArea(){
    while (gridWrapper.firstChild) {
        gridWrapper.removeChild(gridWrapper.lastChild);
    }
}

function setUpDrawingArea(newSize = 16) {
for (let i = 0; i < newSize; i++){
    let column = document.createElement("div");
    column.id = "column";
    column.style.backgroundColor = "black";
    gridWrapper.appendChild(column);
}

    let columnList = document.querySelectorAll("#column");
    let columnArray = Array.from(columnList);
    columnArray.forEach(column => {
        for (let j = 0; j < newSize; j++){
            let row = document.createElement("div");
            row.id = "row";

            row.style.width=`${drawingAreaSize/newSize}px`;
            row.style.height=`${drawingAreaSize/newSize}px`;
            row.style.backgroundColor = "white";
            row.addEventListener("mouseover",() => {
                row.style.opacity = 0.5;
            })
            row.addEventListener("mouseout",() => {
                row.style.opacity = 1;
            })
            row.addEventListener("mouseover",changeColor);
            column.appendChild(row);
        }
    })
}

function updateGridSize() {
    console.log(`changing grid size to ${gridSize.value}`)
    rainbow = false
    eraser = false
    rainbowButton.classList.remove("btn-on")
    eraserButton.classList.remove("btn-on")
    clearDrawingArea()
    setUpDrawingArea(gridSize.value)
}

function changeColor(e) {
e.preventDefault()
if (!mouseDown) return
else if (eraser){
    e.target.style.backgroundColor = "white";
    return
} else if (rainbow) {
    e.target.style.backgroundColor = randomColor();
    return;
} else
e.preventDefault()
let color = document.getElementById("colorPicker").value
e.target.style.backgroundColor = color;
}

function randomColor(){
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function rainbowMode(){
    if (rainbow){
        rainbow = false
    } else {
        rainbow = true
        if (eraser){
        eraser = false
        eraserButton.classList.remove("btn-on")
        }
    }
}

function eraserMode(){
    if (eraser){
        eraser = false
    } else {
        eraser = true
        if (rainbow){
        rainbow = false
        rainbowButton.classList.remove("btn-on")
        }
    }
}

document.addEventListener("dragstart", e => e.preventDefault());

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

let buttonList = document.querySelectorAll(".toggleable")
let buttonArray = Array.from(buttonList)
buttonArray.forEach(button => {
    button.addEventListener("click",() => {
        button.classList.toggle("btn-on");
    })
})

let clearButton = document.getElementById("clearButton")
clearButton.addEventListener("click",updateGridSize)

let rainbow = false
let rainbowButton = document.getElementById("rainbowButton")
rainbowButton.addEventListener("click",rainbowMode)

let eraser = false
let eraserButton = document.getElementById("eraserButton")
eraserButton.addEventListener("click",eraserMode)

let gridWrapper = document.getElementById("gridWrapper");
let drawingAreaSize = window.getComputedStyle(gridWrapper).getPropertyValue("width").replace("px","");


let gridSize = document.getElementById("gridSize");
let gridSizeOutput = gridSize.nextElementSibling;
gridSize.addEventListener("input", () => {
    gridSizeOutput.value = gridSize.value

});

gridSize.addEventListener("change", updateGridSize);

setUpDrawingArea(16);
