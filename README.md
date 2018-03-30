# OnlineBookStore


> My "JavaScript MEAN stack" web application - a final project 
for Code Louisville Full-Stack JavaScript 2018 (January-March) session. [codelouisville.org](codelouisville.org)

OnlineBookStore is a web application designed potentially to let people safely (based on a small community model - neighborhood, street, school)
sell/trade/give away their old books. That is why I didn't implement any payment systems (PayPal, Zelle, etc) - people know each other really well and want to use the app to communicate faster and efficiently. 


## ONLINE REPRESENTATION

I have deployed a live demo to Heroku - a platform that enables to run the application entirely in the cloud.

To check it out go to [https://myonlinebookstore.herokuapp.com/](https://myonlinebookstore.herokuapp.com/)

## Features

* Authentication:
  * User login with username and password

* Authorization:
  * One cannot manage posts without being authenticated
  * One cannot edit or delete posts and comments created by other users

* Manage posts with four basic "CRUD" functions: 
  * you can create, read, update and delete all your books and comments

* Upload book photos

* Flash messages as a way to help users to interact with the app

* The app is fully responsive to different devices, browser sizes or screen resolutions (Bootstrap)

* A Back-End side of the app implemented using Node.js with MongoDB and MLab databases.

 
## Getting Started

```sh
git clone https://github.com/alimnastaev/onlinebookstore.git
```

### Install dependencies

```sh
npm install
```

### Start the application

```sh
node app.js (or nodemon)
```

### In your browser

```sh
localhost:3000
```


## Built with

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [express-session](https://github.com/expressjs/session#express-session)
* [body-parser](https://github.com/expressjs/body-parser)
* [cookie-parser](https://github.com/expressjs/cookie-parser)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [moment](https://momentjs.com/)
* [mongoose](http://mongoosejs.com/)
* [mongoDB](https://www.mongodb.com/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose)
* [nodemon](https://nodemon.io/)



### Platform

* [Heroku](https://www.heroku.com/)

