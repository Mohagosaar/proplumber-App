import Modul from "../Modules/Modal";

const ListHeader = ({ listNames }) => {
  const signOut = () => {};
  return (
    <div className="list-hdeader">
      <h1>{listNames}</h1>
      <div className="btn-container">
        <button className="btn-addTask">ADD NEW TASK</button>
        <button className="btn-sigtout" onClick={signOut}>
          signout
        </button>
      </div>
      <Modul />
    </div>
  );
};

export default ListHeader;
