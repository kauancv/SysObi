import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const notificationTimer = useRef(null);

  const showNotification = (message, type) => {
    clearTimeout(notificationTimer.current);
    setNotification({ message, type });
    notificationTimer.current = setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 4000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(notificationTimer.current);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

 
    if (!name.trim() || !email || !password || !confirmPassword) {
      showNotification('Por favor, preencha todos os campos.', 'error');
      return;
    }

    if (password.length < 8) {
      showNotification('A senha deve ter no mínimo 8 caracteres.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showNotification('As senhas não coincidem!', 'error');
      return;
    }

    const userData = {
      name: name.trim(),
      email: email,
      password: password,
      role: '2',
    };

    try {
      await axios.post('http://localhost:5037/api/User', userData);
      showNotification('Cadastro realizado com sucesso!', 'success');

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao realizar o cadastro.';
      showNotification(errorMessage, 'error');
    }
  };

  return (
    <div className="cadastro-container">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <header className="cadastro-header">
        <button onClick={() => navigate('/login')} className="back-button">
          <FaArrowLeft /> Voltar
        </button>
        <div className="title-bar">
          <h1>CADASTRE-SE</h1>
        </div>
      </header>

      <main className="cadastro-main">
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="password-wrapper">
              <input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                placeholder="Mínimo de 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span onClick={() => setPasswordShown(!passwordShown)} className="password-toggle-icon">
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmar senha</label>
            <div className="password-wrapper">
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                id="confirm-password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={() => setConfirmPasswordShown(!confirmPasswordShown)} className="password-toggle-icon">
                {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>
        </form>
      </main>
    </div>
  );
};

export default Cadastro;