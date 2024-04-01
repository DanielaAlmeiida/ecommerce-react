import 'bootstrap/dist/css/bootstrap.min.css';

const InputFormModal = ({ label, type = "text", name, handleChange, value }) => {

    return ( <>
            <label> {label} </label>
            <input 
                type={type} 
                className="form-control" 
                onChange={handleChange} 
                name={name}
                value={value}
            />
        </>
    )
}

export default InputFormModal