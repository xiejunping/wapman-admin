const Model = require('./base.model.class')
const logger = require('../controllers/logger')

class LoginModel extends Model {
  constructor (DB) {
    super(DB)
  }
}

module.exports = LoginModel
