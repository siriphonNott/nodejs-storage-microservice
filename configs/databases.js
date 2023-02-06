import mysql from 'mysql2'
import config from '../configs/app.js'

const databases = {
  mongoDB() {},

  mysql() {
    const pool = mysql.createPool({
      host: config.dbHostname,
      user: config.dbUsername,
      password: config.dbPassword,
      database: config.dbDatabase,
      charset: "utf8",
      connectionLimit: 100,
    })
    const promisePool = pool.promise()
    return promisePool
  },

  postgresql() {},

  mssql() {},
}

export default databases.mysql()
