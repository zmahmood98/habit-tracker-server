DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwd VARCHAR(100) NOT NULL
);

INSERT INTO users (username, email, passwd) 
VALUES
('bill', 'bill@gmail.com','$2a$10$wx3Eylbd.bpWPeY/HIeRsO5eC9zejhFC2rIS4WO5POtfsx/TEAUOi'),
('jon', 'jon@gmail.com', '$2a$10$aAOMhIa09Kcqk60szmO2KOiiFvQmYQrqG5zwtvxC1U/f0zlwosNve');



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

INSERT INTO habit (habitDescription, frequency, currentFrequency, currentTime, currentStreak, maxStreak, user_id) VALUES
('drink water', 8, 3, current_timestamp - INTERVAL '3 days', 3, 3, 1),
('run 2k', 1, 0, current_timestamp - INTERVAL '2 days', 0, 1, 2),
('code', 5, 2,  current_timestamp, 0, 0, 2),
('sleep', 2, 1, current_timestamp - INTERVAL '6 days', 2, 2, 2);



DROP TABLE IF EXISTS habitCount;

CREATE TABLE habitCount (
    id serial PRIMARY KEY,
    habit_id INT,
    FOREIGN KEY(habit_id)
        REFERENCES habit(habit_id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    timeDone timestamp DEFAULT CURRENT_timestamp,
);

INSERT INTO habitCount(habit_id, timeDone) VALUES

        --completed task 1 three times today
        (1, current_timestamp),
        (1, current_timestamp),
        (1, current_timestamp),
        
        --completed task 1 8 times yesterday
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),
        (1, current_timestamp - INTERVAL '1 day'),


        --completed task 1 8 times the day before
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),
        (1, current_timestamp - INTERVAL '2 day'),

        --completed task 1 8 times the day before that
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),
        (1, current_timestamp - INTERVAL '3 day'),

        --completed habit 2 once two days ago (did not complete yesterday or today)
        (2, current_timestamp - INTERVAL '2 day'),

        --completed habit 3 twice today
        (3, current_timestamp),
        (3, current_timestamp),

        --completed task 4 1 time today
        (4, current_timestamp),
        --completed task 4 2 times 1 day ago
        (4, current_timestamp - INTERVAL '1 day'),
        (4, current_timestamp - INTERVAL '1 day'),
        --completed task 4 2 times 2 days ago
        (4, current_timestamp - INTERVAL '2 day'),
        (4, current_timestamp - INTERVAL '2 day'),
        --completed task 4 2 times 3 days ago
        (4, current_timestamp - INTERVAL '3 day'),
        (4, current_timestamp - INTERVAL '3 day'),
        --completed task 4 2 times 4 days ago
        (4, current_timestamp - INTERVAL '4 day'),
        (4, current_timestamp - INTERVAL '4 day'),
        --completed task 4 2 times 5 days ago
        (4, current_timestamp - INTERVAL '5 day'),
        (4, current_timestamp - INTERVAL '5 day'),
        --completed task 4 2 times 6 days ago
        (4, current_timestamp - INTERVAL '6 day'),
        (4, current_timestamp - INTERVAL '6 day');
