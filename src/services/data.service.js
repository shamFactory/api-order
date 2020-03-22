import { ok, fail } from '../utils/reponse.util';

class DataService {
  constructor (model) {
    this.model = model
  }

  list (req, res, next) {
    let model = this.model;
    return model.findAll()
        .then(ok(res))
        .catch(fail(res));
  }

  one (req, res, next) {
    let model = this.model;
    let id = req.params.id;
    return model.find(id)
        .then(ok(res))
        .catch(fail(res));
  }
}

module.exports = DataService