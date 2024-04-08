import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.png'
import React, { useState, useContext } from 'react';
import ModalAdicionaProduto from './ModalAdicionaProduto';
import ModalEditaProduto from './ModalEditaProduto';
import ModalExcluiProduto from './ModalExcluiProduto';
import { ModalPropsContext, ModalPropsProvider } from '../../context/ProdutoContext';

const CrudProduto = () => {
    const { produtos, setProdutoSelecionado } = useContext(ModalPropsContext);

    const [modalIncluir, setModalIncluir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    }

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirFecharModalExcluir = () => {
        setModalExcluir(!modalExcluir);
    }

    const selecionarProduto = (produto, opcao) => {
        setProdutoSelecionado(produto);
            (opcao==="Editar") ? 
                abrirFecharModalEditar() : abrirFecharModalExcluir();
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
            
            <ModalPropsProvider>
                <ModalAdicionaProduto abrirFecharModalIncluir={abrirFecharModalIncluir} modalIncluir = {modalIncluir} />
                <ModalEditaProduto abrirFecharModalEditar={abrirFecharModalEditar} modalEditar={modalEditar} />
                <ModalExcluiProduto abrirFecharModalExcluir={abrirFecharModalExcluir} modalExcluir={modalExcluir} />
            </ModalPropsProvider>

        </div>
    )
}

export default CrudProduto