import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../../assets/logo.png'
import React, { useState, useEffect } from 'react';
import ModalAdicionaProduto from './ModalAdicionaProduto';

const CadastroProduto = () => {

    const baseUrl = "https://localhost:7229/api/Produto";

    const [produtos, setProduto] = useState([]);

    const pedidoGet = async() => {
        await axios.get(baseUrl)
        .then(response => {
            setProduto(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        pedidoGet();
    })


    {/* Controlar modal */}
    const [modalIncluir, setModalIncluir] = useState(false);

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    }


    return (
        <div>
            <h1>Cadastro de Produtos</h1>
            <img src={logo} /> 

            <button className="btn btn-secondary" onClick={() => abrirFecharModalIncluir() }>Adicionar produto</button>

            <div>
                {produtos.map( produto => (
                    <div>
                        <h2>{produto.nome}</h2>
                        <p>Descrição: {produto.descricao}</p>
                        <p>R$ {produto.preco}</p>
                        <p>Cor: {produto.cor}</p>
                        <p>Quantidade no estoque: {produto.quantidade}</p>
                        <p>Categoria: {produto.categoria}</p>
                        <button className="btn btn-primary">Editar</button>
                        <button className="btn btn-danger">Excluir</button>
                    </div>
                ))}
            </div>
            <ModalAdicionaProduto
                abrirFecharModalIncluir={abrirFecharModalIncluir}
                modalIncluir = {modalIncluir}
                baseUrl = {baseUrl}
                setProduto = {setProduto}
                produtos = {produtos}
            />
        </div>

        
    )
}

export default CadastroProduto