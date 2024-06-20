import axios from "axios";
import { useState } from "react";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    userEmail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setError(""); // Clear error message on input change
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, userEmail, password } = inputs;

    if (
      username.trim() === "" ||
      userEmail.trim() === "" ||
      password.trim() === ""
    ) {
      return setError("All fields are required and cannot be empty");
    }

    try {
      const registerResponse = await axios.post("/api/user/register", {
        username,
        userEmail,
        password,
      });

      const parseToken = await registerResponse.data;
      if (parseToken) {
        localStorage.setItem("token", parseToken.token);
        setAuth(true);
        setError("");
      }
    } catch (err) {
      console.log(err.message);
      setError("Registration failed, please try again later");
    }
  };

  return (
    <div
      className="container border rounded"
      style={{ maxWidth: "600px", marginTop: "200px " }}
    >
      <div className="row my-2 justify-content-center">
        <div className="col-6">
          <form onSubmit={onSubmit}>
            <h1>Register</h1>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={(e) => onChange(e)}
              placeholder="Full Name"
              className="form-control my-3"
            />
            <input
              type="email"
              name="userEmail"
              value={inputs.userEmail}
              onChange={(e) => onChange(e)}
              placeholder="Email"
              className="form-control my-3"
            />
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={(e) => onChange(e)}
              className="form-control my-3"
              placeholder="Password"
            />
            <button className="btn btn-success form-control my-3" type="submit">
              Submit
            </button>
          </form>
          {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
