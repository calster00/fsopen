import React from 'react';

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang => 
          <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} style={{ width: 100 }}/>
    </div>
  );
};

export default Country;