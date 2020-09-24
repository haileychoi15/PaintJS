window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#jsCanvas');
    const ctx = canvas.getContext('2d');
    const colors = document.querySelector('#jsColors');
    const range = document.querySelector('#jsRange');
    const mode = document.querySelector('#jsMode');

    const INITIAL_COLOR = '#000000';
    const CANVAS_SIZE = 700;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.strokeStyle = INITIAL_COLOR;
    ctx.fillStyle = INITIAL_COLOR;
    ctx.lineWidth = 2.5;

    let painting = false;
    let filling = false;

    function onMouseMove(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        if (!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }

    function stopPainting() {
        painting = false;
    }

    function startPainting() {
        painting = true;

    }

    function handleColorClick(e) {
        if (e.target.classList.contains('jsColor')) {
            const color = window.getComputedStyle(e.target).backgroundColor;
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
        }
    }

    function handleRangeChange(e) {
        const size = e.target.value;
        ctx.lineWidth = size;
    }

    function handleModeClick() {
        console.log(filling);
        if (filling) {
            filling = false;
            mode.innerText = 'Fill';
        } else {
            filling = true;
            mode.innerText = 'Paint';
        }
    }

    function handleCanvasClick() {
        if (filling) {
            ctx.fillRect(0 ,0, CANVAS_SIZE ,CANVAS_SIZE);
        }
    }

    if (canvas) {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        canvas.addEventListener('click', handleCanvasClick);
    }

    colors.addEventListener('click', handleColorClick);

    if (range) {
        range.addEventListener('input', handleRangeChange);
    }

    if (mode) {
        mode.addEventListener('click', handleModeClick);
    }




});