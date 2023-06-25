import React, { useEffect, useState } from "react";
import Card from "./Card";
import Info from "./Info";
import Collection from "./Collection";
import axios from "axios";

export default function Main() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [currentView, setCurrentView] = useState("main");
  const [pokemonCollection, setPokemonCollection] = useState([]);

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  const handleHeaderButtonClick = () => {
    if (currentView === "main") {
      setCurrentView("collection");
    } else {
      setCurrentView("main");
    }
  };

  const handleCaptureButtonClick = (pokemon) => {
    setPokemonCollection((prevCollection) => [...prevCollection, pokemon]);
  };

  const handleRemoveCard = (pokemon) => {
    setPokemonCollection((prevCollection) =>
      prevCollection.filter((item) => item.id !== pokemon.id)
    );
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <div className="header">
        <img src="/logo.png" alt="" onClick={() => setCurrentView("main")} />
        <button onClick={handleHeaderButtonClick}>Collection</button>
      </div>

      {currentView === "main" && (
        <>
          {selectedPokemon ? (
            <div className="info">
              <Info data={selectedPokemon} />
              <button onClick={() => setSelectedPokemon(null)}>Back</button>
            </div>
          ) : (
            <div className="container">
              <Card
                pokemon={pokeData}
                loading={loading}
                handleCardClick={handleCardClick}
                handleCaptureButtonClick={handleCaptureButtonClick}
              />

              <div className="btn">
                {prevUrl && (
                  <button
                    onClick={() => {
                      setPokeData([]);
                      setUrl(prevUrl);
                    }}
                  >
                    Previous
                  </button>
                )}

                {nextUrl && (
                  <button
                    onClick={() => {
                      setPokeData([]);
                      setUrl(nextUrl);
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {currentView === "collection" && (
        <Collection
          pokemonCollection={pokemonCollection}
          handleCardClick={handleCardClick}
          handleRemoveCard={handleRemoveCard}
        />
      )}
    </>
  );
}
