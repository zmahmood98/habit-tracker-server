# Habit tracker

---

<!-- badges -->
[![MIT license](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/mit-license.php)
[![GitHub latest commit](https://img.shields.io/github/last-commit/Dafe-akaka/habit-tracker-server.svg)](https://GitHub.com/Dafe-akaka/habit-tracker-client/commit/)
[![GitHub forks](https://img.shields.io/github/forks/Dafe-akaka/habit-tracker-server.svg)](https://GitHub.com/Dafe-akaka/habit-tracker-client)

An app built to help users track their habits.

This is the server side of a group project working on a habit tracker app.
The server side is stored in [this repo](https://github.com/Dafe-akaka/habit-tracker-client).

## Installation & Usage
---

### Installation

1. Clone this repo using `git clone`
2. Enter the directory `cd habit-tracker-server`
   
### Usage

`bash _scripts/startDev.sh`
- starts api & db services
- runs db migrations
- seeds db for development
- serves api on localhost:3000

<!-- **bash _scripts/startTest.sh**
- starts api & db services
- runs db migrations
- attaches to api container and triggers full test run
- no ports mapped to local host -->

`bash _scripts/teardown.sh`
- stop all running services
- removes containers
- removes volumes

### Technologies

* [node.js 🔗](https://nodejs.org/) 
* [express 🔗](https://expressjs.com/)
* [node-postgres🔗](https://node-postgres.com/)
* [docker 🔗](https://docker.com/)
* [Jest 🔗](https://jestjs.io/)


## Main routes


| **URL** | **HTTP Verb** |  **Action**| 
|------------|-------------|------------|
| /users/          | GET       | index  | 
| /habits/         | GET       | index  | 
| /auth/login      | POST      | auth   | 
| /auth/register   | POST      | auth   |  

## Fixed Bugs

- [x] `bcrypt.compare()` deprecated
- [x] same email can be used to open different user accounts

## License

[MIT License 🔗](https://opensource.org/licenses/mit-license.php)
