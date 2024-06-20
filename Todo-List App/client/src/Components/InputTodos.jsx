import { useEffect, useState } from "react";
import axios from "axios";

const InputTodos = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    // const trimmedDescription = description.trim();
    if (description.trim() === "") {
      return setError(" * Task description cannot be empty");
    }
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        throw new Error("No token available");
      }

      const response = await axios.post(
        "/api/dashboard/todos",
        { description },
        {
          headers: { token: localStorage.token },
        }
      );
      const inputTodos = await response.data;

      if (inputTodos) {
        setTodosChange(true);
        setDescription("    ");
        setError("");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "600px", marginTop: "10px" }}>
      <div className="">
        <h1 className="text-center">Add new Task 📖</h1>
        <form className="d-flex" onSubmit={handleForm}>
          <input
            type="text"
            placeholder="add Task"
            className="form-control mr-30"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="btn btn-success mr-3 " type="submit">
            Add
          </button>
        </form>
        <p style={{ color: "red", marginLeft: "70px", fontSize: "20px" }}>
          {error}
        </p>
      </div>
    </div>
  );
};

export default InputTodos;
