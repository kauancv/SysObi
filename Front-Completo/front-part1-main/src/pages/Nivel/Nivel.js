// src/pages/Nivel/Nivel.js

import React from 'react';
import { FaCog } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';
import './Nivel.css';

const Nivel = () => {
  const navigate = useNavigate();

  const handleNivelSelect = (nivelUrl) => {
    navigate(`/selecionar-ano/${nivelUrl}`);
  };

  const handleNavigateToPerfil = () => {
    navigate('/perfil');
  };


  return (
    <div className="container-nivel">
      <header className="nivel-header">
        <button onClick={handleNavigateToPerfil} className="nav-button">
          <FaCog />
        </button>
      </header>

      <div className="title-bar">
        <h1>SELECIONE O NÍVEL</h1>
      </div>

      <main className="nivel-main">
        <button onClick={() => handleNivelSelect('nivel-2')} className="nivel-button">Nível 2</button>
        <button onClick={() => handleNivelSelect('nivel-1')} className="nivel-button">Nível 1</button>
        <button onClick={() => handleNivelSelect('junior')} className="nivel-button">Nível Júnior</button>
      </main>
    </div>
  );
};

export default Nivel;