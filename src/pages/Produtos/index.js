import { Link } from 'react-router-dom'
import logo from '../../assets/logo-completa.png'

export default function Produtos() {
    return (
        <div>
            <h2>Lista de Produtos</h2>
            <img src={ logo } />
            <Link className='button' to="/produto/novo/0">Novo produto</Link>

            <span>Bem-vindo <strong> Nome </strong> </span>
            <form>
                <input type='text' placeholder='Nome do produto' />
                <button type='button'> Filtrar produto por nome </button>
            </form>

            <h2>Relação de produtos</h2>
            <div>
                <p>Nome: </p>
                <p>Preco: </p>
                <p>Quantidade: </p>
                <p>Cor: </p>
                <p>Categoria: </p>
                <p>Descrição: </p>
            </div>
        </div>
    )
}