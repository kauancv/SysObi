

import React from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './Fase.css';

const Fase = () => {
  const navigate = useNavigate();

  const { nivel, ano } = useParams();

  // Função para lidar com a seleção da fase
  const handleFaseSelect = (fase) => {
    navigate(`/prova/${nivel}/${ano}/${fase}`);
  };

  const handleNavigateToPerfil = () => {
    navigate('/perfil');
  };

  const handleBack = () => {
    navigate(`/selecionar-ano/${nivel}`);
  };

  return (
    <div className="container-fase">
      <header className="fase-header">
        <button onClick={handleBack} className="nav-button">
          <FaArrowLeft /> Voltar
        </button>
        <button onClick={handleNavigateToPerfil} className="nav-button">
          <FaCog />
        </button>
      </header>

      <div className="title-bar">
        <h1>ESCOLHA A FASE</h1>
      </div>

       <main className="fase-main">
    <button onClick={() => handleFaseSelect(3)} className="fase-button">FASE 3</button>
    <button onClick={() => handleFaseSelect(2)} className="fase-button">FASE 2</button>
    <button onClick={() => handleFaseSelect(1)} className="fase-button">FASE 1</button>
</main>
    </div>
  );
};

export default Fase;