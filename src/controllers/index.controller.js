import { ok } from '../utils/reponse';

class IndexController {

  index (req, res, next) {
    return ok(res)({title: 'Api is ready'})
  }
}
module.exports = IndexController
