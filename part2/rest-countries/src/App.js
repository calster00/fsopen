import React, { useState, useEffect } from "react";
import CountryInfo from "./components/CountryInfo";
import CountryList from "./components/CountryList";
import Filter from "./components/Filter";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [info, setInfoState] = useState(-1);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((json) => setCountries(countries.concat(json)));
  }, []);

  const handleFilterChange = (e) => {
    setSearchTerm(e.target.value);
    setInfoState(-1);
  };

  const displayInfo = (index) => setInfoState(index);

  const filtered = countries.filter((country) => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Filter value={searchTerm} onChange={handleFilterChange} />
      {filtered.length > 10 
        ? "Too many matches, specify another filter" 
        : filtered.length > 1
          ? <CountryList list={filtered} info={info} displayInfo={displayInfo}/>
          : filtered.length > 0 && <CountryInfo country={filtered[0]}/>
      }
    </div>
  );
}

export default App;
