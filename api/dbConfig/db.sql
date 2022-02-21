DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    passwd VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS habit;

CREATE TABLE habit (
    habit_id SERIAL PRIMARY KEY,
    habitDescription VARCHAR(100) NOT NULL,
    frequency INTEGER NOT NULL,
    currentFrequency INTEGER,
    currentTime timestamp DEFAULT CURRENT_timestamp,
    currentStreak INTEGER DEFAULT 0,
    maxStreak INTEGER DEFAULT 0,
    user_id INT,
    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);

DROP TABLE IF EXISTS habitCount;

CREATE TABLE habitCount (
    id serial PRIMARY KEY,
    habit_id INT,
    FOREIGN KEY(habit_id)
        REFERENCES habit(habit_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    timeDone timestamp DEFAULT CURRENT_timestamp,
    completedStreak BOOLEAN
);
