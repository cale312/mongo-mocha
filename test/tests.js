const assert = require('assert');
const MarioChar = require('../models/marioChar');

describe("Tests on saving, finding, updating and deleting records in the database!", function() {

    beforeEach(function(done) {
        var char = new MarioChar({
            name: 'Mario',
            weight: 40
        });

        char.save().then(function() {
            //  assert if the name has been saved in the database by using the isNew function...
            //  >> it returns 'TRUE' if the name has been created but not yet saved in the database...
            //  >> it returns 'FALSE' if the name has been created and has been saved to the database...
            // assert(char.isNew === false);
            done();
        });
    });

    it("Find one record in the database", function(done) {
        MarioChar.findOne({
            name: 'Mario'
        }).then(function(result) {
            assert(result.name === 'Mario');
            done();
        });
    });

    it("Delete a record in the database", function(done) {
        MarioChar.findOneAndRemove({
            name: 'Mario'
        }).then(function(result) {
            MarioChar.findOne({
                name: 'Mario'
            }).then(function(result) {
                // null is the same as 'nothing'; null === not found...
                assert(result === null);
                done();
            });
        });
    });

    it("Updating a record in the database", function(done) {
        MarioChar.findOneAndUpdate({
            name: 'Mario'
        }, {
            name: 'Luigi'
        }).then(function() {
            MarioChar.findOne({
                name: 'Luigi'
            }).then(function(result) {
                assert(result.name === 'Luigi');
                done();
            });
        });
    });

    it("Updating the weight, incrementing it by one", function(done) {
        MarioChar.update({}, {
            $inc: {
                weight: 1
            }
        }).then(function() {
            MarioChar.findOne({
                name: 'Mario'
            }).then(function(result) {
                assert(result.weight === 41);
                done();
            });
        });
    });

});
