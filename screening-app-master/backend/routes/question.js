const express = require('express');

const QuestionService = require('../services/question');

const questionRouter = express.Router();

const questionService = new QuestionService();
const StudentService = require('../services/student');
const studentService = new StudentService();
const tokenLib = require('../libs/token');

questionRouter.get('/', function (req, res, next) {
  if (req.query.studentId) {
    studentService.getOne({
      _id: req.query.studentId
    }).subscribe(
      (student) => {
        if (student.invitation.valid) {
          const token = student.invitation != null ? student.invitation.token : '';
          // console.log(student.invitation.token);
          tokenLib.verifyToken(token)
            .then(() => {
              questionService.getExamQuestions(3).subscribe(
                (questions) => {
                  console.log(questions);
                  res.status(200).json(questions);
                },
                (err) => next(err),
                null
              );
            })
            .catch((err) => next(err));
        } else {
          return next('You already took the exam.');
        }
      },
      (err) => next(err),
      null
    );
  } else {
    questionService.get({}).subscribe(
      (questions) => res.status(200).json(questions),
      (err) => next(err),
      null
    );
  }

});

questionRouter.post('/', function (req, res, next) {
  questionService.add(req.body)
    .then(() => res.status(200).json({
      success: true
    }))
    .catch((err) => next(err));
});

questionRouter.patch('/', (req, res, next) => {
  questionService.update({
    _id: req.body.question._id
  }, {
    '$set': {
      active: req.body.status
    }
  }).subscribe(
    () => res.status(200).json({
      success: true
    }),
    (err) => next(err),
    null
  );
});



module.exports = questionRouter;