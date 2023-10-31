import React from "react";
import './styles.css'

function Form({input, setInput}) {
  return (
    <div className="form-container">
      <input className="form-input" 
      value={input} 
      onChange={(e) => setInput(e.target.value)} 
      type="text" 
      />
      <button className="form-button" type="submit">
        ADD
      </button>
    </div>
  );
}

export default Form;
