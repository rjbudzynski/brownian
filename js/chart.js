const brownPlot = {
    element: document.getElementById('plotlyFig'),
    config: {
    },
    layout: {
        datarevision: 0,
        grid: {
            rows: 2,
            columns: 1,
            pattern: 'independent',
        },
        font: {
            color: 'antiquewhite',
            family: '"Courier New", courier, monospace',
        },
        title: {
            text: 'distribution of distance from origin',
            font: {
                size: 14,
            }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            range: [0, 120],
            autorange: true,
            rangemode: 'tozero',
            // tick0: 0,
            // dtick: 50,
        },
        nxbins: 50,
        yaxis: {
            range: [0, 100],
            autorange: true,
            showgrid: false,
            ticks: '',
            showticklabels: false,
        },
        xaxis2: {
            showgrid: false,
            title: {
                text: 'time steps',
            },
        },
        yaxis2: {
            showgrid: false,
            title: {
                text: 'avg distance',
            },
        },
        showlegend: false,
    },
    get hist() {
        return {
            x: brownGas.distances,
            type: 'histogram',
            histnorm: 'density',
            marker: {
                color: 'magenta'
            },
            name: 'distance distribution',
        };
    },
    _line: {
        x: [],
        y: [],
        xaxis: 'x2',
        yaxis: 'y2',
        type: 'scatter',
        mode: 'lines',
        name: 'avg distance',
    },
    get line() {
        this._line.x.push(brownGas.count);
        this._line.y.push(brownGas.avgDistance);
        this.layout.datarevision = brownGas.count;
        return this._line;
    },
    init() {
        Plotly.react(this.element, [this.hist, this.line], this.layout);
    },
    update() {        
        Plotly.react(this.element, [this.hist, this.line], this.layout);
        // Plotly.extendTraces(this.element, { x: [[brownGas.count]], y: [[brownGas.avgDistance]]}, [1]);
    },
    reset() {
        this._line.x = [];
        this._line.y = [];
        this.layout.datarevision = 0;
        this.init();
    }
}

