let mouseDown = false;
let mode = "default";
let color;

const grid = document.querySelector(".grid");
const colorBox = document.querySelector(".colorBox input");

createBoxes(16);

const slider = document.querySelector(".slider input");
const sliderValue = document.querySelector(".sliderLabel");
const newBoard = document.querySelector(".newBoard");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow")

function createBoxes(dimension){
    for(let i = 0; i < dimension; i++){
        for(let j = 0; j < dimension; j++){
            let box = document.createElement("div");
            box.style.boxSizing = "border-box";
            box.style.width = `${600/dimension}px`;
            box.style.height = `${600/dimension}px`;
            grid.appendChild(box);;
            box.addEventListener("click", function(e) {
                checkMode(e);
            });
            box.addEventListener("mousedown", () => {
                mouseDown = true;
            });
            box.addEventListener("mouseup", () => {
                mouseDown = false;
            });
            box.addEventListener("mouseenter", function(e) {
                if(mouseDown === true){
                    checkMode(e);
                }
            });
        }
    }
}

function checkMode(e){
    if(mode === "rainbow"){
        let randomR = Math.floor(Math.random() * 256);
        let randomG = Math.floor(Math.random() * 256);
        let randomB = Math.floor(Math.random() * 256);
        color = `rgb(${randomR}, ${randomG}, ${randomB})`;
    }
    else if(mode === "eraser"){
        color = "#fff";
    }
    else{
        color = colorBox.value;
    }
    e.target.style.backgroundColor = color;
}

function newCanvas(){
    let boxes = document.querySelectorAll(".grid div");
    sliderValue.textContent = `${slider.value}x${slider.value}`;
    boxes.forEach(box => {
        grid.removeChild(box);
    });
    createBoxes(slider.value);
}

slider.oninput = () => {
    newCanvas();
}

newBoard.addEventListener("click", newCanvas);

eraser.addEventListener("click", () => {
   if(mode === "eraser"){
        mode = "default";
        eraser.style.border = 0;
    }
    else{
        mode = "eraser";
        eraser.style.border = "solid black";
        rainbow.style.border = 0;

    }
});

rainbow.addEventListener("click", () => {
    if(mode === "rainbow"){
        mode = "default";
        rainbow.style.border = 0;
    }
    else{
        mode = "rainbow";
        rainbow.style.border = "solid black"
        eraser.style.border = 0;
    }
})

colorBox.addEventListener("click", () => {
    rainbow.style.border = 0;
    eraser.style.border = 0;
    mode = "default";
})



