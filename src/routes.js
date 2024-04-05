import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Produtos from './pages/Produtos'
import NovoProduto from './pages/NovoProduto'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produto/novo/:produtoId" element={<NovoProduto />} />
            </Routes>
        </BrowserRouter>
    )
}