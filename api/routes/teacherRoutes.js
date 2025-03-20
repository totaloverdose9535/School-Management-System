const express = require("express");
const { SaveTeacher, GetTeachers, DeleteTeacher, GetTeacher, UpdateTeacher } = require("../controller/teacherController");



let teacherRouter = express.Router();


teacherRouter.post("/SaveTeacher", SaveTeacher)
teacherRouter.get("/GetTeachers", GetTeachers)
teacherRouter.delete("/DeleteTeacher/:id", DeleteTeacher)
teacherRouter.get("/GetTeacher/:id", GetTeacher)
teacherRouter.put("/UpdateTeacher/:id", UpdateTeacher)

module.exports = teacherRouter;