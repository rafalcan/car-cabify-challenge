# Car Pooling Service Challenge

This project was created using ExpressJS, SQLite, Sequelize and Docker to build a car pooling service for the Cabify Challenge in the GitLab. I moved to here just to group up the challenges and that's why some parts didn't work because was not in the project of Cabify GitLab.

## Dependencies
- ExpressJS (for REST API structure and handle requests)
- Sequelize (ORM promise-based to handle database interactions)
- SQLite (for persistence of data)
- Jest (for unit test locally)
- Nodemon (for live reload of the code locally)
- Docker (for create a image of the service)

## Run application
- First of all make sure you have Node installed and that you're using version 12+ by running: `node -v`.
- Before run the application you have to install dependencies: `npm install`.
- After prepare the database: `npm run migrate`.
- Now you can run the application using: `npm run start` or `npm run live`.
- And then using this URL `http://localhost:3000/` in the Postman to test the endpoints for example.
- To shut the application down, enter the command `ctrl + c`.

## Run application with Docker
- First of all make sure Docker is running and that you're using version 18+ by running: `docker -v`.
- Run `docker build -t car-pooling-challenge .` to build a local version of the image.
- Now you can run the application using Docker: `docker run --rm --name cpc -p 9091:9091 -d car-pooling-challenge`.
- Check that the container are running by typing `docker ps` and then using this URL `http://localhost:9091/` in the Postman to test the endpoints for example.
- To shut the application down, enter the command `docker stop cpc`.

## Available Scripts
All the scripts are based on the NODE_ENV so the default is development.
*Before run the scripts see the section Run application*

In the root project directory, you can run:

##### `npm start`
Runs the app.
Open `http://localhost:3000/` in the Postman to test the endpoints for example.

##### `npm run live`
Runs the app with live reload for continuous coding.
Open `http://localhost:3000/` in the Postman to test the endpoints for example.

##### `migrate:remove`
Remove all that the migrate created leaving the database empty.

##### `migrate:reset`
Remove all that the migrate created and put again.

##### `migrate`
Create all tables and constraints needed to the application works.

##### `test:prepare`
The migrate for create the database of test if not exist and your tables.

##### `test`
Runs the Jest with runInBand to prevent errors in the database inserts.

##### `coverage`
Runs the Jest in the mode coverage.

## Project Structure
```
app/                              source code
|- controllers/                   all logic of the routes
|- database/                      Sequelize ORM models, configs and SQLites files
|- helpers/                       validation helper for handle errors
|- routes/                        create of routes with paths, verbs and logic
|- server/                        structure file of the server
|- tests/                         all the tests of the application
.dockerignore                     for prevent files from add in the docker build
.editorconfig                     editorconfig help to standarize the code
.eslintrc                         configuration file of eslint
.gitignore                        for prevent files from add in the commits
.gitlab-ci.yml                    configuration file of gitlab ci
.sequelizerc                      configuration file of Sequelize
Dockerfile                        recipe for the docker build
index.js                          start file of application based ExpressJS
package.json                      package configuration
start.sh                          bash used in the docker for start application
```

### Original README
You can find here [CHALLENGE](./CHALLENGE.md).
