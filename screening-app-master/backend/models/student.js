const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    student_id: String,
    entry: String,
    date_of_birth: Date,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    invitation: {
        token: String,
        status: String,
        valid: Boolean
    },
    exam: {
        report: {
            date: Date,
            qandas: [{
                question: String,
                answer: String,
                snapshots: []
            }],
            timespent: String
        },
        result: Boolean,
        published: Boolean
    }
});

// studentSchema.index({student_id: 1, name: 1});
//{type: String, index: true, unique: true},
//, { _id : false }

module.exports = mongoose.model('Student', studentSchema);