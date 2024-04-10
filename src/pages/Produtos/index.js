import { Link } from 'react-router-dom'
import logo from '../../assets/logo-completa.png'
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Produtos() {
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState('');
    const [filtro, setFiltro] = useState([]);

    const [produtos, setProdutos] = useState([]);

    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }

    const searchProdutos = (searchValue) => {
        setSearchInput(searchValue);

        if (searchInput !== '') {

            const dadosFiltrados = produtos.filter((produto) => {
                return Object.values(produto.nome).join('').toLowerCase()
                    .includes(searchInput.toLowerCase())
            });
            setFiltro(dadosFiltrados);

        } else {
            setProdutos(produtos);
        }
    }

    useEffect(() => {
        api.get('api/Produto', authorization).then(
            response => { setProdutos(response.data); 
            }, token)
    })

    async function logout() {
        try {
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = '';
            navigate('/');
        } catch(error) {
            alert('Não foi possível fazer o logout' + error);
        } 
    }

    async function editProduto(id) {
        try {
            navigate(`/produto/novo/${id}`);

        } catch(error) {
            alert('Não foi possível editar o produto' + error);
        }
    }

    async function deleteProduto(id) {
        try {
            if (window.confirm('Deseja deletar o produto de id ' + id + '?')) {
                await api.delete(`api/produto/${id}`, authorization);
                setProdutos(produtos.filter(produto => produto.id !== id));
            }
        } catch(error) {
            alert('Não foi possível deletar produto')
        }
    }


    return (
        <div>
            <h2>Lista de Produtos</h2>
            <img src={ logo } />
            <Link className='button' to="/produto/novo/0">Novo produto</Link>

            <span>Bem-vindo <strong> {email} </strong> </span>
            <button onClick={logout}> Logout </button>

            <form>
                <input 
                    type='text' 
                    placeholder='Nome do produto' 
                    onChange={(e) => searchProdutos(e.target.value)}
                />
                {/*                 
                <button type='button'> Filtrar produto por nome </button>
                */}
            </form>

            <h2>Relação de produtos</h2>

            {searchInput.length > 1 ? (
                <div>
                    {filtro.map( produto => (
                        <div key={produto.id}>
                            <p>Nome: {produto.nome} </p>
                            <p>Preco: {produto.preco} </p>
                            <p>Quantidade: {produto.quantidade} </p>
                            <p>Cor: {produto.cor} </p>
                            <p>Categoria: {produto.categoria} </p>
                            <p>Descrição: {produto.descricao} </p>
        
                            <button type='button' onClick={() => editProduto(produto.id)}> Editar </button>
                            <button type='button'> Excluir </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    {produtos.map( produto => (
                        <div key={produto.id}>
                            <p>Nome: {produto.nome} </p>
                            <p>Preco: {produto.preco} </p>
                            <p>Quantidade: {produto.quantidade} </p>
                            <p>Cor: {produto.cor} </p>
                            <p>Categoria: {produto.categoria} </p>
                            <p>Descrição: {produto.descricao} </p>
        
                            <button type='button' onClick={() => editProduto(produto.id)}> Editar </button>
                            <button type='button' onClick={() => deleteProduto(produto.id)}> Excluir </button>
                        </div>
                    ))}
                </div>
            )}

            
            
        </div>
    )
}