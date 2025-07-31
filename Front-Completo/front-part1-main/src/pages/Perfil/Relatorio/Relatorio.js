// pages/Relatorio.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Relatorio.css'; 
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Relatorio() { 
    const [reportData, setReportData] = useState({
        totalQuestions: 0,
        totalCorrect: 0,
        totalIncorrect: 0
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchReport = async () => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError('ID do usuário não encontrado. Faça o login novamente.');
                return;
            }

            try {
                const url = `http://localhost:5037/api/quiz/report/${userId}`;
                const response = await axios.get(url);
                setReportData(response.data);
            } catch (err) {
                console.error("Erro ao buscar relatório:", err);
                setError('Não foi possível carregar o relatório.');
            }
        };

        fetchReport();
    }, []);

    const dadosRelatorio = [
        { label: 'Total de questões', value: reportData.totalQuestions },
        { label: 'Total de acertos', value: reportData.totalCorrect },
        { label: 'Total de erros', value: reportData.totalIncorrect }
    ];

    const handleVoltar = () => {
        navigate('/perfil'); 
    };
    
    if (error) {
        return (
            <div className="body-relatorio">
                <div className="titulo-container-r">
                    <div className="titulo-r">ERRO</div>
                </div>
                <div className="container-r">
                    <p className="relatorio-error">{error}</p>
                    <button className="voltar-r" onClick={handleVoltar} style={{marginTop: '20px'}}>
                        <FaArrowLeft /> Voltar para o Perfil
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="body-relatorio">
            
            <div className="header-superior-r">
                <button className="voltar-r" onClick={handleVoltar}>
                    <FaArrowLeft /> Voltar
                </button>
            </div>
                       
            <div className="titulo-container-r">
                <div className="titulo-r">RELATÓRIO</div>
            </div>

            <div className="container-r">
                {dadosRelatorio.map((item, index) => (
                    <div className="relatorio-item" key={index}>
                        <span className="relatorio-label">{item.label}</span>
                        <span className="relatorio-value">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}