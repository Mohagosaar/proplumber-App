import { useState, useEffect } from "react";
import axios from "axios";
import EditTodos from "./EditTodos";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //empty array
  const [showEdit, setShowEdit] = useState(false);
  const [editTodos, seteditTodos] = useState({
    current_ID: "",
    current_Description: "",
  });

  console.log(allTodos);

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`/api/dashboard/todosDelete/${id}`, {
        headers: { token: localStorage.token },
      });
      const deleteTodos = await response.data;

      if (deleteTodos) {
        setTodosChange(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const EditTask = (id, description) => {
    // console.log("This is the ID", id + "This is the description", description);
    seteditTodos({
      current_ID: id,
      current_Description: description,
    });
    setShowEdit(true);
  };

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="d-flex justify-content-center">
        <table className="table mt-5" style={{ width: "800px" }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.length !== 0 &&
              todos[0].todo_id !== null &&
              todos.map((todo) => (
                <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => EditTask(todo.todo_id, todo.description)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(todo.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {showEdit && (
          <EditTodos
            allTodos={allTodos}
            setTodosChange={setTodosChange}
            setShowEdit={setShowEdit}
            editTodos={editTodos}
            mode={"Edit"}
          />
        )}
      </div>
    </div>
  );
};
export default ListTodos;
