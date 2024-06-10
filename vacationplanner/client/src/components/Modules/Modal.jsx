import { useState } from "react";
const Modul = () => {
  const mode = "create";
  const handleForm = (event) => {};
  return (
    <div className="overley">
      <div className="modul">
        <div className="from-groups">
          <h3>Let's {mode} your task</h3>
          <button>X</button>
        </div>
        <form>
          <input
            required
            maxLength={50}
            placeholder=" Add your Task"
            name="title"
            value={""}
            onChange={handleForm}
          />
          <label for=" range"> Select your current progress</label>
          <input
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={""}
            onChange={handleForm}
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Modul;
