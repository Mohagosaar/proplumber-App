import axios from "axios";
import { useState, useEffect } from "react";
import InputTodos from "./InputTodos";
import ListTodos from "./ListTodos";
import EditTodos from "./EditTodos";
import LandingPage from "./LandingPage";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getUsername = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        throw new Error("No token available"); // Handle case where token is not available
      }
      const response = await axios.get("/api/dashboard", {
        // headers: { Authorization: `Bearer ${token}` },
        headers: { token: localStorage.token },
      });
      const parseTodos = await response.data;

      console.log("Data response:", response.data[0].username);
      setName(response.data[0].username);
      setAllTodos(parseTodos); // Assuming username is in the response data
    } catch (error) {
      console.error("Error fetching username:", error.message);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  useEffect(() => {
    getUsername();
    setTodosChange(false);
  }, [todosChange]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    <Navigate to="/Landinpage" />;
  };
  return (
    <div>
      <div className=" d-flex mt-5 justify-content-around">
        <h5>
          <span style={{ color: "green" }}> {name} </span> 's Todo List
        </h5>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
      {/* {allTodos.map((todos) => (
        <ListTodos key={todos.todo_id} todos={todos} />
      ))} */}
      <InputTodos setTodosChange={setTodosChange} />
      <ListTodos allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};
export default Dashboard;
