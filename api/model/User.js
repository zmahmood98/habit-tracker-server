const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class User {
    constructor(data){
        this.username = data.username
        this.email = data.email
        this.passwd = data.passwd
    }

    static get all(){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(SQL`SELECT * FROM users;`);
                let users = result.rows.map(r => new User(r))
                res(users)
            } catch (err) {
                rej(`Error retrieving users: ${err}`)
            }
        });
    };

    static findUsername (username) {
        return new Promise(async (res, rej) => {
            try {
                const user = await db.query(SQL`SELECT * FROM users WHERE username = ${username};`);
                res(user)
            } catch (err) {
                rej(`Error finding that user: ${err}`)
            }
        });
    };

    static create({ username, email, password }){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(SQL`INSERT INTO users (username, email, passwd) VALUES (${username}, ${email}, ${password}) RETURNING *;`);
                let user = new User(result.rows[0]);
                res(user)
            } catch (err) {
                rej(`Error creating user: ${err}`)
            }
        })
    }

    static findByEmail(email){
        return new Promise(async (res, rej) => {
            try {
                let result = await db.query(SQL`SELECT * FROM users
                                                WHERE email = ${email};`);
                let user = new User(result.rows[0])
                res(user)
            } catch (err) {
                rej(`Error retrieving user: ${err}`)
            }
        })
    }

    
}

module.exports = User
