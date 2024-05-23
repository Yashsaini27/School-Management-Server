import mysql from 'mysql'

const con = mysql.createConnection({
     host: "sql12.freesqldatabase.com",
    user: "sql12708546",
    password: "PLQmN4JMTE",
    database: "sql12708546"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;
