import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../../assets/logo.png'
import React, { useState, useEffect } from 'react';
import ModalAdicionaProduto from './ModalAdicionaProduto';
import ModalEditaProduto from './ModalEditaProduto';
import ModalExcluiProduto from './ModalExcluiProduto';

const CrudProduto = () => {

    const baseUrl = "https://localhost:7229/api/Produto";

    const [produtos, setProdutos] = useState([]);
    const [updateProdutos, setUpdateProdutos] = useState(true);

    const pedidoGet = async() => {
        await axios.get(baseUrl)
        .then(response => {
            setProdutos(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const [produtoSelecionado, setProdutoSelecionado] = useState({
        id: '',
        nome: '',
        preco: '',
        quantidade: '',
        categoria:'',
        cor: '',
        descricao: ''
    })

    const handleChange = e => {
        const {name, value} = e.target;

        setProdutoSelecionado({
            ...produtoSelecionado, [name]:value
        });
    }


    {/* Controlar modal - adicionar produto */}
    const [modalIncluir, setModalIncluir] = useState(false);

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    }


    {/* Controlar modal - Editar Produto */}
    const [modalEditar, setModalEditar] = useState(false);

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    
    {/* Controlar modal - Excluir Produto */}
    const [modalExcluir, setModalExcluir] = useState(false);

    const abrirFecharModalExcluir = () => {
        setModalExcluir(!modalExcluir);
    }


    const selecionarProduto = (produto, opcao) => {
        setProdutoSelecionado(produto);
            (opcao==="Editar") ? 
                abrirFecharModalEditar() : abrirFecharModalExcluir();
    }

    useEffect(() => {
        if (updateProdutos) {
            pedidoGet();
            setUpdateProdutos(false);
        }
    }, [updateProdutos])


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
                        <button className="btn btn-primary" onClick={() => selecionarProduto(produto, "Editar") } >Editar</button>
                        <button className="btn btn-danger" onClick={() => selecionarProduto(produto, "Excluir") }>Excluir</button>
                    </div>
                ))}
            </div>
            
            <ModalAdicionaProduto
                abrirFecharModalIncluir={abrirFecharModalIncluir}
                modalIncluir = {modalIncluir}
                baseUrl = {baseUrl}
                setProdutos = {setProdutos}
                produtos = {produtos}
                produtoSelecionado = {produtoSelecionado}
                handleChange={handleChange}
                setUpdateProdutos = {setUpdateProdutos}
            />

            <ModalEditaProduto 
                abrirFecharModalEditar={abrirFecharModalEditar}
                modalEditar={modalEditar}
                baseUrl={baseUrl}
                produtos={produtos}
                produtoSelecionado={produtoSelecionado}
                handleChange={handleChange}
                setUpdateProdutos={setUpdateProdutos}
            />

            <ModalExcluiProduto 
                abrirFecharModalExcluir={abrirFecharModalExcluir}
                modalExcluir={modalExcluir} 
                baseUrl={baseUrl}
                produtos={produtos}
                produtoSelecionado={produtoSelecionado}
                setUpdateProdutos={setUpdateProdutos}
                setProdutos={setProdutos}
            />
        </div>
    )
}

export default CrudProduto