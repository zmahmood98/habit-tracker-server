const { Pool } = require("pg");
let pool;
console.log(process.env.NODE_ENV);
console.log(process.env.DATABASE_URL);
console.log(process.env.SECRET);

if (process.env.NODE_ENV === 'production') { //default environment for heroku
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false,
            }
    })
} else {
    pool = new Pool()
}

module.exports = pool;
