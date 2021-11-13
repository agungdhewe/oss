export async function generate(param) {


	var data = [80, 100, 130]; //randomData();
	var RealValue = 75;


	var config = {
		type: 'gauge',
		data: {
			//labels: ['Success', 'Warning', 'Warning', 'Error'],
			datasets: [{
				data: data,
				value: (RealValue > 130) ? 130 : RealValue,
				backgroundColor: ['rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(54, 162, 235)'],
				borderWidth: 0
			}],
			target: 100
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Gross Profit Achievement YTD'
			},
			layout: {
				padding: {
					bottom: 20
				}
			},
			needle: {
				// Needle circle radius as the percentage of the chart area width
				radiusPercentage: 2,
				// Needle width as the percentage of the chart area width
				widthPercentage: 3,
				// Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
				lengthPercentage: 80,
				// The color of the needle
				color: 'rgba(0, 0, 0, 1)'
			},
			valueLabel: {
				formatter: (value) => {
					return Math.round(RealValue);
				},
				backgroundColor: 'rgba(0, 0, 0, 1)',
				padding: {
					top: 10,
					bottom: 10,
					right: 10,
					left: 10,
				},
				borderRadius: 30,
				bottomMarginPercentage: 0
			},
			onClick: function(ctx, d) {
				if (d[0]==null) return;
				console.log(d[0]._index);
			}
		}
	};

	// Chart.pluginService.register({
	// 	afterDraw: function(chart, easing) {
	// 		// var ctx = chart.chart.ctx;
	// 		// var chartArea = chart.chartArea;
	// 		// var chartHeight = chartArea.bottom - chartArea.top;
	// 		// var chartWidht = chartArea.right - chartArea.left;
	// 	}
	// });

	var ctx = document.getElementById(param.chart).getContext('2d');
	new Chart(ctx, config);
}