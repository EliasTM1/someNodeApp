const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// * Creating the schema
const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true }
});

// * Hash password before saving to the DB
studentSchema.pre('save', async function (next) {
    const student = this;
    if (!student.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt();

        const hash = await bcrypt.hash(student.password, salt);

        student.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

// * Compile our schema into a model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
