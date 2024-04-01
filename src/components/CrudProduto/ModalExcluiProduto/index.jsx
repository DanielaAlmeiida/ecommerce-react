import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import React from 'react';


const ModalExcluiProduto = ({ 
        abrirFecharModalExcluir, 
        modalExcluir, 
        baseUrl, 
        produtos, 
        produtoSelecionado,
        setUpdateProdutos,
        setProdutos
    }) => {

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

export default ModalExcluiProduto