import { useState } from "react";
import { useDemoQuery } from "./services/poki";

export default function App() {
  const [state, setState] = useState("");
  const [submit, setSubmit] = useState("bulbasaur");

  const handelChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSubmit(state);
    setState("");

    // Your handleSubmit logic here
  };
  
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useDemoQuery(submit);
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="App">
      <input type="text"  value={state} placeholder="search" onChange={handelChange} />
      <button onClick={handleSubmit}>Search</button>

      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
}
