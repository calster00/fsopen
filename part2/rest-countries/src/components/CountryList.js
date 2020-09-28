import React from "react";
import CountryInfo from "./CountryInfo";

const CountryList = ({ list, info, displayInfo }) => {
  return (
    <div style={{ listStyle: "none" }}>
      {list.map((country, index) => (
        <li key={index}>
          {country.name}
          <button onClick={() => displayInfo(index)}>info</button>
        </li>
      ))}
      {info > -1 && <CountryInfo country={list[info]} />}
    </div>
  );
};

export default CountryList;
