// db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { user_name, first_name, last_name, email, password } = req.body;
    if (!email || !password || !first_name || !last_name || !user_name) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please provide all required information!" })
    }

        try {
            const [user] = await dbConnection.query("select user_name,user_id from usertable where user_name = ? or email =?", [user_name, email])
            if (user.length > 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "user already existed" })
            }

            if (password.length < 8) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "password must be at least 8 characters" })
            }
            // encrypt the password
            const salt = await bcrypt.genSalt(10)

            const hashedPassword = await bcrypt.hash(password, salt)


            await dbConnection.query("INSERT INTO usertable (user_name, first_name, last_name, email, password) VALUES (?,?,?,?,?)", [user_name, first_name, last_name, email, hashedPassword])
            return res.status(StatusCodes.CREATED).json({ msg: "User registered" })

        } catch (error) {
            console.error("Error during registration:", error.message); // Log the error message
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, try again later!" });
        }
}
//-------login controller---------//
    async function login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please enter all required fields" });
        }

        try {
            const [user] = await dbConnection.query("select user_name,user_id,password from usertable where email = ? ", [email])
            // return res.json({ user: user })   // To return query result
            if (user.length == 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credential" });
            }
            // else {
            //     res.json("user existed")
            // }
            // compare password
            const isMatch = await bcrypt.compare(password, user[0].password);
            //compare password
            if (!isMatch) {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credential" });
            }
            // return res.json({ user: user[0].password })
            const user_name = user[0].user_name;
            const user_id = user[0].user_id;
            const token = jwt.sign({ user_name, user_id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            return res.status(StatusCodes.OK).json({ msg: "user login successful", token,user_name })

        } catch (error) {
            console.log(error.message)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong, try again later!" })
        }
    }

    async function checkUser(req, res) {
        // res.send("check use")
        const user_name = req.user.user_name;
        const user_id = req.user.user_id;
        res.status(StatusCodes.OK).json({ msg: "valid user", user_name, user_id })
    }

module.exports = { register, login, checkUser }
