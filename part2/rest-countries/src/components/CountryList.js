import React from 'react';

const CountryList = ({list}) => {
  return (
    <div style={{ listStyle: "none" }}>
      {list.map((country) => 
        <li key={country.numericCode}>{country.name}</li>)}
    </div>
  );
};

export default CountryList;