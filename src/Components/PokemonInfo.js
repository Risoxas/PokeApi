import { Link, useLocation } from "react-router-dom";

export default function PokemonInfo() {
  const location = useLocation();
  const { info } = location.state;
  return (
    <div>
      <Link to="/">Atras</Link>
      <p>{JSON.stringify(info)}</p>
    </div>
  );
}
