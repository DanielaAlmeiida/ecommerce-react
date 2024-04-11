import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
    return (
        <div className="flex gap-2 items-center">
            <input 
                className="border-2 border-green-300 rounded"
                type="text"
                placeholder="O que você procura?"
            ></input>
                {/* onChange={(evento) => { setFiltro(evento.target.value) }}  */}
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#63E6BE",}} />
        </div>
    )
}

export default SearchBar;