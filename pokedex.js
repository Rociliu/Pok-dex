
const getPokemon = async () => {
    for (let i = 1; i < 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonCompleto = await response.json();
        console.log(pokemonCompleto);
        //hacer comentario mapeo
        const pokemon = {
            name: pokemonCompleto.name,
            image: pokemonCompleto.sprites['front_default'],
            type: pokemonCompleto.types.map((type) => type.type.name).join(', '),
            id: pokemonCompleto.id
        };

        const pokeList$$ = document.querySelector('#pokedex');
        //console.log(pokeList$$);

        pintar(pokemon, pokeList$$);
    }
}

function pintar(pokemon, olDOM) {
    const newLi = document.createElement('li');

    const card = document.createElement('div');
    newLi.className = 'card';
    
    const img = document.createElement('img');
    img.src = pokemon.image;

    const nombre = document.createElement('div');
    nombre.className = "card-title";
    nombre.innerHTML = pokemon.name;

    const meta = document.createElement('div');
    meta.className = "card-meta";

    const id = document.createElement('div');
    id.className = "card-id";
    id.innerHTML = pokemon.id;

    const type = document.createElement('div');
    type.className = "card-type";
    type.innerHTML = pokemon.type;

    const innerCard = document.createElement('div');
    innerCard.className = "card-innerCard";
    
    meta.appendChild(id);
    meta.appendChild(type)
    card.appendChild(meta);

    innerCard.appendChild(img);
    innerCard.appendChild(nombre);

    card.appendChild(innerCard)


    newLi.appendChild(card);

    olDOM.appendChild(newLi);
}


const init = async () => {
    const pokemons = await getPokemon();


    
}
init();

