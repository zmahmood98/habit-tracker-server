const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class Habit {

    constructor(data){
        this.habit_id = data.habit_id
        this.habitDescription = data.habitDescription
        this.frequency = data.frequency
        this.currentFrequency = data.currentFrequency
        this.currentTime = data.currentTime
        this.streak = 0
    }

    // Get all habits
    static get all(){
        return new Promise(async (resolve, reject) => {
            try {
                let result = await db.query(SQL`SELECT * FROM habit`);

                let habits = result.rows.map(r => new Habit(r))

                resolve(habits)

            } catch (err) {
                reject(`There was an error retrieving those habits: ${err}`)
            }
        })
    }

    // Create a new habit
    static createHabit({habit, frequency, username}) {
        return new Promise (async (resolve, reject) => {
            try {
                const getUser = await db.query("SELECT user_id FROM users WHERE username = $1", [username])
                
                const createdHabit = await db.query(SQL`INSERT INTO habit (habit, currentFrequency, frequency, user_id) VALUES (${habit}, 0, ${frequency}, ${getUser.rows[0].user_id}) RETURNING *;`)

                let newHabit = new Habit(createdHabit.rows[0]);

                resolve(newHabit)
        
            } catch (err) {
                reject(`Could not create that habit: ${err}`)
            }
        })
    }

    // Delete a habit
    static deleteHabit(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query(SQL`DELETE FROM habit WHERE habit_id = ${id};`)
                resolve('Habit deleted')
            } catch (err) {
                reject(`There was an error deleting that habit: ${err}`)
            }
        })
    }

    // Get habits by username
    static getHabitsByName(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const allHabits = await db.query(SQL`SELECT * FROM habit INNER JOIN user_table ON (habit.user_id = users.user_id) AND (users.username = ${username}) ORDER BY habit_id DESC;`);

                let habits = allHabits.rows.map(r => new Habit(r))

                resolve(habits)

            } catch (err) {
                reject(`There was an error getting ${username}'s habits: ${err}`)
            }
        })
    }

    // 

}

module.exports = { Habit }
