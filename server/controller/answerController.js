const dbConnection = require("../db/dbConfig.js");
const { StatusCodes } = require("http-status-codes"); // status code

//ansewr the question
async function answerQuestion(req, res) {
  try {
    const { user_id } = req.user;
    const { question_id, answer } = req.body;

    if (answer.trim() === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide your answer" });
    }

    // Make sure to validate and sanitize the input data as needed

    const query =
      "INSERT INTO answertable (user_id, question_id, content) VALUES (?, ?, ?)";
    await dbConnection.query(query, [user_id, question_id, content]);

    return res.status(201).json({ message: "Answer submitted successfully" });
  } catch (error) {
    // Handle any errors that may occur during the query
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
//get the ansswer
async function getAnswer(req, res) {
  try {
    const { user_id,username } = req.user;
    const { question_id } = req.query ;
    const query = `
      SELECT usertable.*, answertable.*
      FROM usertable
      INNER JOIN answertable ON usertable.user_id = answertable.user_id
      WHERE question_id = ?
      ORDER BY answertable.content DESC;
    `;
    
    const [results] = await dbConnection.query(query, [question_id])

    // Process the results and send them as a JSON response
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { answerQuestion, getAnswer };



