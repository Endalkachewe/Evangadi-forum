import React, { useContext, useRef } from 'react'
import style from './ask.module.css'
import Layout from '../../Component/layout/Layout'
import axios from '../../API/axiosConfig'
import { useNavigate } from 'react-router-dom'
import {appState} from '../../App'

function AskQuestion() {
  const navigate = useNavigate();
  const { user } = useContext(appState);
  const titleDom = useRef();
  const descriptionDom = useRef()

console.log(user.userid);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;
    if (!titleValue || !descriptionValue) {
      return;
    }
    try {
      await axios.post("/questions", {
        user_id: user.userid,
        title: titleValue,
        content: descriptionValue,
      });
      alert("Answer Posted successfully");
      navigate("/home");
    } catch (error) {
      alert("server error");
      console.log(error.response);
    }
      
  }

  return (
    <Layout>
      <div className={style.main_container}>
        <div className={style.header_container}>
          <h1>Step to write a good question</h1>
          <ul>
            <li>Summarize your problem in a one-line title</li>
            <li>Describe your problem in more detail</li>
            <li>Describe what you tried and what you expected to happen</li>
            <li>Review your question and post it the site</li>
          </ul>
        </div>
        <div>
          <h1>Ask a public question</h1>
          <form onSubmit={handleSubmit}>
            <div className={style.ask_container}>
              <textarea
                className={style.question_title}
                ref={titleDom}
                name="content"
                id="content"
                placeholder="Title"
              />
              <textarea
                className={style.question_detail}
                ref={descriptionDom}
                name="content"
                id="content"
                placeholder="Question Description..."
              />
            </div>
            <button type="submit" className={style.link_wrapper}>
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AskQuestion