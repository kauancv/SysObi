// src/pages/Ano/Ano.js

import React from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './Ano.css'; 

const Ano = () => {
  const navigate = useNavigate();
  const { nivel } = useParams();

  const handleAnoSelect = (ano) => {
    navigate(`/selecionar-fase/${nivel}/${ano}`);
  };

  const handleNavigateToPerfil = () => {
    navigate('/perfil');
  };

  const handleBack = () => {
    navigate('/selecionar-nivel'); 
  };

  return (
    <div className="container-ano">
      <header className="ano-header">
        <button onClick={handleBack} className="nav-button">
          <FaArrowLeft /> Voltar
        </button>
        <button onClick={handleNavigateToPerfil} className="nav-button">
          <FaCog />
        </button>
      </header>

      <div className="title-bar">
        <h1>SELECIONE O ANO</h1>
      </div>

      <main className="ano-main">
        <button onClick={() => handleAnoSelect(2021)} className="ano-button">2021</button>
        <button onClick={() => handleAnoSelect(2020)} className="ano-button">2020</button>
        <button onClick={() => handleAnoSelect(2019)} className="ano-button">2019</button>
        <button onClick={() => handleAnoSelect(2018)} className="ano-button">2018</button>
      </main>
    </div>
  );
};

export default Ano;