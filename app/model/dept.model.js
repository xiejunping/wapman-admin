const Model = require('./base.model.class')
const logger = require('../controllers/logger')

class DeptModel extends Model {
  constructor (DB) {
    super(DB)
  }
}

module.exports = DeptModel
