import React from "react";
import { NavLink } from "react-router-dom";
import './App.css';
import PaletteUIColor from "./components/paletteIcons/paletteUIColor";

const App = () => (
    <div className="app-container">
      <div className="title">
        Flat UI Colors 2
      </div>

      <div className="grid-container">
        <NavLink className="nav-link" to="/materialUIColor">
          <PaletteUIColor paletteName="Material UI Colors"/>
        </NavLink>
        <NavLink className="nav-link" to="/flatUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors v1"/>
        </NavLink>
        <NavLink className="nav-link" to="/dutchUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors Dutch"/>
        </NavLink>
        <NavLink className="nav-link" to="/americanUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors American"/>
        </NavLink>
        <NavLink className="nav-link" to="/aussieUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors Aussie"/>
        </NavLink>
        <NavLink className="nav-link" to="/britishUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors British"/>
        </NavLink>
        <NavLink className="nav-link" to="/spanishUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors Spanish"/>
        </NavLink>
        <NavLink className="nav-link" to="/indianUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors Indian"/>
        </NavLink>
        <NavLink className="nav-link" to="/frenchUIcolor">
          <PaletteUIColor paletteName="Flat UI Colors French"/>
        </NavLink>
      </div>
    </div>
);

export default App;
