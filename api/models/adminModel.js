let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile_no: { type: Number, required: true },
    password: { type: String, required: true },
},
    { timestamps: true }
);

let adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;