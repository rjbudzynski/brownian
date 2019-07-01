var myCanvas, brownGas;

window.addEventListener('load', () => {
    myCanvas = new MyCanvas(document.querySelector('#canvas-container'));
    brownGas = new BrownGas(myCanvas, 999);
    brownGas.init();
    brownGas.paint();
    brownPlot.init();
    brownGas.update();
    brownPlot.update();
});

document.querySelector('#toggle').addEventListener('click', () => {
    brownGas.toggle();
});

document.querySelector('#reset').addEventListener('click', () => {
    brownGas.running = false;
    brownGas.init();
    brownPlot.reset();
    brownGas.update();
});