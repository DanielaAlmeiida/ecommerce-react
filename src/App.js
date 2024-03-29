import React from 'react'
import './normalize.css';
import CrudProduto from './components/CrudProduto';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>E-commerce</h1>
        <CrudProduto />
      </header>
    </div>
  );
}

export default App;
