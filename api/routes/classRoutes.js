const express = require("express");
const { CreateClass, GetClasses, DeleteClass, GetClass, UpdateClass, GetclassDetails } = require("../controller/classController");



let classRouter = express.Router()

classRouter.post("/Create_class", CreateClass)
classRouter.get("/GetClass", GetClasses)
classRouter.delete("/DeleteClass/:id", DeleteClass)
classRouter.get("/GetClass/:id", GetClass)
classRouter.put("/UpdateClass/:id", UpdateClass)
classRouter.get("/GetclassDetails/:id", GetclassDetails)

module.exports = classRouter;