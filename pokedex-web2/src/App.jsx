import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  //Un nouvel etat pour stocker ce que l'user tape
  const [searchTerm, setSearchTerm] = useState('');

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

  //filtrage des pokemons(variable contenant les pokemons filtres)
  const filteredPokemons = pokemonList.filter((pokemon)=> 
  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <h1>Pokedex</h1>

      <input 
      type="text"
      placeholder='Rechercher un Pokémon...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className='search-bar'
       />

       <p className="result-count">
        {filteredPokemons.length} Pokémon{filteredPokemons.length > 1 ? 's' : ''}
        trouvé{filteredPokemons.length > 1 ? 's' : ''}
       </p>
      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;