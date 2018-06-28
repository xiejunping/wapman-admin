const dev = {
  host: '127.0.0.1',
  port: '6379',
  password: 'zwm198875'
};

const prod = {
  host: '127.0.0.1',
  port: '6379',
  password: 'zwm198875'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev
