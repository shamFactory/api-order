import BaseRepository from './base.repository';
import Stock from '../models/stock.model';

class StockRepository extends BaseRepository {
	constructor () { 
		super(Stock, 'codart') 
	}

	getStock(article) {
        return this.find(article.codart).then(res => {
            if (!res) {
                return this.create({
                    codart: article.codart,
                    descrip: article.descrip,
                    resto: article.resto,
                    peso: article.peso,
                    stock: 0,
				}).then(c => 0);
            } else {
                return res.stock;
            }
        });
    }
    
    updateOne(id, data) {
        let filters = {};
        filters[this.key] = id;
        return this.model.updateOne(filters, data);
    }
}

module.exports = StockRepository