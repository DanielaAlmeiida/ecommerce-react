import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();

        const data = {
            email, password
        }

        try {
            const response = await api.post('api/Account/LoginUser', data);
            
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            //navigate('/admin')
            navigate('/produtos');

        } catch(error) {
            alert('O login falhou' + error)
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <section className="form">
                <form onSubmit={login}>
                    <input 
                        placeholder="email" 
                        type="email"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                    <input 
                        placeholder="senha"
                        type="password"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}