const pokeList$$ = document.querySelector('#pokedex');
  //console.log(pokeList$$);


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

        //llamo a la funcion dentro del bucle para que se pinte por cada vuelta.
        pintarPokemon(pokemon, pokeList$$);
        
    }
}

function pintarPokemon(pokemon, pokeList$$) {

    //Creo los elementos en el DOM:
    const newLi = document.createElement('li');

    
    const card = document.createElement('div'); //Cada li será un div que llevará el contenido del pokemon en forma de carta
    newLi.className = 'card';
    
    const img = document.createElement('img');
    img.src = pokemon.image;

    const nombre = document.createElement('div');
    nombre.className = "card-title";
    nombre.innerHTML = pokemon.name;

    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header";

    const id = document.createElement('div');
    id.className = "card-id";
    id.innerHTML = pokemon.id;

    const type = document.createElement('div');
    type.className = "card-type";
    type.innerHTML = pokemon.type;

    const cardContent = document.createElement('div');
    cardContent.className = "card-content";
    
    
    cardHeader.appendChild(id);
    cardHeader.appendChild(type)
    card.appendChild(cardHeader);

    cardContent.appendChild(img);
    cardContent.appendChild(nombre);
    card.appendChild(cardContent);


    newLi.appendChild(card);
    pokeList$$.appendChild(newLi);
}


const init = async () => {
    const pokemons = await getPokemon();   
}
init();

