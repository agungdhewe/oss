export async function generate(param) {
	var ctx = document.getElementById(param.chart).getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5", "Brand 6"],
			datasets: [{
				label: 'Ebit 2020',
				data: [12, 19, 3, 23, 2, 3],
				backgroundColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
				],
				// borderWidth: 1
			}]
		},
		options: {
			responsive: true,
			// scales: {
			// 	yAxes: [{
			// 		ticks: {
			// 			beginAtZero:true
			// 		}
			// 	}]
			// }
			title: {
				display: true,
				text: 'Sales By Brand'
			},
			legend: {
				position: 'bottom',	
			}
		},



	});
}



// 'rgba(255, 99, 132, 0.2)',
// 'rgba(54, 162, 235, 0.2)',
// 'rgba(255, 206, 86, 0.2)',
// 'rgba(75, 192, 192, 0.2)',
// 'rgba(153, 102, 255, 0.2)',
// 'rgba(255, 159, 64, 0.2)'