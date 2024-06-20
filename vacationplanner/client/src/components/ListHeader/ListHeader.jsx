import Modul from "../Modules/Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listNames, getTodos }) => {
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  const signOut = () => {
    removeCookies("Email");
    removeCookies("AuthToken");
    window.location.reload();
  };

  return (
    <div className="list-hdeader">
      <h1>{listNames}</h1>
      <div className="btn-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW TASK
        </button>
        <button className="btn-sigtout" onClick={signOut}>
          signout
        </button>
      </div>
      {showModal && (
        <Modul
          mode={"create"}
          setShowModal={setShowModal}
          getTodos={getTodos}
        />
      )}
    </div>
  );
};

export default ListHeader;
