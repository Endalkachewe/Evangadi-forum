//import db-connection
const dbConnection = require("../db/dbConfig.js");
const { StatusCodes } = require("http-status-codes"); // status code

//ask title controller
async function askQuestion(req, res) {
  //get user_id and user_name from req.user
  const { user_name, user_id } = req.user;
  //get title and content from req.body
  const { title, content } = req.body;

  //check if title and content is empty
  if (!title || !content) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide full information" });
  }
  //insert title into title table
  try {
    await dbConnection.query(
      "INSERT INTO questiontable(user_id,title,content,created_at) VALUES (?,?,?,?)",
      [user_id, title, content,created_at]
    );
    //send success message
    return res
      .status(StatusCodes.OK)
      .json({ success: "Ask title successful.", user_name });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong on the server." });
  }
}

//get all-titles controller
async function getAllQuestions(req, res) {
  //get all titles from title table
  try {
    const query =
      "SELECT questiontable.*, usertable.user_name, usertable.user_id FROM questiontable INNER JOIN usertable ON title.user_id = usertable.user_id ORDER BY questiontable.title DESC";
    const [results] = await dbConnection.query(query);
    // Process the results here, as a JSON response
    return res.status(StatusCodes.OK).json(results);
  } catch (error) {
    // Handle any errors 
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
}

//title detail controller
async function questionDetail(req, res) {

  try {
     //get question_id from req.query
    const { question_id } = req.query;
    //get title details from title table
    const query =
      "SELECT question_id,title, content FROM questiontable WHERE question_id = ?";
    const [results] = await dbConnection.query(query, [question_id]);

    // Check if there are any results
    if (results.length > 0) {
      return res.status(StatusCodes.OK).json(results); 
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "title not found" });
    }
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
}
//export controllers
module.exports = { askQuestion, getAllQuestions, questionDetail };
