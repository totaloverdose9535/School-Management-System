let mongoose = require("mongoose")

let Schema = mongoose.Schema;

let classSchema = new Schema({
    name: { type: String, require: true, unique: true },
    year: { type: Number, require: true },
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    currentCapacity: { type: Number, default: 0 },
    maxCapacity: { type: Number, require: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
},
    { timestamps: true }
);



const classModel = mongoose.model('Class', classSchema);


module.exports = classModel;