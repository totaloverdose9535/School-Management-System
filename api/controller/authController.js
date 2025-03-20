require("dotenv").config()
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../healpers/auth");
const Admin = require("../models/adminModel")



// Register User
let Signup = async (req, res) => {
    try {
        let { name, email, mobile_no, password } = req.body;

        // check if user gives all data
        if (!name || !email || !mobile_no || !password) {
            return res.json({
                error: "Please Fill The Full Form"
            });
        };


        // check if password is good
        const passNumber = 7
        if (password < passNumber) {
            return res.json({
                error: "Password should be at least 7 characters long."
            })
        };


        //check email
        const exist = await Admin.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email already exists."
            })
        };

        // create user in database
        const hashedPassword = await hashPassword(password)
        const Newadmin = await Admin.create({
            name,
            email,
            mobile_no,
            password: hashedPassword
        });

        return res.json(Newadmin)
    } catch (error) {
        console.log(error)
    }
};




// Login User
const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const Newadmin = await Admin.findOne({ email });
        if (!Newadmin) {
            return res.json({
                error: "No user found"
            })
        }

        // check if password is given 
        if (!password) {
            return res.json({
                error: "Password is required."
            })
        };


        //  check if passwords match
        const match = await comparePassword(password, Newadmin.password)
        if (match) {
            const token = jwt.sign({ id: Newadmin._id, email: Newadmin.email, username: Newadmin.name }, process.env.JWT_SECRET, { expiresIn: '1hr' })
            return res.status(200).json({ status: true, message: "Login Successfull", token: token })
        }
        if (!match) {
            res.json({
                error: "Password does not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
};

// get Admin

const getAdmin = (req, res) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ status: false, message: "Access Denied" })
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            const Newadmin = await Admin.findById(decode?.id)
            if (!Newadmin) return res.status(400).json({ status: false, message: "Invalid Token" })
            const userData = {
                id: Newadmin?.id,
                name: Newadmin?.name,
                email: Newadmin?.email,
                mobile_no: Newadmin?.mobile_no
            }
            return res.status(200).json({ status: true, message: "Profile data", data: userData })
        })

    } catch (error) {
        return res.status(400).json({ status: false, message: "Something Whent Wrond", error: error.message })
    }
}


const updateAdmin = async (req, res) => {
    let adminId = req.params.id;
    let { name, email, mobile_no, password } = req.body;
    const hashedPassword = await hashPassword(password)
    let updateObj = {
        name,
        email,
        mobile_no,
        password: hashedPassword
    };
    let updatedAdmin = Admin.updateOne({ _id: adminId }, updateObj)

    return res.send(200).json({ status: true, message: "Admin Details Updated Successfully", updateAdmin })
}



module.exports = { Signup, Signin, getAdmin, updateAdmin };
