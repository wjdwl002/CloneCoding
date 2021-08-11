const canvas = document.getElementById("jsCanvas");
let painting = false; //클릭 상태

function onMouseMove(event){
    //console.log(event.offsetX, event.offsetY); // 여기서 offset 값만 필요
    const x = event.offsetX;
    const y = event.offsetY;
}
function stopPainting(){
    painting = false;
}

function onMouseDown(event){
    painting = true;
}

function onMouseUp(event){
    stopPainting();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseLeave);

}