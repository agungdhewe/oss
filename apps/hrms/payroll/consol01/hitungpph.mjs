/* 
 *  module javascript menghitung nilai pph dari bruto 
 *  
 *  Agung Nugroho,
 *  15 Desember 2020
*/   

var pph = HitungPPh(600);
console.log(pph);



export function HitungPPh(pkp) {
	var data = [{platform:0, sisa:pkp}]

	var formula_bawah = (data, tarif, batasatas) => {
		var layer = (data.sisa > batasatas) ? { platform: batasatas, sisa: data.sisa - batasatas } : {platform: data.sisa, sisa:0};
		layer.tax = layer.platform * tarif;
		return layer;
	}

	var formula_tengah = (data, tarif, batasbawah, batasatas) => {
		var maxplatform = batasatas - batasbawah;
		var layer = (data.sisa > maxplatform) ? {platform: maxplatform, sisa: data.sisa -maxplatform} :  {platform: data.sisa, sisa: 0};
		layer.tax = layer.platform * tarif;
		return layer;
	}

	var formula_atas = (data, tarif) => {
		var layer= (data.sisa>0) ? {platform: data.sisa, sisa: 0} : {platform: 0, sisa: 0};
		layer.tax = layer.platform * tarif;
		return layer;
	}

	var layers = {
		1 : (data) => { return formula_bawah(data,  0.05, 50) },
		2 : (data) => { return formula_tengah(data, 0.15, 50, 250 ) },
		3 : (data) => { return formula_tengah(data, 0.25, 250, 500) },
		4 : (data) => { return formula_atas(data,   0.30) },
	}

	var tax = 0;
	for (var i=1; i<=4; i++) {
		data.push(layers[i](data[i-1]));
		tax += data[i].tax!=null ? data[i].tax : 0;
	}
	data.shift();
	return tax;
}





