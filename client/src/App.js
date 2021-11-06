import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <h1> Basketball :) </h1>
        <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
        >
          <Link to="/players">Players</Link> |{" "}
          <Link to="/coaches">Coaches</Link> |{" "}
          <Link to="/games">Games</Link>
        </nav>
    </div>
    
  );
}

export default App;
