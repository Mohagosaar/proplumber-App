import { useState } from "react";
import { useCookies } from "react-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Modul = ({ mode, setShowModal, getTodos, task }) => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 30,
    dateCreated: editMode ? new Date(task.dateCreated) : new Date(),
    dueDate: editMode ? new Date(task.dueDate) : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4008/todos`, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response) {
        getTodos();
        setShowModal(false);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  //Edit

  const editTodos = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4008/todos/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        getTodos();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //Delete

  const handleForm = (event) => {
    const { name, value } = event.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(data);
  };
  return (
    <div className="overley">
      <div className="modul">
        <div className="from-groups">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={50}
            placeholder=" Add your Task"
            name="title"
            value={data.title}
            onChange={handleForm}
          />
          {/* <label for=" range"> Select your current progress</label>
          <input
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleForm}
          /> */}

          <label htmlFor="dateCreated">Date Created</label>
          <DatePicker
            selected={data.dateCreated}
            onChange={(date) =>
              setData((prevData) => ({ ...prevData, dateCreated: date }))
            }
            name="dateCreated"
          />
          <label htmlFor="dueDate">Due Date</label>
          <DatePicker
            selected={data.dueDate}
            onChange={(date) =>
              setData((prevData) => ({ ...prevData, dueDate: date }))
            }
            name="dueDate"
          />

          <input
            type="submit"
            id="submit"
            className={mode}
            onClick={editMode ? editTodos : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modul;
