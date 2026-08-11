import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      // 1. On récupère la liste de base (noms + urls)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
      const data = await response.json();

      // 2. Pour CHAQUE pokemon de la liste, on va chercher ses détails
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );

      setPokemonList(detailedPokemons);
      setLoading(false);
    }

    fetchPokemons();
  }, []);

  if (loading) {
    return <p>Chargement des Pokémon...</p>;
  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;