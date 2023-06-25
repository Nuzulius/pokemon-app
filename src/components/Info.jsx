import React from "react";

export default function Info({ data }) {
  const getTypeColor = (type) => {
    switch (type) {
      case "normal":
        return "#A8A878";
      case "fire":
        return "#F08030";
      case "water":
        return "#6890F0";
      case "electric":
        return "#F8D030";
      case "grass":
        return "#78C850";
      case "ice":
        return "#98D8D8";
      case "fighting":
        return "#C03028";
      case "poison":
        return "#A040A0";
      case "ground":
        return "#E0C068";
      case "flying":
        return "#A890F0";
      case "psychic":
        return "#F85888";
      case "bug":
        return "#A8B820";
      case "rock":
        return "#B8A038";
      case "ghost":
        return "#705898";
      case "dragon":
        return "#7038F8";
      case "dark":
        return "#705848";
      case "steel":
        return "#B8B8D0";
      case "fairy":
        return "#EE99AC";
      default:
        return "#FFF";
    }
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <div className="umum">
            <h1>{data.name}</h1>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt=""
              style={{ backgroundColor: getTypeColor(data.types[0].type.name) }}
            />

            <div className="type">
              {data.types.map((poke) => {
                return (
                  <div className="group" key={poke.type.name}>
                    <p>{poke.type.name}</p>
                  </div>
                );
              })}
            </div>

            <div className="abilities">
              {data.abilities.map((poke) => {
                return (
                  <div className="group" key={poke.ability.name}>
                    <p>{poke.ability.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="status">
            <h1>Stats</h1>
            <p>Weight: {data.weight}</p>
            <p>Height: {data.height}</p>
            {data.stats.map((poke) => {
              return (
                <p key={poke.stat.name}>
                  {poke.stat.name}: {poke.base_stat}
                </p>
              );
            })}
          </div>

          <div className="moves">
            <h1>Moves</h1>
            {data.moves.map((poke) => {
              return (
                <div className="group" key={poke.move.name}>
                  <p>{poke.move.name}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
