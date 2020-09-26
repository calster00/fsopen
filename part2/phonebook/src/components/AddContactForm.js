import React from "react";

const AddContactForm = (props) => {
  return (
    <form>
      <div>
        name: <input value={props.name} onChange={props.onNameChange} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onNumberChange} />
      </div>
      <div>
        <button onClick={props.onSubmit} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default AddContactForm;
