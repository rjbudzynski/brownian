class RandomWalk2D {

    constructor(pos) {
        this.pos = new Int32Array(pos);
        if (this.pos.length != 2) {
            throw new Error('this class is for 2D only');
        }
    }

    step(v = 1) {
        const φ = Math.random() * 2 * Math.PI;
        this.pos = [this.pos[0] + v * Math.cos(φ), this.pos[1] + v * Math.sin(φ)];
    }

}


class MyCanvas {

    constructor(container, color = 'magenta') {
        // `container` should be a html element
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.container.appendChild(this.canvas);
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
        this.canvas.setAttribute('width', parseInt(this.width));
        this.canvas.setAttribute('height', parseInt(this.height));
        this.gc = this.canvas.getContext('2d');
        this.gc.fillStyle = color;
        this.gc.strokeStyle = 'black';
    }

    clear() {
        this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCircle(x, y, r) {
        let gc = this.gc;
        gc.beginPath();
        gc.arc(x, y, r, 0, 2 * Math.PI);
        gc.closePath();
        gc.stroke();
        gc.fill();
    }

    traceCircle(x, y, r) {
        let gc = this.gc;
        gc.moveTo(x, y);
        gc.arc(x, y, r, 0, 2 * Math.PI);;
    }

}


class BrownGas {

    constructor(canvas, nParticles, v = 1, radius = 3) {
        this.canvas = canvas;
        this.nParticles = nParticles;
        this.v = v;
        this.radius = radius;
        this.running = false;
    }

    init() {
        this.canvas.clear();
        this.particles = new Array(this.nParticles);
        this.posInitial = [this.canvas.width / 2 | 0, this.canvas.height / 2 | 0];
        for (let i = this.nParticles; i--;) {
            this.particles[i] = new RandomWalk2D(this.posInitial);
        }
        this.count = 0;
    }

    get distances() {
        return this.particles.map((p) =>
            ((p.pos[0] - this.posInitial[0]) ** 2 + (p.pos[1] - this.posInitial[1]) ** 2) ** .5
        );
    }

    get avgDistance() {
        return this.distances.reduce((a, b) => a + b) / this.nParticles;
    }

    get maxDistance() {
        return this.distances.reduce((a, b) => Math.max(a, b))
    }

    paint() {
        this.canvas.clear();
        this.particles.forEach((p) => {
            this.canvas.drawCircle(p.pos[0], p.pos[1], this.radius);
        });
    }

    step() {
        this.particles.forEach((p) => {
            p.step(this.v);
        });
        ++this.count;
    }

    update() {
        this.step();
        this.paint();
        document.querySelector('#count').innerText = this.count;
        document.querySelector('#spread').innerText = this.avgDistance.toPrecision(3);
        document.querySelector('#maximum').innerText = this.maxDistance.toPrecision(3);
        this.count % 10 == 1 && brownPlot.update();
    }

    runUpdate() {
        this.update();
        if (this.running) {
            window.requestAnimationFrame(this.runUpdate.bind(this));
        }
    }

    toggle() {
        this.running = !this.running;
        this.running && this.runUpdate();
    }

}
