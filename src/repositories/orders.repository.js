import BaseRepository from './base.repository';
import Orders from '../models/orders.model';

class OrdersRepository extends BaseRepository {
	constructor () { 
		super(Orders, 'ticketId') 
	}
}

module.exports = OrdersRepository