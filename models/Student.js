const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
