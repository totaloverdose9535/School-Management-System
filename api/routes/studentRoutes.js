const express = require("express");
const { SaveStudent, GetStudents, DeleteStudent, GetStudent, UpdateStudent } = require("../controller/studentController");



let studentRouter = express.Router();

studentRouter.post("/SaveStudent", SaveStudent)
studentRouter.get("/GetStudents", GetStudents)
studentRouter.delete("/DeleteStudent/:id", DeleteStudent)
studentRouter.get("/GetStudent/:id", GetStudent)
studentRouter.put("/UpdateStudent/:id", UpdateStudent)

module.exports = studentRouter;