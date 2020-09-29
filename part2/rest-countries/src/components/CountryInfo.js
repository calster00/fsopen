import React from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} style={{ width: 100 }} />
      <h3>Weather in {country.capital}</h3>
      <Weather country={country}/>
    </div>
  );
};

export default CountryInfo;
