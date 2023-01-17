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
        //console.log(pokemon);
//llamo a la funcion dentro del bucle para que se pinte por cada vuelta.
        pintarPokemon(pokemon);
    }
}

//función para pintar en el dom
function pintarPokemon(pokemon) {

    const newLi = document.createElement('li');
    newLi.className = 'card-list';

    //Creo la carta que será un div por cada li
    const card = document.createElement('div'); 
    card.className = 'card';

    //Creo la cabecera de la carta con el id y el tipo de pokemon
    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header";

    const id = document.createElement('div');
    id.className = "card-id";
    id.innerHTML = pokemon.id;

    const type = document.createElement('div');
    type.className = "card-type";
    type.innerHTML = pokemon.type;

    //Creo el cuerpo de la carta con la img y el nombre
    const cardContent = document.createElement('div');
    cardContent.className = "card-content";

    const img = document.createElement('img');
    img.src = pokemon.image;

    const nombre = document.createElement('div');
    nombre.className = "card-title";
    nombre.innerHTML = pokemon.name;
    
    // btn que borra los pokemon que no me gustan
    const btnPokemon = document.createElement('button')
    btnPokemon.className ='poke-btn';
    btnPokemon.textContent = 'NO ME GUSTA'
    btnPokemon.addEventListener('click', () => {
    newLi.remove();
})
    
    //Añado los hijos
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
// NO CONSIGO QUE EL INPUT FUNCIONE 
const input$$ = document.querySelector(".filter-btn");
    input$$.addEventListener("input", (event)=>
    searchPokemons(event.target.value));
    //console.log(input$$);


function searchPokemons(value) {
    let filteredPokemons = pokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(value.toLowerCase());
    });
        pintarPokemon(filteredPokemons);
    }

const init = async () => {
    await getPokemon();
}
init();

