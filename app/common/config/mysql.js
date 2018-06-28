const dev = {
  host: '124.172.155.200',
  user: 'coinfun_f',
  password: 'zwm198875',
  port: '3306',
  database: 'coinfun',
  supportBigNumbers: true,
  multipleStatements: true,
  connectionLimit: 1000,
  timezone: 'utc'
}

const prod = {}

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
