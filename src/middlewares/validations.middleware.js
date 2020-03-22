import { fail } from '../utils/reponse.util';

const verifyKey = (req, res, next) => {

  if (req.params.hasOwnProperty('id') && !req.params.id.match(/^[0-9]+$/i)) {

    return fail(res)('only numbers are allowed as parameters', 400)
  }

  next()
}

module.exports = {
  verifyKey
}