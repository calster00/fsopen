import React from "react";

const Filter = ({ inputValue, onChange }) => {
  return (
    <div>
      Filter: <input value={inputValue} onChange={onChange} />
    </div>
  );
};

export default Filter;
