const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/statistics', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true}).then(function(){
    console.log('connected to db');
}).catch(function(err){
    console.log('error connecting to db', err);
})

module.exports = {
    mongoose
}