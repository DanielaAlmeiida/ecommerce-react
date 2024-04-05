export default function Login() {
    return (
        <div className="login-container">
            <h1>Login</h1>
            <section className="form">
                <form>
                    <input placeholder="email" />
                    <input placeholder="senha" />
                    <button className="button" type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}