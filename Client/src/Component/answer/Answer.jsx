import React, { useEffect, useState } from 'react'
import axios from '../../API/axiosConfig';
import style from './answer.module.css'
import AnswerCard from './AnswerCard';
import { useParams } from 'react-router-dom';

function Answer() {
  const [answers, setAnswers] = useState([]);
  const { question_id } = useParams();
  useEffect(() => {
    const getAnswers = async () => {
      try {
        await axios
          .get(`/question/${question_id}/answer`)
          .then((res) => {
            setAnswers(res.data);
            console.log(res);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error, "Something wrong, try again");
      }
    };
    getAnswers();
  }, [question_id]);

  return (
    <section className={style.main_container}>
      {answers?.map((answer, index) => (
        <div key={index}>
          <AnswerCard data={answer} />
        </div>
      ))}
    </section>
  );
}

export default Answer