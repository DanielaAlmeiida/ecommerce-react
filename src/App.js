import React from 'react'
import './normalize.css';
import CadastroProduto from './components/CadastroProduto';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>E-commerce</h1>
        <CadastroProduto />
      </header>
    </div>
  );
}

export default App;
