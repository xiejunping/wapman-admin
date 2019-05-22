const dev = {
  appid: 'wxc6c731b36e7cbc7c',
  secret: 'f905522fc98924dd24e47735bc00ddc3',
  token: 'amEQlniuKvibA7rzvsgq'
};

const prod = {
  appid: 'wxc6c731b36e7cbc7c',
  secret: 'f905522fc98924dd24e47735bc00ddc3',
  token: 'amEQlniuKvibA7rzvsgq'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
