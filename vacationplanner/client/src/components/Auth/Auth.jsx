import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event, endpoint) => {
    event.preventDefault();

    if (!email || !password || (!isLogin && !confirmPassword)) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4008/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
      } else {
        setCookies("Email", data.email);
        setCookies("AuthToken", data.token);
        window.location.reload();
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Please login" : "Please signup"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(event) =>
              handleSubmit(event, isLogin ? "login" : "signup")
            }
          />
          {error && <p className="error">{error}</p>}
        </form>
        <div className="auth-option">
          <button onClick={() => viewLogin(false)}>Signup</button>
          <button onClick={() => viewLogin(true)}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
