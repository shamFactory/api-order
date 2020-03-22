import ArticlesRepository from '../repositories/articles.repository';
import { ok, fail } from '../utils/reponse.util';

class ArticlesController {

  index (req, res, next) {
    return new ArticlesRepository().findAll()
    	.then(ok(res))
      .catch(fail(res));
  }

  detail (req, res, next) {
    return new ArticlesRepository().find(req.params.id)
    	.then(ok(res))
      .catch(fail(res));
  }
}
module.exports = ArticlesController
