const ANav = ({ children }) => {
    return (
        <a className="hover:bg-green-200 hover:text-black p-2 rounded cursor-pointer">
            {children}
        </a>
    )
} 

export default ANav;