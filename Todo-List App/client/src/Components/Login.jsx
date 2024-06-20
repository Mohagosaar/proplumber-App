import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    userEmail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { userEmail, password } = inputs;
    try {
      console.log("Sending login request...");
      const response = await axios.post("/api/user/login", {
        userEmail,
        password,
      });
      console.log("Received response:", response);
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        setAuth(true);
        toast.success("Login successful");
        setError(""); // Clear any previous errors
      } else {
        setError(data.error);
        setAuth(false);
        setInputs({
          userEmail: "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Error during login request:", err.message);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div
      className="container border rounded"
      style={{ maxWidth: "600px", marginTop: "200px" }}
    >
      <div className="row my-2 justify-content-center">
        <div className="col-6">
          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              name="userEmail"
              value={inputs.userEmail}
              onChange={onChange}
              placeholder="Email"
              className="form-control my-3"
            />
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={onChange}
              className="form-control my-3"
              placeholder="Password"
            />
            <button className="btn btn-success form-control my-3" type="submit">
              Submit
            </button>
            <Link to="/Register">Register</Link>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
