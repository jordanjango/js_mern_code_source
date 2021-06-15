# js_mern_code_source
<h4>javascript code written by anshoeman_dumb@me</h4>
The code is all about the user login authentication and then integrating it with Database.
ExpressJS was used for the development of the code.
To know more about ExpressJS visit https://expressjs.com/ .
To initiate the install :
1:Download NodeJS from https://nodejs.org/en/
2:For expressJS  npm install express --save
Dependencies used:
    "bcrypt": "^5.0.1",
    "body": "^5.1.0",
    "config": "^3.3.6",
    "express": "^4.17.1",
    "express-validator": "^6.11.1",
    "gravatar": "^1.8.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.12.12",
    "parser": "^0.1.4",
    "react-router-dom": "^5.2.0",
    "request": "^2.88.2"
    
  "devDependencies": 
    "concurrently": "^6.2.0",
    "nodemon": "^2.0.7"
    
Scripts running:
"scripts": 
    "start": "node server",
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
