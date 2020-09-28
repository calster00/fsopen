import React, { useState } from "react";
import CountryInfo from "./CountryInfo";

const CountryList = ({ list }) => {
  const [info, setInfoState] = useState(-1);

  const displayInfo = (index) => setInfoState(index);

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
