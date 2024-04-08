import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function NovoProduto (){
    const navigate = useNavigate();

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [cor, setCor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');

    const {produtoId} = useParams();

    const token = localStorage.getItem('token');
    const authorization = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    useEffect(() => {
        if(produtoId === '0')
            return;
        else 
            loadProduto();
    }, produtoId)

    async function loadProduto() {
        try {
            const response = await api.get(`api/Produto/${produtoId}`, authorization);

            setId(response.data.id);
            setNome(response.data.nome);
            setQuantidade(response.data.quantidade);
            setPreco(response.data.preco);
            setCor(response.data.cor);
            setCategoria(response.data.categoria);
            setDescricao(response.data.descricao);

        } catch(error) {
            alert('Erro ao recuperar produtos' + error);
            navigate('/produtos');
        }
    }

    async function saveOrUpdate(event) {
        event.preventDefault();

        const data = {
            nome,
            quantidade,
            preco,
            cor,
            categoria,
            descricao
        }

        try {
            if(produtoId === '0') {
                await api.post('api/produto', data, authorization)
            } else {
                data.id = id;
                await api.put(`api/produto/${id}`, data, authorization)
            }
        } catch(error) {
            alert('Erro ao gravar produto' + error);
        }
        navigate('/produtos');
    }

    return(
        <div>
            <Link to="/produtos"> Retornar </Link>
            <h2>{produtoId === '0' ? 'Incluir novo produto' : 'Atualizar produto'}</h2>
            <form onSubmit={saveOrUpdate}>
                <input 
                    placeholder='Nome do produto' 
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <input 
                    placeholder='Quantidade' 
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                />
                <input 
                    placeholder='Preço' 
                    value={preco}
                    onChange={e => setPreco(e.target.value)}
                />
                <input 
                    placeholder='Cor' 
                    value={cor}
                    onChange={e => setCor(e.target.value)}
                />
                <input 
                    placeholder='Categoria' 
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                />
                <input 
                    placeholder='Descrição' 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                />

                <button type='submit'>
                    {produtoId === '0' ? 'Adicionar' : 'Atualizar produto'}
                </button>
            </form>
        </div>
    )
}

export default NovoProduto;