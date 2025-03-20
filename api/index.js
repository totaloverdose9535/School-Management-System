require("dotenv").config()

let express = require("express");
let mongoose = require("mongoose");
let cookiparser = require("cookie-parser");
let cors = require("cors");
let path = require("path");
const authRouter = require("./routes/authRoutes");
const classRouter = require("./routes/classRoutes");
const studentRouter = require("./routes/studentRoutes");
const teacherRouter = require("./routes/teacherRoutes");

const port = process.env.PORT || 4000;
const _dirname = path.resolve();


let app = express();
 
//cors to connect frontend to backend
app.use(cors({
    credentials: true,
    origin: 'https://school-management-system-vm3h.onrender.com'
})
);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiparser());


//routers
app.use("/api/auth", authRouter)
app.use("/api/class", classRouter)
app.use("/api/student", studentRouter)
app.use("/api/teacher", teacherRouter)


app.use(express.static(path.join(_dirname, "/client/dist")))
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
})

//Connect to mongoDb
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected To MongoDb");
    app.listen(port, () => {
        console.log("Server Is Running");
    });
}).catch((err) => {
    console.log(err)
});
