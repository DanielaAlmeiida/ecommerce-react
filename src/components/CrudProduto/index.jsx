import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from '../../assets/logo.png'
import React, { useState, useEffect } from 'react';
import ModalAdicionaProduto from './ModalAdicionaProduto';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import InputFormModal from './InputFormModal';

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

    useEffect(() => {
        if (updateProdutos) {
            pedidoGet();
            setUpdateProdutos(false);
        }
    }, [updateProdutos])



    const [produtoSelecionado, setProdutoSelecionado] = useState({
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        cor: '',
        quantidade: '',
        categoria:''
    })

    const handleChange = e => {
        const {name, value} = e.target;

        setProdutoSelecionado({
            ...produtoSelecionado, [name]:value
        });
    }




    {/* Controlar modal */}
    const [modalIncluir, setModalIncluir] = useState(false);

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    }


    {/* Editar Produto */}
    const [modalEditar, setModalEditar] = useState(false);

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    
    {/* Excluir Produto */}
    const [modalExcluir, setModalExcluir] = useState(false);

    const abrirFecharModalExcluir = () => {
        setModalExcluir(!modalExcluir);
    }


    const selecionarProduto = (produto, opcao) => {
        setProdutoSelecionado(produto);
            (opcao==="Editar") ? 
                abrirFecharModalEditar() : abrirFecharModalExcluir();
    }

    const pedidoPut = async() => {
        produtoSelecionado.preco = parseFloat(produtoSelecionado.preco);
        produtoSelecionado.quantidade = parseInt(produtoSelecionado.quantidade);

        await axios.put(baseUrl + "/" + produtoSelecionado.id, produtoSelecionado)
        .then(response => {
            var resposta = response.data;
            var dadosAuxiliar = produtos;

            dadosAuxiliar.map(produto => {
                if(produto.id === produtoSelecionado.id) {
                    produto.nome = resposta.nome;
                    produto.descricao = resposta.descricao;
                    produto.preco = resposta.preco;
                    produto.cor = resposta.cor;
                    produto.quantidade = resposta.quantidade;
                    produto.categoria = resposta.categoria;
                }
            });
            setUpdateProdutos(true);
            abrirFecharModalEditar();
        }).catch(error => {
            console.log(error);
        })
    }


    {/* Excluir Produto */}
    const pedidoDelete = async() => {
        await axios.delete(baseUrl + "/" + produtoSelecionado.id)
        .then(response => {
            setProdutos(produtos.filter(
                produto => produto.id !== response.data
            ));
            setUpdateProdutos(true);
            abrirFecharModalExcluir();
        }).catch(error => {
            console.log(error);
        })
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
                setUpdateProdutos = {setUpdateProdutos}
            />


            {/* Editar Produto */}
            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Produto</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <InputFormModal handleChange={handleChange} label = "Nome: " name="nome" 
                            value={produtoSelecionado && produtoSelecionado.nome}
                        />
                        <InputFormModal handleChange={handleChange} label = "Descrição: " name="descricao" 
                            value={produtoSelecionado && produtoSelecionado.descricao}
                        />
                        <InputFormModal handleChange={handleChange} label = "Preço: " name="preco" 
                            value={produtoSelecionado && produtoSelecionado.preco}
                        />
                        <InputFormModal handleChange={handleChange} label = "Cor: " name="cor" 
                            value={produtoSelecionado && produtoSelecionado.cor}
                        />
                        <InputFormModal handleChange={handleChange} label = "Quantidade: " name="quantidade" 
                            value={produtoSelecionado && produtoSelecionado.quantidade}
                        />
                        <InputFormModal handleChange={handleChange} label = "Categoria: " name="categoria" 
                            value={produtoSelecionado && produtoSelecionado.categoria}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPut() }>Editar</button>{" "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar() }>Cancelar</button>
                </ModalFooter>
            </Modal>


            {/* Excluir Produto */}
            <Modal isOpen={modalExcluir}>
                <ModalHeader>Excluir Produto</ModalHeader>
                <ModalBody>
                    Deseja realmente excluir o produto: {produtoSelecionado && produtoSelecionado.nome} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => pedidoDelete() }>Confirmar</button>{" "}
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir() }>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>

        
    )
}

export default CrudProduto