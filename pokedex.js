const pokeList$$ = document.querySelector('#pokedex');
//console.log(pokeList$$);
const getPokemon = async () => {
    const pokemonList = []

    for (let i=1; i<151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        console.log(data);
        pokemonList.push({
            id: data.id,
            name: data.name,
            image: data.sprites['front_default'],
            type: data.types.map((type) => type.type.name).join(', '),
        });
    }
    return pokemonList;
}
console.log(getPokemon());

const init = async () => {
    const pokemons = await getPokemon();
    
}
init();

