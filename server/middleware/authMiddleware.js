const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")
async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' })
    }
    const token = authHeader.split(' ')[1]
    console.log(authHeader)
    console.log(token)

    try {
         // return res.status(StatusCodes.OK).json({ data })
        const {user_name,user_id} = jwt.verify(token, process.env.JWT_SECRET)
        req.user={user_name,user_id}
        next()
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication invalid' })
    }
}

module.exports = authMiddleware