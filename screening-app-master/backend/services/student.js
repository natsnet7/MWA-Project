const {
    from
} = require('rxjs');
const nodemailer = require('nodemailer');
let Student = require('../models/student');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMISSION_OFFICE_EMAIL_ADDRESS,
        pass: process.env.ADMISSION_OFFICE_EMAIL_PASSWORD
    }
});

const FE_BASE_API_URL = 'http://localhost:4200';

class StudentService {
    constructor() {

    }

    add(studentObj) {
        let newStudent = new Student(studentObj);
        return newStudent.save();

    }

    get(queryObj) {
        return from(Student.find(queryObj));
    }

    getOne(queryObj) {
        return from(Student.findOne(queryObj));
    }

    update(queryObj, updateObj) {
        return from(Student.updateOne(queryObj, updateObj));
    }

    delete(queryObj) {}

    sendEmail(toEmailAddress, studentId) {
        const examLink = FE_BASE_API_URL + '/student/' + studentId;
        // console.log(examLink);
        const mailOptions = {
            from: process.env.ADMISSION_OFFICE_EMAIL_ADDRESS,
            to: toEmailAddress,
            subject: 'Invitation to Programming Test',
            html: '<h1>Welcome to Programming Test</h1><div><p>Click <a href="' + examLink + '">here</a> to take the exam.</p></div>'
        };

        return transporter.sendMail(mailOptions);
    }
}

module.exports = StudentService;