import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import React from 'react';
import InputFormModal from '../InputFormModal';

const ModalAdicionaProduto = ({ 
        abrirFecharModalIncluir, 
        modalIncluir, 
        baseUrl, 
        setProdutos, 
        produtos, 
        produtoSelecionado,
        handleChange,
        setUpdateProdutos
    }) => {

    const pedidoPost = async() => {
        produtoSelecionado.preco = parseFloat(produtoSelecionado.preco);
        produtoSelecionado.quantidade = parseInt(produtoSelecionado.quantidade);

        await axios.post(baseUrl, produtoSelecionado)
        .then(response => {
            setProdutos([...produtos, response.data]);
            setUpdateProdutos(true);
            abrirFecharModalIncluir();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <Modal isOpen={modalIncluir}>
                <ModalHeader>Incluir Produto</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <InputFormModal handleChange={handleChange} label = "Nome: " name="nome" />
                        <InputFormModal handleChange={handleChange} label = "Descrição: " name="descricao" />
                        <InputFormModal handleChange={handleChange} label = "Preço: " name="preco" />
                        <InputFormModal handleChange={handleChange} label = "Cor: " name="cor" />
                        <InputFormModal handleChange={handleChange} label = "Quantidade: " name="quantidade" />
                        <InputFormModal handleChange={handleChange} label = "Categoria: " name="categoria" />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPost() }>Incluir</button>{" "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir() }>Excluir</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAdicionaProduto