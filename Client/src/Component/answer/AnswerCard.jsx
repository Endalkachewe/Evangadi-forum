import React, { useContext, useEffect, useState } from 'react'
import style from "./answer.module.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import axios from '../../API/axiosConfig'
import {appState} from '../../App'



function AnswerCard({ data }) {
  const {user} = useContext(appState)
  const [likeCount, setLikeCount] = useState(0)
  const [dislikeCount, setDislikeCount] = useState(0)
  const [activeBtn, setActiveBtn] = useState('none')
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

console.log(user);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const res = await axios.get(`/answer/${data.answer_id}/react`);
        console.log(res);
        setLikeCount(res.data.likeCount);
        setDislikeCount(res.data.dislikeCount);
        setActiveBtn(res.data.userReaction); 
      } catch (error) {
        console.error("Failed to fetch reactions:", error);
        console.log(error.response.data);
      }
    };

    fetchReactions();
  }, [data.answer_id]);




  const handleReactionClick = async (reaction) => {
    
      try {
        
        await axios.post(`/answer/${data.answer_id}/react`, {
          reaction_type: reaction,
          user_id: user.userid
        });


        // if (activeBtn === "none") {
        //   if (reaction === "like") {
        //     setLikeCount(likeCount + 1);
        //     setActiveBtn("like");
        //   } else if (reaction === "dislike") {
        //     setDislikeCount(dislikeCount + 1);
        //     setActiveBtn("dislike");
        //   }
        // } else if (activeBtn === reaction) {
        //   if (reaction === "like") {
        //     setLikeCount(likeCount - 1);
        //   } else if (reaction === "dislike") {
        //     setDislikeCount(dislikeCount - 1);
        //   }
        //   setActiveBtn("none");
        // } else if (activeBtn !== reaction) {
        //   if (reaction === "like") {
        //     setLikeCount(likeCount + 1);
        //     setDislikeCount(dislikeCount - 1);
        //     setActiveBtn("like");
        //   } else if (reaction === "dislike") {
        //     setDislikeCount(dislikeCount + 1);
        //     setLikeCount(likeCount - 1);
        //     setActiveBtn("dislike");
        //   }
        // }

        if (activeBtn === "none") {
          reaction === "like"
            ? setLikeCount(likeCount + 1)
            : setDislikeCount(dislikeCount + 1);
          setActiveBtn(reaction);
        } else if (activeBtn === reaction) {
          reaction === "like"
            ? setLikeCount(likeCount - 1)
            : setDislikeCount(dislikeCount - 1);
          setActiveBtn("none");
        } else {
          reaction === "like"
            ? (setLikeCount(likeCount + 1), setDislikeCount(dislikeCount - 1))
            : (setDislikeCount(dislikeCount + 1), setLikeCount(likeCount - 1));
          setActiveBtn(reaction);
        }

      } catch (error) {
        console.error("Reaction error:", error);
      }

   
  }
  
  const getComment = async () => {
    try {
      const res = await axios.get(`/answer/${data.answer_id}/comment`);
      console.log("Fetched comments:", res.data);
      setComments(res.data); 
      setShowComments(!showComments);
    } catch (err) {
      console.error("Error fetching comments:", err.message);
    }
  };
  const toggleComments = async () => {
    if (!showComments) {
      await getComment();
    }
    setShowComments(!showComments);
  };

  
  const postComment = async () => {
    
    try {
      await axios.post(`/answer/${data.answer_id}/comment`, {
        content: newComment,
        user_id: user.userid,
      });
      setNewComment(""); 
      getComment(); 
    } catch (err) {
      console.error(" Error posting comment:", err.message);
    }
  };

  return (
    <div className={style.main_card_container}>
      <div className={style.card_container}>
        <div className={style.title_info}>
          <div className={style.personal_info}>
            <div>
              <IoPersonCircleSharp size={100} />
            </div>
            <div>{data.user_name}</div>
          </div>

          <div>
            <p>{data.content}</p>
          </div>
        </div>
      </div>
      <div className={style.reaction_wrapper}>
        <div className={style.reaction}>
          <button
            className={` ${activeBtn === "like" ? style["like-active"] : ""}`}
            onClick={() => handleReactionClick("like")}
          >
            <div>
              <AiOutlineLike size={24} />
            </div>
            <div>{likeCount}</div>
          </button>

          <button
            className={` ${
              activeBtn === "dislike" ? style["dislike-active"] : ""
            }`}
            onClick={() => handleReactionClick("dislike")}
          >
            <div>
              <AiOutlineDislike size={24} />
            </div>
            <div>{dislikeCount}</div>
          </button>

          <button onClick={toggleComments}>
            <div>
              <GoComment size={24} />
            </div>
            <div>
              <div>{comments.length > 0 ? comments.length : ""}</div>
            </div>
          </button>

          {showComments && (
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{ width: "80%", marginRight: "5px" }}
                />
                <button onClick={postComment}>Post</button>
              </div>

              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.comment_id} style={{ padding: "5px 0" }}>
                    <strong>{comment.user_name}</strong>: {comment.content}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerCard