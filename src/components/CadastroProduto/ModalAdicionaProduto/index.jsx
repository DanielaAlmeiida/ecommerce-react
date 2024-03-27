import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import React, { useState } from 'react';

const ModalAdicionaProduto = ({ abrirFecharModalIncluir, modalIncluir, baseUrl, setProduto, produtos }) => {
    const [produtoSelecionado, setProdutoSelecionado] = useState({
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

    const pedidoPost = async() => {
        produtoSelecionado.preco = parseFloat(produtoSelecionado.preco);
        produtoSelecionado.quantidade = parseInt(produtoSelecionado.quantidade);

        await axios.post(baseUrl, produtoSelecionado)
        .then(response => {
            setProduto([...produtos, response.data]);
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
                        <label>Nome: </label>
                        <input type="text" className="form-control" onChange={handleChange} name="nome"/>
                        <label>Descrição: </label>
                        <input type="text" className="form-control" onChange={handleChange} name="descricao"/>
                        <label>Preço: </label>
                        <input type="text" className="form-control" onChange={handleChange} name="preco"/>
                        <label>Cor: </label>
                        <input type="text" className="form-control" onChange={handleChange} name="cor"/>
                        <label>Quantidade: </label>
                        <input type="text" className="form-control" onChange={handleChange} name="quantidade"/>
                        <label>Categoria: </label>
                        <input type="text" className="form-control" onChange={handleChange} name="categoria"/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPost() }>Incluir</button>{" "}
                    <button className="btn btn-danger" onClick={() => {abrirFecharModalIncluir} }>Excluir</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalAdicionaProduto