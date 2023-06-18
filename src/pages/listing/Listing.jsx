import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FiFilter } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

import "./style.scss";
import { Card, Filterbar } from "../../components";

const Listing = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [end, setEnd] = useState(10);
  const [start, setStart] = useState(1);
  const [filterOn, setFilterOn] = useState(false);
  const [filterPokemons, setFilterPokemons] = useState([]);

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    setFilterPokemons([ ...pokemons]);
  }, [pokemons]);

  const loadPokemons = async () => {
    setIsLoading(true);
    const pokemonList = [];
    try {
      for (let index = start; index <= end; index++) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${index}`
        );
        const data = await response.json();
        const type = data.types.map((type) => type.type.name);
        const pokemon = {
          name: data.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
          id: data.id,
          height: data.height,
          weight: data.weight,
          type: type,
          species: data.species.name,
          abilities: data.abilities,
        };
        pokemonList.push(pokemon);
      }
      setStart(start + 10);
      setEnd(end + 10);
      setPokemons([...pokemons, ...pokemonList]);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="listing">
      <h2>Pokémon Listing</h2>
      <div className="searchbar">
        {filterOn ? (
          <>
            <button
              className="btn-search"
              id="btn-filter"
              onClick={() => setFilterOn(!filterOn)}
            >
              Filter <RxCross1 />
            </button>
            <div className="filterSide">
              <Filterbar
                filterClass={"filterClass"}
                setFilter={setFilterPokemons}
              />
            </div>
          </>
        ) : (
          <button
            className="btn-search"
            id="btn-filter"
            onClick={() => setFilterOn(!filterOn)}
          >
            Filter <FiFilter />
          </button>
        )}
      </div>
      <div className="list__container">
        <Filterbar filterClass={"sidebar"} setFilter={setFilterPokemons} />
        <InfiniteScroll
          dataLength={pokemons.length}
          next={loadPokemons}
          hasMore={!isLoading}
          loader={<p>Loading...</p>}
          className="pokemon-grid"
        >
          {filterPokemons.map((pokemon, i) => (
            <Card key={i} pokemon={pokemon} />
          ))}
        </InfiniteScroll>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Listing;
