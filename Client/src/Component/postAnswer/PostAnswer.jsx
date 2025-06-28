import React, { useContext, useRef } from 'react'
import style from './Post.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../API/axiosConfig';
import {appState} from '../../App'

function PostAnswer() {
  const { user } = useContext(appState);
  const {question_id} = useParams()
  const navigate = useNavigate()
  const answerDom = useRef();
// console.log(answerDom.current.value);
  async function handleSubmit(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;
    if (!answerValue ) {
      return;
    }
    try {
      await axios.post(`/question/${question_id}/answer`, {
        content: answerValue,
        user_id: user.userid
      });
      alert("Answer Posted successfully");
      navigate("/home");
    } catch (error) {
      alert("server error");
      console.log(error.response);
    }
  }


  return (
    <div className={style.container}>
      <div className={style.title_wrapper}>
        <h1>Answer The Top Question</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea ref={answerDom} name="content" id="content" placeholder="Your Answer..."></textarea>
        <button type='submit'  className={style.link_wrapper}>Post Your Answer</button>
      </form>
    </div>
  );
}

export default PostAnswer