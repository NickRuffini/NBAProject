import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./routes/players";
import Coaches from "./routes/coaches";
import Games from "./routes/games";
import Home from "./routes/home";
import Team from "./routes/teams";

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="players" element={<Players />} />
          <Route path="coaches" element={<Coaches />} />
          <Route path="games" element={<Games />} />
          <Route path="home" element={<Home />} />
          <Route path="teams" element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
