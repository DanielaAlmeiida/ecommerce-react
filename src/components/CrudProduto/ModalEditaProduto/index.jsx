import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import React from 'react';
import InputFormModal from '../InputFormModal';


const ModalEditaProduto = ({ 
        abrirFecharModalEditar, 
        modalEditar, 
        baseUrl, 
        produtos, 
        produtoSelecionado,
        handleChange,
        setUpdateProdutos
    }) => {

    const pedidoPut = async() => {
        produtoSelecionado.preco = parseFloat(produtoSelecionado.preco);
        produtoSelecionado.quantidade = parseInt(produtoSelecionado.quantidade);

        console.log('PRODUTO EDITADO:', produtoSelecionado); 

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

    return (
        <div>
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
                    <button className="btn btn-primary" onClick={() => pedidoPut() }>Salvar edição</button>{" "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar() }>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalEditaProduto