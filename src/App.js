import PokemonList from "./Components/PokemonList";
import PokemonInfo from "./Components/PokemonInfo";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/info" element={<PokemonInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
