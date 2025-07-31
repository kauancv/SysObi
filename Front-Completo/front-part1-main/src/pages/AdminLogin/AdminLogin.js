import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import logo from '../Login/obi-simulator-logo.png'; 
import { jwtDecode } from 'jwt-decode';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleAdminLogin = async (event) => {
    event.preventDefault();
    setError('');
    if (!email || !senha) {
      setError('PREENCHA OS CAMPOS DE E-MAIL E SENHA!');
      return;
    }
    setLoading(true);

    try {
      // Usando o endpoint de login. 
      const response = await axios.post(
        'http://localhost:5037/Login/login', 
        {
          Email: email,
          Password: senha, 
        }
      );

      const { token } = response.data;
      const decoded = jwtDecode(token);

      if (decoded.role === 'Admin') {
        // Se for Admin, continua o fluxo normal
        const adminId = decoded.nameid || decoded.id; 
        localStorage.setItem('adminAuthToken', token);
        localStorage.setItem('adminId', adminId);

        navigate('/admin/dashboard'); 
      } else {
        // Se NÃO for Admin, bloqueia o acesso e mostra um erro
        setError('Acesso negado. Esta área é restrita para administradores.');
      }
      // ===============================================

    } catch (err) {
      console.error('Erro no login de admin:', err);
      setError('CREDENCIAS DE ADMINISTRADOR INVÁLIDAS');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <header className="admin-login-header">
        <button onClick={() => navigate('/login')} className="back-button">
            <FaArrowLeft /> Voltar para Login Principal
        </button>
      </header>

      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="OBI Simulator Logo" className="logo" />
          <h1 className="admin-title">LOGIN ADMINISTRATIVO</h1>
        </div>
        <form className="login-form" onSubmit={handleAdminLogin}>
          <div className="input-group">
            <label htmlFor="email">E-mail de Administrador</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="password-wrapper">
              <input
                type={passwordShown ? 'text' : 'password'}
                id="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={loading}
              />
              <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                {passwordShown ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;