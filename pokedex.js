const pokeList$$ = document.querySelector('#pokedex');
  //console.log(pokeList$$);


const getPokemon = async () => {
    for (let i = 1; i < 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonRes = await response.json();
        console.log(pokemonRes);

//no he conseguido pintar bien los pokemon con el mapeo, pero creo el objeto con los atributos que me pide el ejercicio
        const pokemon = {
            name: pokemonRes.name,
            image: pokemonRes.sprites['front_default'],
            type: pokemonRes.types.map((type) => type.type.name).join(', '),
            id: pokemonRes.id
        };

        //llamo a la funcion dentro del bucle para que se pinte por cada vuelta.
        pintarPokemon(pokemon, pokeList$$);
        
    }
}

function pintarPokemon(pokemon, pokeList$$) {

    const newLi = document.createElement('li');
    newLi.className = 'card-list';

    const card = document.createElement('div'); //Cada li será un div con los datos del pokemon
    card.className = 'card';

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
    
    //btn que borra los pokemon que no me gustan
    const btnPokemon = document.createElement('button')
    btnPokemon.className ='poke-btn';
    btnPokemon.textContent = 'NO ME GUSTA'
    btnPokemon.addEventListener('click', () => {
    newLi.remove()
})
    
    
    cardHeader.appendChild(id);
    cardHeader.appendChild(type)
    card.appendChild(cardHeader);

    cardContent.appendChild(img);
    cardContent.appendChild(nombre);
    card.appendChild(cardContent);


    newLi.appendChild(card);
    newLi.appendChild(btnPokemon);

    pokeList$$.appendChild(newLi);
    
}


const init = async () => {
    const pokemons = await getPokemon();   
}
init();

