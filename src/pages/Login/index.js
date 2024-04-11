import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Header from '../../components/Header';

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
            //navigate('/produtos');
            navigate('/home');


        } catch(error) {
            alert('O login falhou' + error)
        }
    }

    return (
        <>
        {/* 
         <div className="login-container bg-purple-600" >
            <h1>Login</h1>
            <section className="form">
                <form onSubmit={login} className="flex flex-col">
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
                    <button className="button bg-green-500" type="submit">Login</button>
                </form>
            </section>
        </div>
*/}
        <Header />
            <div className="login-container flex flex-col items-center justify-center h-screen">
                <div className="h-2/4">
                    <Card border="success" style={{ width: '18rem' }}>
                        <Card.Header>Login</Card.Header>
                        <Card.Body className="form">
                            <Card.Title>Realize seu Login</Card.Title>
                            <Card.Text>
                                <form onSubmit={login} className="flex flex-col">
                                    <input 
                                        className="border-green-300"
                                        placeholder="email" 
                                        type="email"
                                        value={email}
                                        onChange={ e => setEmail(e.target.value) }
                                    />
                                    <input 
                                        className="border-green-300 bg-green-300"
                                        placeholder="senha"
                                        type="password"
                                        value={password}
                                        onChange={ e => setPassword(e.target.value) }
                                    />
                                    <button className="button bg-green-500 text-white" type="submit">Login</button>
                                </form>
                            </Card.Text>
                        </Card.Body>
                    </Card>    
                </div>
            </div>
        </>
       
    )
}