import Dropdown from 'react-bootstrap/Dropdown';
import ANav from '../ANav';

const NavBar = () => {
    return (
        <nav className="flex space-x-4 text-gray-500">
                <ANav>Início</ANav>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <ANav>Categoria</ANav>  
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/roupas">Roupas</Dropdown.Item>
                        <Dropdown.Item href="#/eletrodomesticos">Eletrodomésticos</Dropdown.Item>
                        <Dropdown.Item href="#/eletronicos">Eletrônicos</Dropdown.Item>
                        <Dropdown.Item href="#/lazer">Lazer</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ANav>Em oferta</ANav>
                <ANav>Sobre nós</ANav>
                <ANav>Contato</ANav>
            </nav>
    )
}

export default NavBar;