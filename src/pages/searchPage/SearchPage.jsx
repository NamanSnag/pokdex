import { useState } from "react";
import { pokemonNames } from "./data";

import "./style.scss";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [autoSuggestion, setAutoSuggestion] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setErrorMessage("Please enter a Pokemon name");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setErrorMessage("Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if(value === "") {
        setAutoSuggestion([]);
        return;
    }
    const filteredNames = pokemonNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAutoSuggestion(filteredNames);
  };

  const handleSuggestions = (e, name) => {
    e.preventDefault();
    name = name.toLowerCase();
    setSearchTerm(name);
    setAutoSuggestion([]);
  }

  console.log(searchResults)

  return (
    <div className="searchpage">
      <div className="search__head">
        <h1>Pokédex Search</h1>
        <div className="search__container">
          <div className="search__int">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter a Pokemon name"
            />
            <ul className="search__suggestion">
              {autoSuggestion &&
                autoSuggestion.map((name, index) => (
                  <li key={index} onClick={(e) => handleSuggestions(e ,name)}>{name}</li>
                ))}
            </ul>
          </div>
          <button onClick={handleSearch} disabled={loading}>
            Search
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {errorMessage && <p className="error">{errorMessage}</p>}

      {!searchResults ? (
        <div className="search__results">
          <h2>Search Results</h2>
          <ul>
            <li>{searchResults.name}</li>
          </ul>
        </div>
      ):(null)}
    </div>
  );
};

export default SearchPage;
