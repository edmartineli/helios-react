import React, {useState} from "react"
import api from "../services/api"

function LoginForm({setLoggedIn, loggedIn}) {
    const [username, setUsername] = useState('admin@admin.com');
    const [password, setPassword] = useState('admin');
    const [erro, setErro] = useState('');
  
    const handleLogin = async () => {
      try {
        await api.post("/auth/password/login",
            {
              'api_json':true,
              'username':username,
              'password':password
            },
            {
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        ).then(({data}) => {
          if (data.login)
            setLoggedIn(true);
          else
            setErro('Login ou senha incorreto')
        })
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in');
      }
    }

    const handleLogout = () => {
      setLoggedIn(false);
      setUsername('');
      setPassword('');
      api.get("/auth/logout")
    };
  
    return (
      <>
      {loggedIn ? (
        <div>
          Autenticado como, {username}!
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>
          {erro}
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        </div>
      )}
      </>
    )
}

export default LoginForm