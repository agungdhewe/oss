'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order In",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'SO', 
	printing: true,	
	committer: true,

	persistent: {
		'trn_orderindelv': {
			
		}

	}
}