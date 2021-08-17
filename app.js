const canvas = document.getElementById("jsCanvas");
const body = document.getElementsByTagName('body');
const slider = document.getElementById("jsRange");
const sidebar = document.getElementsByTagName('label');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor")
const mode = document.getElementById('jsMode');
const clear = document.getElementById('jsClear');
const themes = document.getElementsByClassName("jsTheme");

const CANVAS_SIZE = 700;

ctx.fillStyle = "white";


//색상표
var colorsSample = [
    ['#CB4242', "#8F1E33", "#461E2E", "#87374F", "#C9718B", "#FE93B0"], 
    ["#FBEFCB", "#F9CDAC", "#F4A688", "#E1876A", "#987162", "#E9B4A1"],
    ["#F9D5D3", "#ECA4A6", "#807F89", "#99A89E" ,"#BBC7BA", "#D7DBD1"],
    ["#C2C4A0", "#868E74", "#AD5988", "#E5B293", "#E9C9B6", "#ECE2E3"],
    ["#B1CAE5", "#635D58", "#C3B767", "#DFCD85", "#EBE49F", "#F7F6D3"],
    ["#E2D8E7", "#E3C4D9", "#B85480", "#F1E1B4", "#EEE9D6", "#F0EFE5"],
    ["#DAD1D0", "#B5AAAA", "#A8C4B8", "#C4DBD4", "#D9E8E6", "#E5EFEE"],
    ["#201E1D", "#101C1E", "#304F54", "#638B9A", "#A5C8DF", "#D8E7DB"]
]

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false; //클릭 상태
let filling = false; 

function changeTheme(event){
    const themeIndex = event.target.id.slice(-1)*1;
    for (var i =0; i<colors.length; i++){
        colors[i].style.backgroundColor=colorsSample[themeIndex][i];
    }   
    ctx.clearRect(0,0,canvas.width, canvas.height);
    canvas.style.backgroundColor = "#ffffff";
    body[0].style.background = colorsSample[themeIndex][5];
    sidebar[0].style.background = colorsSample[themeIndex][4];
    sidebar[0].style.color = colorsSample[themeIndex][2];
    ctx.strokeStyle = colorsSample[themeIndex][0];
}

function clearCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function handleCanvasClick(event){
    if(filling) ctx.fillRect(0,0,canvas.width, canvas.height);
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerHTML = "Draw";
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
    if(!filling){
        if(!painting){
            changeWidth(event);
            ctx.beginPath();
            ctx.moveTo(x, y);
        }else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}


function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
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
    canvas.addEventListener('click', handleCanvasClick);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}

if(clear){
    clear.addEventListener('click', clearCanvas);
}


Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
Array.from(themes).forEach(theme => theme.addEventListener("click", changeTheme));


