import { useState } from "react";
import TickIcons from "../TickIcons/TickIcons";
import ProgressBar from "../ProgressBar/ProgessBar";
import Modul from "../Modules/Modal";
import { FcTodoList } from "react-icons/fc";

const ListItems = ({ task, getTodos }) => {
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const deleteTodos = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4008/todos/${task.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getTodos();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to format date to display in "day, month, year" format
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`list-items ${isChecked ? "checked" : ""}`}>
      <div className="info-container">
        <TickIcons />
        <FcTodoList className="tick" />
        <p className="task-title">{task.title}</p>
        <p className="task-date">{formatDate(task.dateCreated)}</p>
        <p className="task-duedate">{formatDate(task.dueDate)}</p>
      </div>
      <div className="btn-container">
        <input
          type="checkbox"
          className="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit Task
        </button>
        <button className="btn-delete" onClick={deleteTodos}>
          Delete Task
        </button>
        {showModal && (
          <Modul
            mode={"edit"}
            setShowModal={setShowModal}
            task={task}
            getTodos={getTodos}
          />
        )}
      </div>
    </div>
  );
};

export default ListItems;
