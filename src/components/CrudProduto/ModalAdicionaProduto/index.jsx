import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import React, { useContext } from 'react';
import InputFormModal from '../InputFormModal';
import { ModalPropsContext } from '../../../context/ProdutoContext/ProdutoContext';


const ModalAdicionaProduto = ({ abrirFecharModalIncluir, modalIncluir }) => {
    const {
        baseUrl, 
        produtos,
        setProdutos, 
        produtoSelecionado, 
        handleChange, 
        setUpdateProdutos
    } = useContext(ModalPropsContext);

    const pedidoPost = async() => {
        delete produtoSelecionado.id;

        produtoSelecionado.preco = parseFloat(produtoSelecionado.preco);
        produtoSelecionado.quantidade = parseInt(produtoSelecionado.quantidade);

        await axios.post(baseUrl, produtoSelecionado)
        .then(response => {
            setProdutos([...produtos, response.data]);
            setUpdateProdutos(true);
            abrirFecharModalIncluir();
        }).catch(error => {
            console.error('Erro na solicitação:', error);
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
                    <button className="btn btn-primary" onClick={() => pedidoPost() }>Adicionar</button>{" "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir() }>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAdicionaProduto