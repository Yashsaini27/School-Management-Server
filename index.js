import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
//import { StaffRouter } from "./Routes/StaffRegisRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { staffRouter } from "./Routes/StaffRegisRoute.js";
 import { QueryRouter } from "./Routes/QueryRoute.js";
import { attendanceRouter } from "./Routes/AttendanceRoute.js";
import { parentRouter } from "./Routes/ParentRoute.js";
import { StudentRouter } from "./Routes/StudentRoute.js";
import { stafRouter } from "./Routes/StaffQueryRoute.js";
import { institutionRoute } from "./Routes/InstitutionRoute.js";

const app = express() 
app.use(cors({
    origin: ["http://localhost:5173","https://sms-yash.netlify.app"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/staff', staffRouter)
app.use('/querry',QueryRouter)
app.use('/atten',attendanceRouter)
app.use('/pare',parentRouter)
app.use('/stud',StudentRouter)
app.use('/staff1',stafRouter)
app.use('/home',institutionRoute)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )

app.listen(3000, () => {
    console.log("Server is running")
})
