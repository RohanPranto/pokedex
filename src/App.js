// src/containers/App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonSearch from './components/PokemonSearch';
import Footer from './components/Footer';
function App() {
  return (
      <div>
      <PokemonSearch/>
      <Footer/>
    </div>
  );
}

export default App;
