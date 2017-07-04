const mongoose = require('mongoose');

// Change the promise library
mongoose.Promise = global.Promise;

//  the beforeEach hook connects to the database before running any of the tests...
before(function(done) {
    //connect to mongo db
    mongoose.connect('mongodb://localhost/testing');

    mongoose.connection.once('open', function() {
        console.log('We are now connected!');
        done();
    }).on('error', function(err) {
        console.log("connection error:", err);
    });
});

//  the beforeEach hook drops/deletes the database before running any of the tests...
beforeEach(function(done) {
    mongoose.connection.collections.mariochars.drop(function() {
        done();
    });
});
