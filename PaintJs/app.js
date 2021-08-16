const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const mode = document.getElementById('jsMode');
const themes = document.getElementsByClassName("jsTheme");

//색상표
var colorsSample = [
    ['#6F3B48', '#522632', '#522632', '#ECD7D2', '#F3E4DF', '#FFEEE7'], 
    ['#C6DFD6', '#ACCCC4', '#464545', '#C4BCB8', '#E2DFD8', '#EDECEA'],
    ['#EAE9E7', '#CDD5D3', '#98A6A6', '#6B7275', '#745F67', '#9BA980'],
    ['#F5F3F2', '#FDDFDE', '#F66465', '#AB3B3D', '#56555C', '#DFDEDC'],
    ['#CB4242', '#8F1E33', '#461E2E', '#87374F', '#87374F',]
]
ctx.strokeStyle = colorsSample[0][5];

canvas.width = 700;
canvas.height = 700;

let painting = false; //클릭 상태
let filling = false; 

function changeTheme(event){
    const themeIndex = event.target.id.slice(-1)*1;
    for (var i =0; i<colors.length; i++){
        colors[i].style.backgroundColor=colorsSample[themeIndex][i];
    }   
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerHTML = "Fill";
    }
    else {
        filling = true;
        mode.innerHTML = "Paint";
    }
}

function onMouseMove(event){
    //console.log(event.offsetX, event.offsetY); // 여기서 offset 값만 필요
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        changeWidth(event);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function changeColor(event){
    const color = event.target.style.backgroundColor;
    if(filling) canvas.style.backgroundColor = color;
    else ctx.strokeStyle = color;
}

function changeWidth(event){
    ctx.lineWidth = document.getElementById("jsRange").value;
}

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseDown(event){
    startPainting();
}


if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}



Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
Array.from(themes).forEach(theme => theme.addEventListener("click", changeTheme));

for (var i =0; i<colors.length; i++){
    colors[i].style.backgroundColor=colorsSample[0][i];
}

