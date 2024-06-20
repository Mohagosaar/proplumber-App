import axios from "axios";
import "./EditTodos.css";
import { useState } from "react";

const EditTodos = ({ todo, mode, setTodosChange, setShowEdit, editTodos }) => {
  const { current_ID, current_Description } = editTodos;
  const [description, setDescription] = useState(current_Description);
  const [error, setError] = useState("");
  const handleForm = async (e) => {
    e.preventDefault();
    if (description.trim() === "") {
      return setError(" * Task description cannot be empty");
    }
    const response = await axios.put(
      `/api/dashboard/todos/${current_ID}`,
      {
        description,
      },
      {
        headers: { token: localStorage.token },
      }
    );
    const updateTodos = await response.data;
    setTodosChange(true);
    setShowEdit(false);
  };

  return (
    <div className="overley">
      <div className="modul">
        <div className="from-groups">
          <h4>{mode} your task</h4>
          <button onClick={() => setShowEdit(false)}>X</button>
        </div>
        <form onSubmit={handleForm}>
          <input
            placeholder=" Add your Task"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // onChange={handleForm}
          />
          <input type="submit" id="submit" />
        </form>
        <p style={{ color: "red", marginLeft: "70px", fontSize: "20px" }}>
          {error}
        </p>
      </div>
    </div>
  );
};

export default EditTodos;
