import { IoPersonCircleSharp } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import style from './question.module.css'
import { Link } from "react-router-dom";

function QuestionCard({ data }) {
  return (
    <div className={style.card_container}>
      <div className={style.title_info}>
        <div className={style.personal_info}>
          <div>
            <IoPersonCircleSharp size={100} />
          </div>
          <div>{data.user_name}</div>
        </div>
        <div>
          <p>{data.title}</p>
        </div>
      </div>
      <Link to={`/question/${data.question_id}/answer`} className={style.card_link}>
        <GrNext size={40} />
      </Link>
    </div>
  );
}

export default QuestionCard