import React from 'react';

const Filter = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      Filter countries: <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;