// pages/Profile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import './Perfil.css';


export default function Perfil() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError('');
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('authToken');
                if (!token || !userId) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get(
                    `http://localhost:5037/api/User/${userId}`,
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );
                setUser({
                    name: response.data.name,
                    email: response.data.email
                });
            } catch (err) {
                console.error(err);
                setError('Erro ao buscar usuário');
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.clear();
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]); 

   

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        // Navega para a rota de login
        navigate('/login');
    };

    const goToChangeName = () => navigate('/perfil/alterar-nome');
    const goToChangePassword = () => navigate('/perfil/alterar-senha');
    const goToReport = () => navigate('/perfil/relatorio');
    
    const handleBack = () => navigate('/selecionar-nivel');

    return (
        <div className="body">
            <div className="header-superior">
                <button className="voltar" onClick={handleBack}>
                    <FaArrowLeft /> Voltar
                </button>
            </div>

            <div className="titulo-container">
                <div className="titulo">PERFIL</div>
            </div>
            
            <div className="container">
                {loading ? (
                    <div>Carregando...</div>
                ) : error ? (
                    <div className="mensagem-erro">{error}</div>
                ) : (
                    <>
                        <div className="nome">{user.name}</div>
                        <div className="email">{user.email}</div>
                        <div className="botoes">
                            <button onClick={goToChangeName}>Alterar nome</button>
                            <button onClick={goToChangePassword}>Alterar senha</button>
                            <button onClick={goToReport}>Relatório</button>
                            <button onClick={handleLogout} className="botao-sair">Sair</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}