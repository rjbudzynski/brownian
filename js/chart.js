const brownPlot = {
    element: document.getElementById('plotlyFig'),
    config: {
    },
    layout: {
        title: {
            text: 'distribution of distance from origin',
            font: {
                color: 'antiquewhite',
                family: '"Courier New", courier, monospace',
                size: 12,
            }
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            range: [0, 120],
            autorange: true,
            color: 'antiquewhite',
        },
        nxbins: 50,
        yaxis: {
            range: [0, 100],
            autorange: true,
            color: 'antiquewhite',
            showgrid: false,
            ticks: '',
            showticklabels: false,
        },
    },
    get trace() {
        return {
            x: brownGas.distances,
            type: 'histogram',
            histnorm: 'density',
            marker: {
                color: 'magenta'
            },
        };
    },
    init() {
        Plotly.react(this.element, [this.trace], this.layout, this.config);
    },
    update() {
        Plotly.react(this.element, [this.trace], this.layout);
    },
}

