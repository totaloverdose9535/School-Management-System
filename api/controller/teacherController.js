const Teacher = require("../models/teacherModel")
const Class = require("../models/classModel")

//Add new tacher
let SaveTeacher = async (req, res) => {
    try {
        //get the assigned class to the teacher
        const className = req.body.assignedClass;

        //if the class exists create a new teacehr
        const foundClass = await Class.findOne({ name: className });
        if (!foundClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        const newTeacher = await Teacher.create({
            ...req.body,
            assignedClass: foundClass
        });

        // Update the class with the newly created teacher
        foundClass.teacher.push(newTeacher._id);
        await foundClass.save();

        res.status(200).json(newTeacher);
    } catch (error) {
        console.log(error)
    }
}


// Get details of all teachers
let GetTeachers = async (req, res) => {
    let Teachers = await Teacher.find();
    res.send({ status: true, teacherList: Teachers })
}


//Delete teacher
let DeleteTeacher = async (req, res) => {
    const teacherid = await Teacher.findById(req.params.id);

    // Delete the teacher
    await Teacher.findByIdAndDelete(req.params.id);

    // Remove the teacher's ID from the class
    const findClass = await Class.findOne(
        { teacher: req.params.id },
    );
    if (findClass) {
        findClass.teacher.pull(teacherid._id);
        await findClass.save();
    }
    //if no class is fund delete the teacher without the class
    else {
        await Teacher.findByIdAndDelete(req.params.id);
    }


    res.send({ status: true, message: "Teacher Deleted Successfully" })
}



//Get single teacher data
let GetTeacher = async (req, res) => {
    let TeacherId = req.params.id;
    let singleTeacher = await Teacher.findOne({ _id: TeacherId })
    res.send({ status: true, singleTeacher })
}


//Edit single teacher data
let UpdateTeacher = async (req, res) => {
    let TeacherId = req.params.id;
    let UpdatedTeacher = await Teacher.updateOne(
        { _id: TeacherId },
        req.body)
    return res.json(UpdatedTeacher)
}

module.exports = { SaveTeacher, GetTeachers, DeleteTeacher, GetTeacher, UpdateTeacher } 