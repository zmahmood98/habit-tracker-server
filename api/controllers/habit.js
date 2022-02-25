const {Habit} = require('../model/Habit');

async function getAllHabits (req, res){
    try {
        const allHabits = await Habit.all;
        res.status(200).json(allHabits)
    }  catch (err) {
        res.status(500).send({ err })
    }
}

async function create (req, res){
    try {
        console.log("this is what is getting sent",req.body)
        const {username} = req.params
        console.log(username)
        const habit = await Habit.createHabit({...req.body, username})
        res.status(201).json(habit)
    } catch (err) {
        res.status(500).send({ err })
    }
}

async function destroy(req, res){
    try {
        const deleteHabit = await Habit.deleteHabit(req.params.id);
        //console.log(`this is delete habit ${deleteHabit}`);
        res.status(202).json(deleteHabit)

    } catch (err) {
        res.status(500).send({ err })
    }
}

async function getHabitsByEmail (req, res){
    try {
        const habit = await Habit.getHabitsByEmail(req.params.email);
        res.status(200).json(habit)
    } catch (err) {
        res.status(500).send({ err })
    }
}

async function getHabits (req, res){
    try {
        const {username} = req.params
        const getData = await Habit.getHabitsPlusStreaks(username)
        res.status(200).json(getData)
    } catch (err) {
        res.status(404).send({err: err})
    }
}

async function updateHabitCounter(req, res) {
    try {
        //check if valid jwt is for the requested user
        // if (res.locals.user !== req.params.username) throw err
        let response
        let username = req.body.username
        const habit = await Habit.newEntry({ ...req.body, date: new Date().toLocaleString('en-US', {timeZone: 'Europe/London'})});
        habit === 'Everything up to date!' ? response = await Habit.getHabitsPlusStreaks(username) : console.log(habit)
        console.log(response)
        res.status(201).json(response)
      } catch (err) {
        res.status(403).send({ err: err })
      }
}

async function getGraphData (req, res){
    try {
        const data = await Habit.getGraphData(req.params.email);
        if(Object.keys(data).length === 0){throw new Error};
        res.status(200).json(data)
    } catch (err) {
        res.status(404).send({ err })
    }
}

async function getGraphDatabyHabitId (req, res){
    try {
        const data = await Habit.getGraphDatabyHabitId(req.params.id);
        if(Object.keys(data).length === 0){throw new Error};
        res.status(200).json(data)
    } catch (err) {
        res.status(404).send({ err })
    }
}


module.exports = {
    getAllHabits,
    create,
    destroy,
    getHabitsByEmail,
    getHabits,
    updateHabitCounter,
    getGraphData,
    getGraphDatabyHabitId
}
