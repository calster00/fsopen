import React, { useState, useEffect } from "react";
import CountryInfo from "./CountryInfo";
import CountryList from "./CountryList";
import Filter from "./Filter";

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
      <Filter value={searchTerm} onChange={handleChange} />
      {filtered.length > 10 
        ? "Too many matches, specify another filter" 
        : filtered.length > 1
          ? <CountryList list={filtered} />
          : filtered.length > 0 && <CountryInfo country={filtered[0]}/>
      }
    </div>
  );
}

export default App;
