const express = require('express');
const router = express.Router();
const axios = require('axios');

const { Statistics } = require('../models/statistics');

const { ObjectID } = require('mongodb');

let json_data;

axios.get('http://45.79.111.106/interview.json').then(function (response) {
    json_data = response;
    console.log(response);
})
.catch(function (error) {
    console.log(error);
})

router.get('/statistics', (req,res) => {
    res.send(json_data.data);
})


module.exports = {
    statisticsController: router
}