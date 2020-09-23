window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('jsCanvas');
    let painting = false;
    function onMouseMove(e) {
        const x = e.offsetX;
        const y = e.offsetY;
    }

    function stopPainting() {
        painting = false;
    }
    
    function onMouseDown(e) {
        painting = true;
        console.log(e);
    }

    function onMouseUp(e) {
        stopPainting();
    }

    if (canvas) {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mouseleave', stopPainting);
    }





});