import Nav from "../Nav/Nav";
import { Link, BrowserRouter as Router } from "react-router-dom";

const UserHeader = () => {
  return (
    <Router>
      <div>
        <Nav />

        <h1>Unlock Opportunities: Join Our Skilled Plumbing Network Today!</h1>
      </div>
    </Router>
  );
};

export default UserHeader;
