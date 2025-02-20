# Requirements
To run this project you will need a computer with Node, Typescript, MongoDB and Cucumber installed.

# Install
To install the project, you just have to run `npm install` to get all the dependencies

# Running the tests
After installing the dependencies you can run the tests with this command `npm run test` for in memory test or `npm run test:critical` for running critical tests with mongoDB.

# Using commands
You can run these commands when in the src folder:
./fleet create <userId> # returns fleetId on the standard output
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]

# Project structure
src
    App             # Contains the commands and their handlers and some queries     
        commands
        handlers
        queries
    Domain          # Domain logic
    Infra           # Database logic
    tests           # Contains feature files and their corresponding tests
        features    
        steps
    fleet           # A file to use commands in CLI
    index.js        # A file to use commands the fleet file
cucumber.js         # Cucumber configuration
package.json        # Dependencies and scripts
readme.md           # This file

# Step 3
For code quality, you can use some tools : which one and why (in a few words) ?
I can use linters, code formatters, code analyzers and syntax checkers such as eslint, prettier, sonarQube or code spell chacker

you can consider to setup a ci/cd process : describe the necessary actions in a few words
First, I have to create a yml file on Git to launch a pipeline on some branches every time there is a push.
The yml file contains a list of commands to execute everytime a job is started on the pipeline.
Finally, I can use a tool like Docker to package my application.