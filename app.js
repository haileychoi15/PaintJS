window.addEventListener('DOMContentLoaded', () => {

    const canvas = document.querySelector('#jsCanvas');
    const ctx = canvas.getContext('2d');
    const colors = document.querySelector('#jsColors');
    const colorPick = document.querySelector('#jsCustomColor');
    const range = document.querySelector('#jsRange');
    const mode = document.querySelector('#jsMode');
    const eraseBtn = document.querySelector('#jsErase');
    const resetBtn = document.querySelector('#jsReset');
    const saveBtn = document.querySelector('#jsSave');

    const INITIAL_COLOR = '#000000';
    const CANVAS_SIZE = 700;
    let backgroundColor = '#ffffff';

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    function init() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0 ,0, CANVAS_SIZE ,CANVAS_SIZE);
        ctx.strokeStyle = INITIAL_COLOR;
        ctx.fillStyle = INITIAL_COLOR;
        ctx.lineWidth = 2.5;
    }

    init();

    let painting = false;
    let filling = false;
    let size = ctx.lineWidth;

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
        const target = e.target;
        ctx.lineWidth = size;
        if (target.classList.contains('jsColor')) {
            const color = (target.classList.contains('jsPickColor'))
                ? target.value
                : window.getComputedStyle(target).backgroundColor;
            ctx.strokeStyle = color;
            if (filling) {
                ctx.fillStyle = color;
                backgroundColor = color;
                ctx.fillRect(0 ,0, CANVAS_SIZE ,CANVAS_SIZE);
            }
        }
    }

    function handleRangeChange(e) {
        size = e.target.value;
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

    function handleCM(e) {
        e.preventDefault(); // 우클릭 메뉴 방지위해서
    }

    function handleEraseClick() {
        ctx.strokeStyle = backgroundColor;
        ctx.lineWidth = 50;
    }

    function handleResetClick() {
        init();
        range.value = 2.5;
    }

    function handleSaveClick() {
        const image = canvas.toDataURL(); // type default : png
        const link = document.createElement('a');
        link.href = image;
        link.download = 'PaintJS[🎨]';
        link.click();
    }

    if (canvas) {
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        canvas.addEventListener('contextmenu', handleCM);
    }

    colors.addEventListener('click', handleColorClick);
    colorPick.addEventListener('input', handleColorClick);

    if (range) {
        range.addEventListener('input', handleRangeChange);
    }

    if (mode) {
        mode.addEventListener('click', handleModeClick);
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', handleSaveClick);
    }

    if (eraseBtn) {
        eraseBtn.addEventListener('click', handleEraseClick);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', handleResetClick);
    }
});