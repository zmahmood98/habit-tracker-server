TRUNCATE users, habit, habitCount RESTART IDENTITY;

INSERT INTO users (username, email, passwd) 
VALUES
('bill', 'bill@gmail.com','$2a$10$wx3Eylbd.bpWPeY/HIeRsO5eC9zejhFC2rIS4WO5POtfsx/TEAUOi'),
('jon', 'jon@gmail.com', '$2a$10$aAOMhIa09Kcqk60szmO2KOiiFvQmYQrqG5zwtvxC1U/f0zlwosNve');

INSERT INTO habit (habitDescription, frequency, currentFrequency, currentTime, currentStreak, maxStreak, user_id) VALUES
('drink water', 8, 3, current_timestamp - INTERVAL '3 days', 3, 3, 1),
('run 2k', 1, 0, current_timestamp - INTERVAL '2 days', 0, 1, 2);

INSERT INTO habitCount(habit_id, timeDone, completedStreak) VALUES
        --completed task 1 (drink water) 8 times yesterday

        (1, current_timestamp , FALSE),
        (1, current_timestamp , FALSE),
        (1, current_timestamp , FALSE),

        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),
        (1, current_timestamp - INTERVAL '1 day', FALSE),

        --completed task 1 8 times the day before
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),
        (1, current_timestamp - INTERVAL '2 day', FALSE),

        --completed task 1 8 times the day before that
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),
        (1, current_timestamp - INTERVAL '3 day', FALSE),

        (2, current_timestamp - INTERVAL '2 day', FALSE);
