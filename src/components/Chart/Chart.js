
import React, {useEffect} from 'react';
import {registerables, Chart} from "chart.js"


export const ChartWrapper = ({dividends}) => {

    const chartRef = React.createRef();
    dividends.reverse();
    const setChart = () => {
        var data = {
            labels: [],
            datasets: [
                {
                    label: 'Rewards',
                    data: [],
                    tension: 1,
                    fill: true,
                },    
            ]
        };

        let profit = dividends.reverse().map(a => Number(a.rawDollarValue)).map((_, i, a) => a.slice(0, i + 1).reduce((a, b) => {return a + b}))
        for(var i = 0; i < profit.length; i++) {
            data.labels.push(new Date(parseInt(dividends[i].timestamp) * 1000).toLocaleDateString());
            data.datasets[0].data.push(profit[i]);
        }

        const myChartRef = chartRef.current.getContext('2d');

        var gradient = myChartRef.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(48, 224, 161, 0.3)');   
        gradient.addColorStop(1, 'rgba(12, 12, 12, 0)');

        Chart.register(...registerables);
        new Chart(myChartRef, {
            type: "line",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderJoinStyle: 'bevel',
                        borderWidth: 2.5,
                        borderColor: 'rgba(138, 255, 108, 1)',
                        backgroundColor: gradient,
                    },
                    point:{
                        backgroundColor: 'transparent',
                        borderColor: "transparent"
                    },
                },
                scales:{
                    x: {
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                plugins: {   
                    legend: {
                      display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                     },
                },
            },
            plugins: [{
                afterDatasetsDraw: function(chart, easing) {
                    if (chart.tooltip && chart.tooltip.opacity === 1) {
                        const ctx = chart.ctx;
                        const x = chart.tooltip.caretX;
                        const topY = chart.scales.y.top;
                        const bottomY = chart.scales.y.bottom;
            
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, topY);
                        ctx.lineTo(x, bottomY);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                        ctx.fillStyle = gradient;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }]
        });
    }

    const useMountEffect = (a) => useEffect((a), [])

    useMountEffect(() => {
        setChart();
    }, []);

    return(
        <canvas
            id="chart"
            ref={chartRef}
        />
    )

} 