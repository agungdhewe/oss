import * as cRevenue from './dash01-revenue.mjs';
import * as cCollection from './dash01-collection.mjs';
import * as cCost from './dash01-cost.mjs';
import * as cEbit from './dash01-ebit.mjs';



export async function init(opt) {
	cRevenue.generate({chart: 'chart-revenue', indicator:'chart-revenue-loading', opt: opt});
	cCollection.generate({chart: 'chart-collection', indicator:'chart-collection-loading', opt: opt});
	cCost.generate({chart: 'chart-cost', indicator:'chart-cost-loading', opt: opt});
	cEbit.generate({chart: 'chart-ebit', indicator:'chart-ebit-loading', opt: opt});
}


