window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('#jsCanvas');
    const ctx = canvas.getContext('2d');
    const colors = document.querySelector('#jsColors');

    const canvasStyle = window.getComputedStyle(canvas);
    canvas.width = Number(canvasStyle.width.replace('px', ''));
    canvas.height = Number(canvasStyle.height.replace('px', ''));

    ctx.strokeStyle = '#00000';
    ctx.lineWidth = 2.5;

    let painting = false;
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
        if(e.target.nodeName === 'LI') {
            const color = window.getComputedStyle(e.target).backgroundColor;
            ctx.strokeStyle = color;
        }
    }

    if (canvas) {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
    }

    colors.addEventListener('click', handleColorClick);






});