const {from} = require('rxjs');
let User = require('../models/user');

class UserService {
    constructor() {

    }

    add(userObj) {
        let newUser = new User(userObj);
        return newUser.save();

    }

    getOne(queryObj) {
        return from(User.findOne(queryObj));
    }

    getAll(queryObj) {
        return from(User.find(queryObj));
    }

    update(queryObj, updateObj) {
        return from(User.updateOne(queryObj, updateObj));
    }

    delete(queryObj) {}
}

module.exports = UserService;