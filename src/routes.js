import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Produtos from './pages/Produtos'
import NovoProduto from './pages/NovoProduto'
import CrudProduto from './components/CrudProduto';
import { ModalPropsProvider } from './context/ProdutoContext/ProdutoContext';
import Home from './pages/Home'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produto/novo/:produtoId" element={<NovoProduto />} />
                <Route path="/admin" element={
                    <ModalPropsProvider> <CrudProduto /> </ModalPropsProvider>
                } />
            </Routes>
        </BrowserRouter>
    )
}