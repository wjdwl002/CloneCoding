const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;


let painting = false; //클릭 상태

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
    ctx.strokeStyle = color;
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
    canvas.addEventListener('mouseleave',stopPainting)

}

var colors = document.getElementsByClassName("jsColor")
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));