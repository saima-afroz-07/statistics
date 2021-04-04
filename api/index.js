const express = require('express');
const app = express();
const { mongoose } = require('./config/db');
const { Statistics } = require('./app/models/statistics')
const { statisticsController } = require('./app/controllers/statistics-controller')
const port = 3000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

app.get('/', function(req,res){
    res.send('welcome to the site');
});

app.use('/', statisticsController)

app.listen(port, () => {
    console.log("Listening at port => ", port)
})