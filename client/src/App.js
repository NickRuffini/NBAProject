import './App.css';
import { Link, Outlet } from "react-router-dom";

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
          <Link to="/games">Games</Link> |{" "}
          <Link to="/teams">Teams</Link> |{" "}
          <Link to="/readfile">Read File</Link>
        </nav>
        <Outlet/>
    </div>
    
  );
}

export default App;
