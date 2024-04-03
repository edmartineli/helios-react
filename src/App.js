import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PaginaInicial from './components/PaginaInicial';
import Eleicao from './components/Eleicao';
import EleicaoEleitores from './components/EleicaoEleitores';
import EleicaoQuestoes from './components/EleicaoQuestoes';
import EleicoesAdministradas from './components/EleicoesAdministradas';
import Usuarios from './components/Usuarios';
import Stats from './components/Stats';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Helios Voting</h1>

      <LoginForm setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>

      {loggedIn ? (
        <>
        <hr/>
        <BrowserRouter>
          <NavLink to="/">Página inicial</NavLink>
          &nbsp;&nbsp;&nbsp;
          <NavLink to="/stats">Administração</NavLink>
          &nbsp;&nbsp;&nbsp;
          <NavLink to="/user/list">Usuários Admin</NavLink>
          <hr/>
          <Routes>
            <Route path="/" element={<PaginaInicial/>} exact/>
            <Route path="/elections/:uuid/view" element={<Eleicao/>}/>
            <Route path="/elections/:uuid/voters/view" element={<EleicaoEleitores/>}/>
            <Route path="/elections/:uuid/questions" element={<EleicaoQuestoes/>}/>
            <Route path="/elections/administered" element={<EleicoesAdministradas/>}/>
            <Route path="/stats" element={<Stats/>}/>
            <Route path="/user/list" element={<Usuarios/>}/>
          </Routes>
        </BrowserRouter>
        <hr/>
        </>
      ) : (
        <>
          Não Autenticado    
        </>
      )}

    </div>
  );
}

export default App;
