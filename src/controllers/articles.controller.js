import ArticlesRepository from '../repositories/articles.repository';
import DataService from '../services/data.service';

class ArticlesController {

  index (req, res, next) {
    new DataService(new ArticlesRepository).list(req, res, next);
  }

  detail (req, res, next) {
    new DataService(new ArticlesRepository).one(req, res, next);
  }
}
module.exports = ArticlesController
