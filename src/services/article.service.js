import StockRepository from '../repositories/stock.repository';
import ArticlesRepository from '../repositories/articles.repository';

class ArticleService {

    getArticleMessage(res, id) {
        const article = new ArticlesRepository().find(id);
        const stock = new StockRepository().find(id);
        return Promise.all([article, stock]).then(data => {
            const art = data[0];
            const stk = data[1] || { stock: 0 };

            if (!art)
                return res.json({});

            const text = `#${art.codart}: ${art.descrip}, ${art.valor} USD, stock: ${stk.stock} `;
            return res.json({ 'fulfillmentText': text });
        }).catch(err => {
            console.log(err)
            return err
        })
    }

}

module.exports = ArticleService;