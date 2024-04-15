var myCanvas, brownGas;

window.addEventListener('load', () => {
    const nParticles = 1111;
    const infoFirstPar = document.querySelector('#info p');
    myCanvas = new MyCanvas(document.querySelector('#canvas-container'));
    brownGas = new BrownGas(myCanvas, nParticles);
    infoFirstPar.innerHTML = `${nParticles} particles :: ${infoFirstPar.innerHTML}`;
    brownGas.init();
    brownGas.paint();
    brownPlot.init();
    // brownGas.update();
    // brownPlot.update();


    document.querySelector('#toggle').addEventListener('click', () => {
        console.log('brownGas.toggle()');
        brownGas.toggle();
    });

    document.querySelector('#reset').addEventListener('click', () => {
        brownGas.running = false;
        brownGas.init();
        brownPlot.reset();
        brownGas.update();
    });

});
