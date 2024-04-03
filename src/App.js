import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PaginaInicial from './components/PaginaInicial';
import Eleicao from './components/Eleicao';
import EleicaoEleitores from './components/EleicaoEleitores';
import EleicaoQuestoes from './components/EleicaoQuestoes';

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
          <Routes>
            <Route path="/" element={<PaginaInicial/>} exact/>
            <Route path="/elections/:uuid/view" element={<Eleicao/>}/>
            <Route path="/elections/:uuid/voters/view" element={<EleicaoEleitores/>}/>
            <Route path="/elections/:uuid/questions" element={<EleicaoQuestoes/>}/>
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
