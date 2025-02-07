# Welcome to NEIGHBORROW RESTful API.

You will find in this README some information about use cases, dependencies details & versioning, the logic of the current architecture, and details about present files.

## Getting Started

### Note: you can alors use docker, with 'docker-compose up' command

0. Requirement: *node.js v21.7.1*

1. For installing dependencies :
> npm install

2. Create a `neighborrow_dev_db` in mariadb / mysql.

3. Edit the `.env` file with the right information.

4. Sync db structure :
> npm run sync

5. Run fixtures :
> npm run fixtures

6. Start the project :
> npm start

*(after each db update, please run again the 4 & 5. command. Note that this command will erase your db data)*

## `make-entity`

You can generate a new model/entity using the `make-entity` script. This tool helps you quickly create a model along with its migration file.

To generate a new entity, run:
> npm run make-entity MyNewEntity

## Dependencies & Versioning

- **bcrypt, v5.1.1** for encrypting passwords
- **cors, v2.8.5** for enabling Cross-Origin Resource Sharing (CORS) support
- **dotenv, v16.4.5** for reading env variables in the `.env` file in a code context
- **express, v4.21.1** the JS framework for the Neighborrow app, based on node.js
- **jsonwebtoken, v9.0.2** for handling JWT authentication
- **mysql2, v3.11.3** for handling SQL database connections inside the express app
- **sequelize, v6.37.4** library ORM for mapping objects into the DB using code
- **swagger-jsdoc, v6.2.8** for generating Swagger API docs from JSDoc comments
- **swagger-ui-express, v5.0.1** for serving the Swagger API documentation via an Express server
- **mariadb, v2.5.5** (if you're using MariaDB instead of MySQL) for handling MariaDB connections
- **pg, v8.11.0** (if you're using PostgreSQL) for handling PostgreSQL connections
- **sequelize-cli, v6.4.0** for CLI support with Sequelize to run migrations and seeders

## Repository Architecture & Details

*README.md* current file.

*.gitignore* file that contains elements that must not be pushed. Be careful not to push the `.env` file!

*.env* contains your environment variables for application dev.

*node_modules/* and *package-lock.json* automatically generated when `npm install` or update. Should not be pushed.

*package.json* file contains meta about the app, dependencies version... Important file.

*config/* contains files for configuration:
- *db.js* contains the configuration for the MySQL DB connection and Sequelize setup using `.env` variables.
- *sync.js* contains logic to build the DB architecture from models.

*models/* contains the data architecture for each entity.
- All associations (relationships between models) are defined in **models/associations.js**. This file centralizes all the relationships (like `hasMany`, `belongsTo`, etc.). **It is important to only import models from `models/associations.js` to ensure all relationships are properly linked.**

*routes/* contains all endpoints for each entity.

*controllers/* implements the business logic for each entity.

*app.js* file is the entry point of our application.

## Documentation

Documentation will be written using OpenAPI (Swagger Specification).
Please find it at `/doc`.
On this page, you can see all endpoints, test them, etc...

A `swaggerOptions.js` file describes the behavior of Swagger. All annotations are specified in the route files.

## Git conventions

Please use conventional commit specifications. You can use the dedicated extension on the VSCode store.

The work branch is `develop/`.

Each new user story means a new branch, which will be merged into the `develop` branch.

For details, please look at https://buildesp.atlassian.net/wiki/x/AQBmBQ

## Postman workspace

For request collections. Useful for development and functional tests. Please contact @Hephel for access.

## Testing Policy

Work in progress...