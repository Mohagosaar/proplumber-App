import TickIcons from "../TickIcons/TickIcons";
import ProgressBar from "../ProgressBar/ProgessBar";
import { FcTodoList } from "react-icons/fc";

const ListItems = ({ task }) => {
  return (
    <div className="list-items">
      <div className="info-container">
        <TickIcons />
        <FcTodoList className="tick" />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>
      <div className="btn-container">
        <button className="btn-edit">Edit Task</button>
        <button className="btn-delete">Delete Task</button>
      </div>
    </div>
  );
};

export default ListItems;
