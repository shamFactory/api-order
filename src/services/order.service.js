import DataService from './data.service';
import SequencesRepository from '../repositories/sequences.repository';
import OrdersRepository from '../repositories/orders.repository';
import ArticlesRepository from '../repositories/articles.repository';
import StockRepository from '../repositories/stock.repository';
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

    async getOrderMessage(res, orders) {
        const split = orders.split(',');

        if (split.length < 1) {
            return res.json({});
        }

        const promises = [];
        let text = '';
        await split.map( orderText => {
            const params = orderText.split(' of #');
            if (params.length == 2)
                promises.push(this.create(params[1], params[0], 'phone'));
        });

        await promises.reduce(async (previousPromise, nextAsyncFunction) => {
            await previousPromise;
            return nextAsyncFunction.then(order => {
                console.log(`Created new order #${order.ticketId}.`);
                text += `Created new order #${order.ticketId}. `;
            }).catch(err => {
                console.log(`Error: ${err}.`);
                text += `Error: ${err}. `;
            })
          }, Promise.resolve())

        res.json({ 'fulfillmentText': text} );
    }

    
    create(articleId, amount, phone) {

        let article = this.articlesRepository.find(articleId, '-__v');
        const sequence = new SequencesRepository().getLast('orders');
        
        return Promise.all([article, sequence]).then(res => {
            if (!res[0] || res[1] < 1){
                return new Promise((resolve, reject) => {reject('Article not found')});
            }
            article = res[0];
            return new StockRepository().getStock(article).then(stock => {
                if (stock < 1)
                    return new Promise((resolve, reject) => {reject('There not stock')});

                if (stock < amount)
                    return new Promise((resolve, reject) => {reject('Amount is major than stock')});

                stock -= amount;
                return new StockRepository().updateOne(article.codart, {stock: stock}).then(s => {
                    return new OrdersRepository().create({
                        ticketId: res[1],
                        productId: article._id,
                        quantity: amount,
                        description: article.descrip,
                        netPrice: article.valor,
                        phone: phone,
                    }).then(o => o);
                });
            });

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
                    productId: art.find(a => String(a._id) == String(res.productId)).codart,
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