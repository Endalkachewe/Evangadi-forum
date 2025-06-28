import React, { useEffect, useState } from 'react'
import axios from '../../API/axiosConfig'
import QuestionCard from './QuestionCard'
import style from './question.module.css'

function Question() {
  const [questions, setQuestions] = useState([])
  const [search, setSearch] = useState(""); 
  useEffect(() => {
    const getQuestions = async () => {
      try {
        await axios
          .get("/question")
          .then((res) => {
            setQuestions(res.data);
            console.log(res);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error, "Something wrong, try again");
        
      }
    }
    getQuestions();
  }, [])

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className={style.main_container}>
      <div className={style.search_container}>
        <input
          type="text"
          placeholder="Search by title or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.search_input}
        />
      </div>

      {filteredQuestions.map((question, index) => (
        <div key={index}>
          <QuestionCard data={question} />
        </div>
      ))}
    </section>
  );
}

export default Question