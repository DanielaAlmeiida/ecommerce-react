import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../../assets/logo.svg'
import React, { useState, useEffect } from 'react';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


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

    return (
        <div>
            <h1>Cadastro de Produtos</h1>
            {/* <img src={logo} /> */}

            <div>
                {produtos.map( produto => (
                    <div>
                        <h2>{produto.nome}</h2>
                        <p>Descrição: {produto.descricao}</p>
                        <p>R$ {produto.preco}</p>
                        <p>Cor: {produto.cor}</p>
                        <p>Quantidade no estoque: {produto.quantidade}</p>
                        <p>Categoria: {produto.categoria}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CadastroProduto