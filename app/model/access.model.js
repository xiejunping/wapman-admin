const Model = require('./base.model.class')
const logger = require('../controllers/logger')

class AccessModel extends Model {
  constructor (DB) {
    super(DB)
  }

}

module.exports = AccessModel
