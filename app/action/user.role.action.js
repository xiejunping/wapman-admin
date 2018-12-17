const Mysql = require('../common/helper/mysql');
const DB = new Mysql('wap_user_role');
const useRoleModel = require('../model/user.role.model')(DB);

const logger = require('../controllers/logger');
const utils = require('../utils/index');

const action = {
  async getUserRole (uid) {
    return await useRoleModel.getInfoByJson({uid});
  }
};

module.exports = action;
