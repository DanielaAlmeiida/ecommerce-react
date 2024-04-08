import React from 'react'
import './normalize.css';
import AppRoutes from './routes';
import CrudProduto from './components/CrudProduto';
import { ModalPropsProvider } from './context/ProdutoContext';


function App() {
  return <ModalPropsProvider> <CrudProduto /> </ModalPropsProvider>
  //return <AppRoutes />;
}

export default App;
