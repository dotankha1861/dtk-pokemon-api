import './App.css';
import axios from "axios"
import {useState, useEffect, useRef} from "react";
import PokemonCollection from './components/PokemonCollection';
import { Pokemons, Pokemon } from './interface';

const App:React.FC = () => {

  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  const nextUrl = useRef<string>("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");

  const getPokemon = async() => {
    try {
      const res = await axios.get(nextUrl.current);
      nextUrl.current = res.data.next;
      res.data.results.forEach(async(pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemon((p)=>[...p, poke.data]);
    })

    } catch (error) {
      alert(error);
    }
  }

  const nextPage = () => {
    getPokemon();
  }

  useEffect(() => {
    getPokemon();
  },[]);

  return (
    <div className="App">
        <div className="container">
            <header className="pokemon-header">Pokemon</header>
            <PokemonCollection pokemons={pokemons}/>
            <div className="btn">
              <button onClick={nextPage}>Load More</button>
            </div>
        </div>
    </div>
  );
}

export default App;
