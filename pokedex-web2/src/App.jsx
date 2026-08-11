import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
  fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
  .then((response) => response.json())
  .then((data) => {
    setPokemonList(data.results);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Erreur lors du fetch:', error);
    setLoading(false);
  })
}, []);

  if (loading) {
    return <p>Chargement des Pokemon en cours...</p>
  }

  return (
   <div className='App'>
    <h1>Pokedex</h1>
    <ul>
      {pokemonList.map((pokemon) => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
   </div>
  );
} 

export default App;
