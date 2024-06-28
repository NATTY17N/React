import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PalettePage from "./components/palettePages/palettePage";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/materialUIcolor" element={<PalettePage paletteName="Material UI Colors" />} />
        <Route path="/flatUIcolor" element={<PalettePage paletteName="Flat UI Colors v1" />}/>
        <Route path="/dutchUIcolor" element={<PalettePage paletteName="Flat UI Colors Dutch" />}/>
        <Route path="/americanUIcolor" element={<PalettePage paletteName="Flat UI Colors American" />}/>
        <Route path="/aussieUIcolor" element={<PalettePage paletteName="Flat UI Colors Aussie" />}/>
        <Route path="/britishUIcolor" element={<PalettePage paletteName="Flat UI Colors British" />}/>
        <Route path="/spanishUIcolor" element={<PalettePage paletteName="Flat UI Colors Spanish" />}/>
        <Route path="/indianUIcolor" element={<PalettePage paletteName="Flat UI Colors Indian" />}/>
        <Route path="/frenchUIcolor" element={<PalettePage paletteName="Flat UI Colors French" />}/>

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
