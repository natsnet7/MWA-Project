const jsonwebtoken = require('jsonwebtoken');

const tokenKey = process.env.JWT_SECRET_KEY;

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, tokenKey, function (err, user) {
            if (err) {
                reject(err)
            } else {
                resolve(user);
            }
        });
    });
}

function createToken(user) {
    let user_data = {
        username: user.username,
        name: user.name,
        password: user.password,
        is_admin: user.is_admin,
        active: user.active
    }
    var token = jsonwebtoken.sign(user_data, tokenKey, {
        expiresIn: 86400 // expires in 24 hours
    });
    return token;
}

function createStudentToken(student) {
    let student_data = {
        student_id: student.student_id,
        name: student.name,
        entry: student.entry,
        date_of_birth: student.date_of_birth,
        email: student.email
    }
    var token = jsonwebtoken.sign(student_data, tokenKey, {
        expiresIn: 86400 // expires in 24 hours
    });
    return token;
}

module.exports = {
    verifyToken: verifyToken,
    createToken: createToken,
    createStudentToken: createStudentToken
};