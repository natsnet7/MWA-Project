const {from} = require('rxjs');
let Question = require('../models/question');

class QuestionService {
    constructor() {

    }

    add(questionObj) {
        let newQuestion = new Question(questionObj);
        return newQuestion.save();

    }

    get(queryObj) {
        return from(Question.find(queryObj));
    }

    getExamQuestions(amount) {
        return from(Question.find({}).where('active').equals('true').limit(amount));
    }

    update(queryObj, updateObj) {
        return from(Question.updateOne(queryObj, updateObj));
    }

    delete(queryObj) {}
}

module.exports = QuestionService;