let mongoose = require("mongoose")

let Schema = mongoose.Schema

let teacherSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, },
  salary: { type: Number, required: true },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  role: { type: String, default: "Teacher" },
}, { timestamps: true }
);

const teacherModel = mongoose.model('Teacher', teacherSchema);

module.exports = teacherModel