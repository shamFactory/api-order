import ArticlesRepository from '../repositories/articles.repository';
import OrderService from '../services/order.service';
import ArticleService from '../services/article.service';

class WebhookController {

  index (req, res, next) {
    return res.json({'text':'webhook is ready'})
  }

  post (req, res, next) {
    if (!(Object.keys(req.body).length === 0 && req.body.constructor === Object) && 
      !(Object.keys(req.body['queryResult']['parameters']).length === 0 && req.body['queryResult']['parameters'].constructor === Object)) {

        if (req.body['queryResult']['parameters']['test']) {
          return res.json({'fulfillmentText': req.body['queryResult']['parameters']['test']});
        }

        if (req.body['queryResult']['parameters']['article']) {
          console.log(req.body['queryResult']['parameters']);
          return new ArticleService().getArticleMessage(res, req.body['queryResult']['parameters']['article']);
        }

        if (req.body['queryResult']['parameters']['order']) {
          console.log(req.body['queryResult']['parameters']);
          return new OrderService().getOrderMessage(res, req.body['queryResult']['parameters']['order']);
        }
    }
  }

}
module.exports = WebhookController
