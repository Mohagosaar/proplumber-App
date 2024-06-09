import { useState, useEffect } from "react";
import ListHeader from "./components/ListHeader/ListHeader";
import ListItems from "./components/ListItems/ListItems";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]); // Initialize state as an array

  const getData = async () => {
    try {
      const userEmail = "user2@example.com";
      const response = await fetch(`http://localhost:4008/todos`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Sort tasks by date
  const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listNames={"🏖 Vacation Planner To-Do-list App"} />
      {sortedTasks?.map((task) => (
        <ListItems key={task.id} task={task} />
      ))}
    </div>
  );
};

export default App;
