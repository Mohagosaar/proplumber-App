const ListHeader = ({ listNames }) => {
  const signOut = () => {};
  return (
    <div className="list-hdeader">
      <h1>{listNames}</h1>
      <div className="btn-container">
        <button className="btn-create">ADD NEW TASK</button>
        <button className="sign-out" onClick={signOut}>
          signout
        </button>
      </div>
    </div>
  );
};

export default ListHeader;
