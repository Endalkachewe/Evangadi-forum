require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = 5500


app.use(cors());
//db connection
const dbConnection=require("./db/dbConfig")

//user route middleware file
const userRoutes = require("./routes/userRoute");

//question route middleware file
const questionRoutes = require("./routes/questionRoute");
const authMiddleware = require('./middleware/authMiddleware');

//json middeleware to extract json data

app.use(express.json());

//user routes middleware 
app.use("/api/users", userRoutes)

//question routes middleware ??
app.use("/api/questions",authMiddleware, questionRoutes)

//answer user routes middleware ??

async function start() {
    try {
        const result = await dbConnection.execute("select 'test' ")
        await app.listen(port)
        console.log("Database connection established");
        console.log(`listining on ${port}`);
    } catch (error) {
        console.log(error.message)
    }
}
start()


// app.listen(port, (err) => {
//     if (err) {
//         console.log(err.message);
//     }
//     else {
//         console.log(`listening on ${port}`);
//     }
// })