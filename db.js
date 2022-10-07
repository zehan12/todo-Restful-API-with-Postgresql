const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    password:process.env.PG_PASSWORD,
    host:"localhost",
    port: 5432
});

module.exports = pool;