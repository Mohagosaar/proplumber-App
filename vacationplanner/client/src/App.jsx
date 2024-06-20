import { useState, useEffect } from "react";
import ListHeader from "./components/ListHeader/ListHeader";
import ListItems from "./components/ListItems/ListItems";
import axios from "axios";
import Auth from "./components/Auth/Auth";
import Headers from "./components/Headers/Headers";
import { useCookies } from "react-cookie";

const App = () => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;

  const [tasks, setTasks] = useState([]); // Initialize state as an array

  const getTodos = async () => {
    try {
      const response = await fetch(`http://localhost:4008/todos`);
      const json = await response.json();
      setTasks(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getTodos();
    }
  }, []);

  // Sort tasks by date
  const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listNames={"📖  To-Do-list App"} getTodos={getTodos} />
          <p className="username"> Welcome back: {userEmail}</p>
          <Headers />
          {sortedTasks?.map((task) => (
            <ListItems key={task.id} task={task} getTodos={getTodos} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
