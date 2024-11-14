# Welcome to BUILDINGUERIE RESTful API.

You will find in this README some informations about uses cases, dependencies details & versionning, logic of current architecture and details about present files.

## Getting Started (update: this section is for local dev. You can use docker env instead.)

0. Requirement: *node.js v21.7.1*

1. For installing dependencies :
> npm install

2. Create a buildinguerie_dev_db in mariadb / mysql.

3. Edit the .env file with rights informations.

4. Sync db structure :
> node config/sync.js

5. Start the project :
> npm start

*(after each db update, please run again the 4. command. note that command will erase your db datas)*

## Dependencies & Versionning

- **bcrypt, v5.1.1** for encrypting passwords
- **dotenv, v16.4.5** for reading env variables in .env file in a code context
- **express, v4.21.1** the js framework for building app, based on node.js
- **mysql2, v3.11.3** for handling sql databases connexions inside express app
- **sequelize, v6.37.4** library orm for mapping object into db using code

## Repository Architecture & Details

*README.md* current file. 

*.gitignore* file that contains elements that which must not be push. Be careful to not push .env file !

*.env* contains your environment variables for application dev.

*node_modules/* and *packge-lock.json* automatically generated when npm install or update. Should not be pushed.

*package.json* file contains meta about app, dependecies version... Important file.

*config/* contains file for config:
- *db.js* contains config for mysql db connexion and sequelize configuration from .env var.
- *sync.js* contains logic for build db architecture from models

*models/* contains datas architecture for each entity.

*routes/* contains all endpoints for each entity.

*controllers/* implements business logic for each entity.

*app.js* file is the entry point of our application.

## Documentation

Documentation will be written using OpenAPI (Swagger Specification).
Please find it at /doc.
On this page you can see all endpoints, test them etc...

A swaggerOptions.js file describe the behavior of Swagger. All annotations are specified on routes files.

## Git conventionnals

Please use conventionnals commits specification. You can use the dedicated extension on VSCode store.

The work branch is develop/

Each new user story mean a new branch, that will be fetch on develop branch.

## Postman workspace

For requests collections. Useful for developing and functionnals tests. Please contact @Hephel for access.


### *to be implemented...*
- tests policy
- jwt handling and auth politic
