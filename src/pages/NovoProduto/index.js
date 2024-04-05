import React from "react";
import { Link, useParams } from "react-router-dom";

function NovoProduto (){

    const {produtoId} = useParams();

    return(
        <div>
            <Link to="/produtos"> Retornar </Link>
            <h2>{produtoId === '0' ? 'Incluir novo produto' : 'Atualizar produto'}</h2>
            <form>
                <input placeholder='Nome do produto' />
                <input placeholder='Quantidade' />
                <input placeholder='Preço' />
                <input placeholder='Cor' />
                <input placeholder='Categoria' />
                <input placeholder='Descrição' />
                <button type='submit'>
                    {produtoId === '0' ? 'Adicionar' : 'Atualizar produto'}
                </button>
            </form>
        </div>
    )
}

export default NovoProduto;