import React from "react";

export default function Card({
  pokemon,
  loading,
  handleCardClick,
  handleCaptureButtonClick,
}) {
  return (
    <div className="card-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        pokemon.map((poke) => (
          <div className="card" key={poke.id}>
            <p>{poke.id}</p>
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              onClick={() => handleCardClick(poke)}
            />
            <h3>{poke.name}</h3>
            <button onClick={() => handleCaptureButtonClick(poke)}>
              Capture
            </button>
          </div>
        ))
      )}
    </div>
  );
}
