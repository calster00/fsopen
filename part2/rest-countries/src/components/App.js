import React, { useState, useEffect } from "react";
import Country from "./Country";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((json) => setCountries(countries.concat(json)));
  }, []);

  const handleChange = (e) => setSearchTerm(e.target.value);

  const filtered = countries.filter((country) => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      Find countries: <input value={searchTerm} onChange={handleChange} />
      <p>Search Results</p>
      {filtered.length > 10 
        ? "Too many matches, specify another filter" 
        : filtered.length > 1
          ? filtered.map((country) => 
            <li key={country.numericCode}>{country.name}</li>)
          : filtered.length > 0 && <Country country={filtered[0]}/>
      }
    </div>
  );
}

export default App;
