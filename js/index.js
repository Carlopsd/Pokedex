const informartion = document.getElementById("information");
const allPokemonList =document.getElementById("all-pokemons");

const cambiarPokemon =() =>{

    const nombrePokemon = document.getElementById("pokemon");
    let pokeNombre = nombrePokemon.value;
    pokeNombre= pokeNombre.toLowerCase().replace(/[^a-zA-Z 0-9.]+/g,' '); 


    if (!isNaN(pokeNombre)){
        pokeNombre= Number(pokeNombre)
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNombre}`;

    fetch(url).then((res) => {
        //Si no se encuntra el pokemon
        if (res.status != "200") {
            console.log(res);
            pokeImage("./img/Error.jpg")
            informartion.style.display="none"
            pokeId("")
            pokeTitle("Pokémon no encontrado")
            pokeWH("","")
        }
        else {
            return res.json();
        }
    // Si encuentra el pokemos realizara las siguientes funciones
    }).then((data) => {
        if (data) {
            informartion.style.display="inline";
            allPokemonList.style.display="none";
            console.log(data)
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
            let id= data.id;
            pokeId(id);
            let poketitle = data.name;
            pokeTitle(poketitle);
            let poketype= data.types;
            pokeType(poketype);
            let pokestats=data.stats;
            pokeStats(pokestats);
            let pokeabilities = data.abilities;
            pokeAbilities(pokeabilities);
            let pokemoves =data.moves;
            pokeMoves(pokemoves);
            let weight= data.weight;
            let height=data.height;
            pokeWH(weight,height)
        }   
    });
}

//Función para acceder al pokemon al dar "Enter"
const input = document.getElementById("pokemon");
input.addEventListener("keypress",function(event){
    if(event.key=="Enter"){
        event.preventDefault();
        cambiarPokemon();
    }
});

const allPokemons= () =>{
    const url= `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;
    informartion.style.display="none"

    fetch(url).then((res) => {
        //Si no se encuentra la lista
        if (res.status != "200") {
            console.log(res);
            informartion.style.display="none";
            pokeImage("./img/pokeball.gif")
            pokeId("")
            pokeTitle("Lista no encontrada")
            pokeWH("","")
        }
        else {
            return res.json();
        }
    // Si encuentra el pokemos realizara las siguientes funciones
    }).then((data) => {
        informartion.style.display="none";
        allPokemonList.style.display="inline";
        pokeTitle("Pokemones disponibles")
        pokeId("")
        pokeWH("","")
        
        const pokemons= data.results;
        pokeImage("./img/pokeball.gif")
        // Filtro de ide de cada pokemon

        const url= pokemons.map((i)=>i.url)
        //Separa el id en el url completo y elimin el primer numero del string obtenido
        const id = url.map((i)=>i.replace(/[^0-9]+/g, "").slice(1))

        const pokemon = pokemons.map((i)=> i.name)
        const listPokemons=document.getElementById("list-pokemons")
        let list=" ";
        pokemon.forEach((i,index)=> list += `<dt>${id[index]}: ${i}</dt>`);
        listPokemons.innerHTML= list;
    });
}



//Función para poner la imagen 
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
    pokePhoto.style.width="200px";
}
//Función para poner el id del pokemon 
const pokeId= (id) =>{
    document.getElementById("Pokemon-id").innerHTML=`#${id}`;
}
//Función para poner el nombre del Pokemon 
const pokeTitle = (title) =>{
    document.getElementById("Pokemon-title").innerHTML=`${title}`;
}
//Función para poner el tipo de pokemon encontrado
const pokeType = (type) =>{
    const typeName= type.map((i) => i.type.name);
    document.getElementById("Pokemon-type").innerHTML=`TIPO: `;

    //Acomoda cada tipo encontrado en una lista
    const listTypes = document.getElementById("list-types");
    let list=" ";
    typeName.forEach((i)=> list+= `<dt>${i}</dt>`);
    listTypes.innerHTML=list;
    
}
//Función para poner las estadicticas del pokemon
const pokeStats =(stats) =>{
    const stat=stats.map((i) => i.stat.name);
    const value= stats.map((i)=> i.base_stat)
    
    document.getElementById("Pokemon-stats").innerHTML=`ESTADISTICAS: `;
    const listStats = document.getElementById("list-stats");
    
    //Acomoda la estadistica con su valor y lo coloca en una barra de progreso
    let list="";
    stat.forEach((stat,index)=>{
        list += `<dt>${stat}: </dt>
        <dd><progress max="200" value="${value[index]}"></progress>  ${value[index]}</dd>`
    })

    listStats.innerHTML= list;
}

//Función para poner los movimientos del pokemon
const pokeAbilities =(abilities) => {
    
    document.getElementById("Pokemon-abilities").innerHTML=`HABILIDADES:`; 
    const listAbilities = document.getElementById("list-abilities");

    const ability = abilities.map((i) => i.ability.name);
    let list=" ";
    ability.forEach((i)=> list += `<dt>${i}</dt>`);
    
    listAbilities.innerHTML= list;
}
const  pokeMoves =(moves) => {
    document.getElementById("Pokemon-moves").innerHTML=`MOVIMIENTOS:`; 
    const listMoves = document.getElementById("list-moves");

    const move = moves.map((i) => i.move.name);
    let list=" ";
    move.forEach((i)=> list += `<dt>${i}</dt>`);
    
    listMoves.innerHTML= list;
}

const pokeWH = (weight, height) => {
    document.getElementById("weight").innerHTML=`<h1>Peso: ${weight/10} kg</h1>`;
    document.getElementById("height").innerHTML=`<h1>Altura: ${height/10} m</h1>`;;
}

