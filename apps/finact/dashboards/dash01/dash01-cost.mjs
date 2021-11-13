export async function generate(param) {
	var ctx = document.getElementById(param.chart).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["JAN", "FEB", "MAR", "APR", "MEI", "JUN"],
			datasets: [
						{
							label: 'Sales',
							data: [12, 19, 3, 23, 2, 3],
							backgroundColor: 'rgb(54, 162, 235)',
							borderWidth: 1
						},
						{
							label: 'Cost',
							data: [9, 10, 9, 15, 1.5, 2],
							backgroundColor: 'rgb(255, 99, 132)', 
							borderWidth: 1
						},

					]
		},
		options: {
			responsive: true,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		}
	});
}