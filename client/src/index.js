import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./routes/players";
import Coaches from "./routes/coaches";
import Games from "./routes/games";
import Teams from "./routes/teams";
import ReadFile from "./routes/readfile";

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="players" element={<Players />} />
          <Route path="coaches" element={<Coaches />} />
          <Route path="games" element={<Games />} />
          <Route path="teams" element={<Teams />} />
          <Route path="readFile" element={<ReadFile/>} />
        </Route>
      </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
