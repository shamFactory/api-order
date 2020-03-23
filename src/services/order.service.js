import DataService from './data.service';
import SequencesRepository from '../repositories/sequences.repository';
import OrdersRepository from '../repositories/orders.repository';
import ArticlesRepository from '../repositories/articles.repository';
import globalConfig from '../config/global.config';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

class OrderService extends DataService {

    constructor() {
        super(new OrdersRepository)
        this.model = new OrdersRepository;
        this.articlesRepository = new ArticlesRepository;
    }
    
    create(articleId, amount, phone) {

        let article = this.articlesRepository.find(articleId, '-__v');
        const sequence = new SequencesRepository().getLast('orders');

        return Promise.all([article, sequence]).then(res => {
            if (!res[0] || res[1] < 1){
                return new Promise((resolve, reject) => {reject('Article not found')});
            }

            article = res[0];
            return new OrdersRepository().create({
                ticketId: res[1],
                productId: article._id,
                quantity: amount,
                description: article.descrip,
                netPrice: article.valor,
                phone: phone,
            }).then(o => o);
        }).catch( err => new Promise((resolve, reject) => {reject(err)}) )
    }

    async addCsv(orders, fileName) {
        fileName = fileName || 'orders.csv';
        const file = path.resolve(globalConfig.path_csv, fileName)
        const csvFile = fs.createWriteStream(file, { flags: 'a' });
        csvFile.write('\n');

        this.articlesRepository.model.find( { _id: { $in: orders.map(res => res.productId) } } ).then(art => {
            csv.writeToStream(csvFile, orders.map((res) => {

                return {
                    ticketId: res.ticketId,
                    productId: art.find(a => String(a._id) == String(res.productId)).codeart,
                    quantity: res.quantity,
                    description: res.description,
                    netPrice: res.netPrice,
                    phone: res.phone
                }
            }), { headers: false })
        });
    }
}

module.exports = OrderService;