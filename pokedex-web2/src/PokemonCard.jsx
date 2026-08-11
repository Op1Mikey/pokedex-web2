function PokemonCard({pokemon}) {
    const imageUr1 = pokemon.sprites.front_default;

    return (
        <div className="pokemon-card">
            <img src={imageUr1} alt={pokemon.name} />
            <p className="pokemon-id">#{pokemon.id}</p>
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <div className="pokemon.types">
                {pokemon.types.map((typeInfo)=>(
                    <span key={typeInfo.type.name} className={'type-badge type-${typeInfo.type.name}'}>
                        {typeInfo.type.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default PokemonCard;