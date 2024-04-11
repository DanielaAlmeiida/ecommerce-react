import logo from '../../assets/logo.png'
import NavBar from './NavBar';
import SearchBar from './SearchBar';


const Header = () => {
    return (
        <header className="flex flex-row justify-between items-center p-2 border-b-2 border-green-300">
            <div className="flex items-center gap-2">
                <img src={logo} className="w-20" />
                <p className="text-green-500 text-xl font-bold">PQÉ</p>
            </div>
            <NavBar />
            <SearchBar />
            <div>
                <p className="text-green-500">Login/Register</p>
            </div>
        </header>
    )
}

export default Header;