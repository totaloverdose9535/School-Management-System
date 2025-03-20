let mongoose = require("mongoose")

let Schema = mongoose.Schema;

let studentSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true, },
    feesPaid: { type: Number, required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    role: { type: String, default: "Student" }
},
    { timestamps: true });


const studentModel = mongoose.model('Student', studentSchema);


module.exports = studentModel;