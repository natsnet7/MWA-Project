const express = require('express');

const tokenLib = require('../libs/token');
const StudentService = require('../services/student');

const studentRouter = express.Router();

const studentService = new StudentService();

studentRouter.get('/', function (req, res, next) {
  const queryObj = req.query.published == null ? {} : {
    "published": req.query.published
  };
  studentService.get(queryObj).subscribe(
    (students) => res.status(200).json(students),
    (err) => next(err),
    null
  );

});

studentRouter.get('/:id', (req, res, next) => {
  studentService.get({
    _id: req.params.id
  }).subscribe(
    (students) => res.status(200).json(students),
    (err) => next(err),
    null
  );
});

studentRouter.post('/', function (req, res, next) {
  studentService.add(req.body)
    .then(() => res.status(200).json({
      success: true
    }))
    .catch((err) => next(err));
});

studentRouter.patch('/:id', (req, res, next) => {
  if (req.query.invite) {
    invitationObj = {
      token: tokenLib.createStudentToken(req.body),
      status: "sent",
      valid: true
    }
    console.log(req.body.email);
    studentService.sendEmail(req.body.email, req.body._id)
      .then(
        studentService.update({
          _id: req.params.id
        }, {
          '$set': {
            invitation: invitationObj
          }
        }).subscribe(
          () => res.status(200).json({
            success: true
          }),
          (err) => next(err),
          null
        ))
      .catch((err) => next(err));

  } else if (req.query.exam) {
    studentService.update({
      _id: req.params.id
    }, {
      '$set': {
        exam: req.body,
        'invitation.status': 'answered',
        'invitation.valid': false
      }
    }).subscribe(
      () => res.status(200).json({
        success: true
      }),
      (err) => next(err),
      null
    );
  }
});

studentRouter.delete('/:id', (req, res, next) => {

});

module.exports = studentRouter;