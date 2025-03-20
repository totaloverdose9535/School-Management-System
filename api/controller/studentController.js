const Student = require("../models/studentModel")
const Class = require("../models/classModel")

let SaveStudent = async (req, res) => {
    try {
        //get the class
        const className = req.body.class;

        //if the class exists create the new student
        const findClass = await Class.findOne({ name: className });

        if (!findClass) {
            return res.status(404).json({ message: 'Class not found' });
        }


        if (findClass.currentCapacity >= findClass.maxCapacity) {
            return res.json({ status: false, message: 'Class is full. Cannot add more students.' });
        }

        const newStudent = await Student.create({
            ...req.body,
            class: findClass._id
        })

        //push the newly created student into class
        findClass.students.push(newStudent._id);
        findClass.currentCapacity++;
        await findClass.save();

        res.send({ status: true, message: "Student Added Successfully", newStudent })


    } catch (error) {
        console.log(error)
    }
}


//Get details of all students 
let GetStudents = async (req, res) => {
    let Students = await Student.find();
    res.send({ status: true, studentList: Students })
}


//Delete Student
let DeleteStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);

    // Delete the student
    await Student.findByIdAndDelete(req.params.id);

    // Remove the student's ID from the class
    const findClass = await Class.findOne(
        { students: req.params.id },
    );
    if (findClass) {
        findClass.students.pull(student._id);
        findClass.currentCapacity--;
        await findClass.save();
    }
    else {
        await Student.findByIdAndDelete(req.params.id);
    }

    res.send({ status: true, message: "Student Deleted Successfully" })
}



//Get single student data
let GetStudent = async (req, res) => {
    let StudentId = req.params.id;
    let singleStudent = await Student.findOne({ _id: StudentId })
    res.send({ status: true, singleStudent })
}


//Edit single student data
let UpdateStudent = async (req, res) => {
    let StudentId = req.params.id;
    let UpdatedStudent = await Student.updateOne(
        { _id: StudentId },
        req.body)
    return res.json(UpdatedStudent)
}

module.exports = { SaveStudent, GetStudents, DeleteStudent, GetStudent, UpdateStudent }