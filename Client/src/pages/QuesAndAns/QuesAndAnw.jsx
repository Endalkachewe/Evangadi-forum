import React, { useEffect, useState } from 'react'
import Layout from '../../Component/layout/Layout'
import style from './QA.module.css'
import Answer from '../../Component/answer/Answer';
import axios from '../../API/axiosConfig';
import { useParams } from 'react-router-dom';
import {FadeLoader} from 'react-spinners'
import PostAnswer from '../../Component/postAnswer/PostAnswer';

function QuesAndAnw() {
  const [question, setQuestion] = useState(null)
  const { question_id } = useParams();
  useEffect(() => {
    const getQuestion = async () => {
      try {
        await axios
          .get(`/question/${question_id}`)
          .then((res) => {
            setQuestion(res.data);
            console.log(res);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error, "Something wrong, try again");
      }
    }
    getQuestion();
  }, [question_id])
  return (
    <Layout>
      {question ? (
        <>
          <div className={style.container}>
            <div className={style.question_title}>
              <h1>Question</h1>
              <h2>{question.content}</h2>
              <p>How does it works</p>
            </div>
            <h1>Answer From The Community</h1>
          </div>
          <Answer />
          <PostAnswer/>
        </>
      ) : (
        <div className={style.spinner}>
          <FadeLoader color="lightblue" height={20} />
        </div>
      )}
    </Layout>
  );
}

export default QuesAndAnw