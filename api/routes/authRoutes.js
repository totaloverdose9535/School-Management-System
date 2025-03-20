let express = require("express");
const { Signup, Signin, getAdmin, updateAdmin } = require("../controller/authController");


let authRouter = express.Router();

authRouter.post("/Signup", Signup)
authRouter.post("/Signin", Signin)
authRouter.post("/adminProfile", getAdmin)
authRouter.put("/updateAdmin/:id", updateAdmin)

module.exports = authRouter; 
