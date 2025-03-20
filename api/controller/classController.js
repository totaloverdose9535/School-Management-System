const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Teacher = require("../models/teacherModel");

//Create new class
let CreateClass = async (req, res) => {
    try {
        if (!req.body) {
            return res.json({
                error: "Please Fill All credentials"
            })
        } else {
            let newClass = await Class.create(req.body);
            return res.json(newClass)
        }
    } catch (error) {
        console.log(error)
    }
}

//Get all classes
let GetClasses = async (req, res) => {
    let classes = await Class.find();
    res.send({ status: true, classList: classes })
}


//Delete the class
let DeleteClass = async (req, res) => {

    //search all students and teachers associated with that class
    const removeClassFromstudent = await Student.find({ class: req.params.id });
    const removeClassFromteacher = await Teacher.find({ assignedClass: req.params.id });


    //set the class id to null which is associated to the students of that class
    await Promise.all(removeClassFromstudent.map(async (student) => {
        student.class = null;
        await student.save();
    }));

    //set the class id to null which is associated to the teachers of that class
    await Promise.all(removeClassFromteacher.map(async (teacher) => {
        teacher.assignedClass = null;
        await teacher.save();
    }));


    let ClassId = req.params.id;
    let delclass = await Class.deleteOne({ _id: ClassId });
    res.send({ status: true, message: "Class Deleted Successfully", delclass })
}


//Get single class data
let GetClass = async (req, res) => {
    let ClassId = req.params.id;
    let singleClass = await Class.findOne({ _id: ClassId })
    res.send({ status: true, singleClass })
}

//Edit single class data
let UpdateClass = async (req, res) => {
    let ClassId = req.params.id;
    let UpdatedClass = await Class.updateOne(
        { _id: ClassId },
        req.body)
    return res.json(UpdatedClass)
}

//Get details of the class by populating it with students and teachers
let GetclassDetails = async (req, res) => {
    let ClassId = req.params.id;
    let classDetails = await Class.findById({ _id: ClassId }).populate('students').populate('teacher');
    res.send({ status: true, classDetails })
}


module.exports = { CreateClass, GetClasses, DeleteClass, GetClass, UpdateClass, GetclassDetails }