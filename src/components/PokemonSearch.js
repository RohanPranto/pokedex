// src/components/PokemonSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);

  const fetchPokemonData = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .then((response) => {
        setPokemonData(response.data);
        // Fetch evolution chain data
        fetchEvolutionData(response.data.id);
      })
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setPokemonData(null);
      });
  };

  const fetchEvolutionData = (pokemonId) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then((response) => {
        const evolutionChainUrl = response.data.evolution_chain.url;
        axios.get(evolutionChainUrl)
          .then((evoResponse) => {
            setEvolutionData(evoResponse.data);
          })
          .catch((evoError) => {
            console.error('Error fetching evolution data:', evoError);
            setEvolutionData(null);
          });
      })
      .catch((error) => {
        console.error('Error fetching Pokémon species data:', error);
        setEvolutionData(null);
      });
  };

  return (
    <div className="container mt-3">
      <h1 className="title text-center mb-4">Pokédex</h1>

      {/* Search bar */}
      <div className="mt-4 mb-4 d-flex align-items-center">
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          className="form-control mr-2"
          style={{ marginRight: '10px' }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              fetchPokemonData();
            }
          }}
        />
        <button type="button" onClick={fetchPokemonData} className="btn btn-dark">
          Search
        </button>
      </div>

      {/* Pokémon data */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            {pokemonData && (
              <>
                <img
                  src={pokemonData.sprites.front_default}
                  alt={pokemonData.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">{pokemonData.name}</h5>
                  <p className="card-text font-weight-bold">
                    Height: {pokemonData.height} decimetres
                  </p>
                  <p className="card-text font-weight-bold">
                    Weight: {pokemonData.weight} hectograms
                  </p>
                  <p className="card-text font-weight-bold">
                    Base Experience: {pokemonData.base_experience}
                  </p>
                  <p className="card-text font-weight-bold">
                    Abilities:{" "}
                    {pokemonData.abilities
                      .map((ability) => ability.ability.name)
                      .join(", ")}
                  </p>
                  <p className="card-text font-weight-bold">
                    Types:{" "}
                    {pokemonData.types.map((type) => type.type.name).join(", ")}
                  </p>
                  <p className="card-text font-weight-bold">Stats:</p>
                  <ul className="list-group">
                    {pokemonData.stats.map((stat) => (
                      <li className="list-group-item" key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                      </li>
                    ))}
                  </ul>
                  {/* Moves */}
                  <p className="card-text font-weight-bold">Moves:</p>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        {pokemonData.moves.map((move, index) =>
                          index % 2 === 0 ? (
                            <tr key={move.move.name}>
                              <td>{move.move.name}</td>
                              {index + 1 < pokemonData.moves.length && (
                                <td>{pokemonData.moves[index + 1].move.name}</td>
                              )}
                            </tr>
                          ) : null
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* Moves */}
                  <p className="card-text font-weight-bold">
                    Held Items:{" "}
                    {pokemonData.held_items
                      .map((item) => item.item.name)
                      .join(", ")}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            {evolutionData && (
              <div className="card-body">
                <h5 className="card-title font-weight-bold">Evolution Chain</h5>
                <ul className="list-group">
                  {evolutionData.chain.evolves_to.map((evolution) => (
                    <li
                      className="list-group-item"
                      key={evolution.species.name}
                    >
                      {evolution.species.name}
                      {evolution.evolution_details.map((detail) => (
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detail.min_level}.png`}
                          alt={detail.min_level}
                          className="ml-2"
                          key={detail.min_level}
                        />
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSearch;
