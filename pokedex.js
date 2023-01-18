const pokeList$$ = document.querySelector('#pokedex');
  //console.log(pokeList$$);

const pokemons = [];
const getPokemon = async () => {
    
    for (let i = 1; i < 151; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemonRes = await response.json();

        const pokemon = {
            name: pokemonRes.name,
            image: pokemonRes.sprites['front_default'],
            type: pokemonRes.types.map((type) => type.type.name).join(', '),
            id: pokemonRes.id
        };
        pokemons.push(pokemon);        

        pintarPokemon(pokemon); //llamo a la función para que pinte por cada vuelta del bucle
    }
}
// Pinto los pokemon 
function pintarPokemon(pokemon) {

    const newLi = document.createElement('li');
    newLi.className = 'card-list';

    const card = document.createElement('div'); 
    card.className = 'card';

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
    btnPokemon.addEventListener('click', () => {newLi.remove();})
    
    //Añado los datos de la cabecera a la carta
    cardHeader.appendChild(id);
    cardHeader.appendChild(type)
    card.appendChild(cardHeader);

    //Añado los datos del cuerpo a la carta
    cardContent.appendChild(img);
    cardContent.appendChild(nombre);
    card.appendChild(cardContent);

    //Añado la carta y el botón de eliminar al li 
    newLi.appendChild(card);
    newLi.appendChild(btnPokemon);

    //Añado los li a la ol donde estarán pintados los pokemon
    pokeList$$.appendChild(newLi);
    
}

//INPUT- BUSCADOR:
//Añado el evento al input y en la función searchPokemons retorno los pokemons del array que se ha creado (linea 4)
const input$$ = document.querySelector(".filter-btn");
input$$.addEventListener("input", (event) => searchPokemons(pokemons, event.target.value));

function searchPokemons(pokemons, value) {
    //console.log(pokemons[0].name);
    let filteredPokemons = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(value.toLowerCase());
    });
    pintarPokemonInput(filteredPokemons);
}

    //Pinto los pokemons filtrados por el input
const pintarPokemonInput = (pokes) => {
    pokeList$$.innerHTML = "";

    for (let poke of pokes) {
    const newLi = document.createElement('li');
    newLi.className = 'card-list';

    const card = document.createElement('div'); 
    card.className = 'card';

    const cardHeader = document.createElement('div');
    cardHeader.className = "card-header";

    const id = document.createElement('div');
    id.className = "card-id";
    id.innerHTML = poke.id;

    const type = document.createElement('div');
    type.className = "card-type";
    type.innerHTML = poke.type;

    const cardContent = document.createElement('div');
    cardContent.className = "card-content";

    const img = document.createElement('img');
    img.src = poke.image;

    const nombre = document.createElement('div');
    nombre.className = "card-title";
    nombre.innerHTML = poke.name;
    
    const btnPokemon = document.createElement('button')
    btnPokemon.className ='poke-btn';
    btnPokemon.textContent = 'NO ME GUSTA'
    btnPokemon.addEventListener('click', () => { newLi.remove();})
    
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
}
getPokemon();