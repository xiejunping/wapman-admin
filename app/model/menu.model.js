const Model = require('./base.model.class')
const logger = require('../controllers/logger')

class MenuModel extends Model {

  constructor (DB) {
    super(DB)
  }

}

module.exports = MenuModel
