import React from "react";

export default function Collection({
  pokemonCollection,
  handleCardClick,
  handleRemoveCard,
}) {
  const removeCard = (pokemon) => {
    handleRemoveCard(pokemon);
  };

  return (
    <div className="collection">
      <h1>My Pokemon Collection</h1>
      {pokemonCollection.length === 0 ? (
        <p>Your collection is empty.</p>
      ) : (
        <div className="card-container">
          {pokemonCollection.map((pokemon) => (
            <div className="card" key={pokemon.id}>
              <p>{pokemon.id}</p>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                onClick={() => handleCardClick(pokemon)}
              />
              <h3>{pokemon.name}</h3>
              <button onClick={() => removeCard(pokemon)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
