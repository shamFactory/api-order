import BaseRepository from './base.repository';
import Stock from '../models/stock.model';

class StockRepository extends BaseRepository {
	constructor () { 
		super(Stock, 'codart') 
	}
}

module.exports = StockRepository