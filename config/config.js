require('dotenv').config();

module.exports = {
  development: {
    username: 'masterdb',
    password: 'awsdbpassword',
    database: 'todolist',
    host: 'practicedb.crbjmuo2scdg.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

// module.exports = {
//   development: {
//     username: 'root',
//     password: null,
//     database: 'database_development',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   },
//   test: {
//     username: 'root',
//     password: null,
//     database: 'database_test',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   },
//   production: {
//     username: 'root',
//     password: null,
//     database: 'database_production',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//   },
// };
