const express = require('express');
const router = express.Router();


const auth = require('../../middleware/auth')

//ansewr controllers
const {answerQuestion,getAnswer} =require ('../../controller/answerController');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/answer-the-question",authMiddleware,answerQuestion) 
router.get("/get-the-answer",authMiddleware,getAnswer)  

module.exports = router;       