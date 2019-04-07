const Model = require('./base.model.class')
const logger = require('../controllers/logger')

class RoleAccessModel extends Model {
  constructor (DB) {
    super(DB)
  }
}

module.exports = RoleAccessModel
