require('dotenv/config')

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      timezone: '-03:00'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: { min: 0, max: 10 }
  }
}
