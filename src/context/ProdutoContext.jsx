import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';


export const ModalPropsContext = createContext();

export const ModalPropsProvider = ({ children }) => {
    const baseUrl = "https://localhost:7229/api/Produto";

    const [produtos, setProdutos] = useState([]);
    const [updateProdutos, setUpdateProdutos] = useState(true);

    useEffect(() => {
        if (updateProdutos) {
            pedidoGet();
            setUpdateProdutos(false);
        }
    }, [updateProdutos]);

    const pedidoGet = async () => {
        await axios.get(baseUrl)
        .then(response => {
            setProdutos(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const [produtoSelecionado, setProdutoSelecionado] = useState({
        id: '',
        nome: '',
        preco: '',
        quantidade: '',
        categoria:'',
        cor: '',
        descricao: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setProdutoSelecionado({
            ...produtoSelecionado, [name]:value
        });
    }

    return (
        <ModalPropsContext.Provider value={{ 
            baseUrl, 
            produtos,
            setProdutos, 
            produtoSelecionado, 
            setProdutoSelecionado,
            handleChange, 
            setUpdateProdutos
        }}>
            {children}
        </ModalPropsContext.Provider>
    );
};
