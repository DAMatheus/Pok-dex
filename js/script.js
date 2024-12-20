const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async(pokemon) => {
    pokemonName.innerHTML = "Loading..."
    pokemonNumber.innerHTML = ""
    const data = await fetchPokemon(pokemon);
        if(data){
            pokemonNumber.innerHTML = data.id;
            pokemonName.innerHTML = data.name.toLowerCase();
            pokemonImage.src = data.sprites.front_default;
            searchPokemon = data.id
        }else {
            pokemonImage.src = 'images/Missingno..webp'
            pokemonName.innerHTML = 'MissingNo.'
            pokemonNumber.innerHTML = "000000000"
        }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value)
})
buttonPrev.addEventListener('click', () => {
    if(searchPokemon >1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})
