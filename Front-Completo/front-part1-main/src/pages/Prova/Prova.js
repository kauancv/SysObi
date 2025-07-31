import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Prova.css';

const Prova = () => {
  const { nivel, ano, fase } = useParams();
  const navigate = useNavigate();

  const [questoes, setQuestoes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [respostaCorreta, setRespostaCorreta] = useState('');

  const [respostasDoUsuario, setRespostasDoUsuario] = useState({});

  useEffect(() => {
    const fetchQuestoes = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `http://localhost:5037/api/Question/filter?level=${nivel}&year=${ano}&phase=${fase}`;
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
          setQuestoes(response.data);
        } else {
          setError("Nenhuma questão encontrada para estes filtros.");
        }
      } catch (err) {
        setError("Falha ao carregar a prova. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestoes();
  }, [nivel, ano, fase]);

  const handleOpcaoSelect = (opcaoId) => {
    setOpcaoSelecionada(opcaoId);
  };

  const handleVerificarResposta = () => {
    if (opcaoSelecionada === null) {
      alert("Por favor, selecione uma opção.");
      return;
    }
    const questaoAtual = questoes[indiceAtual];
    if (opcaoSelecionada === questaoAtual.correctAnswer) {
      setFeedback('correto');
    } else {
      setFeedback('errado');
      const opcoesDaQuestao = [
        { id: 'A', texto: questaoAtual.optionA }, { id: 'B', texto: questaoAtual.optionB },
        { id: 'C', texto: questaoAtual.optionC }, { id: 'D', texto: questaoAtual.optionD },
        { id: 'E', texto: questaoAtual.optionE },
      ];
      const textoCorreto = opcoesDaQuestao.find(opt => opt.id === questaoAtual.correctAnswer)?.texto;
      setRespostaCorreta(textoCorreto || questaoAtual.correctAnswer);
    }
  };

  const handleProximaQuestao = () => {
    const questaoAtualId = questoes[indiceAtual].id;
    const novasRespostas = { ...respostasDoUsuario, [questaoAtualId]: opcaoSelecionada };
    setRespostasDoUsuario(novasRespostas);

    setFeedback(null);
    setOpcaoSelecionada(null);
    setRespostaCorreta('');

    if (indiceAtual < questoes.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      finalizarProva(novasRespostas);
    }
  };

  // ADICIONADO: Nova função para gerar o relatório detalhado
  const finalizarProva = (respostasFinais) => {
    const detalhesResultados = questoes.map((questao, index) => {
      const respostaUsuario = respostasFinais[questao.id];
      const ehCorreta = respostaUsuario === questao.correctAnswer;
      
      return {
        numero: index + 1,
        pergunta: questao.content, // O texto da pergunta
        suaResposta: respostaUsuario,
        respostaCorreta: questao.correctAnswer,
        acertou: ehCorreta
      };
    });

    const acertos = detalhesResultados.filter(r => r.acertou).length;

    const dadosParaResultado = {
      acertos: acertos,
      totalQuestoes: questoes.length,
      detalhes: detalhesResultados
    };
    
    navigate('/relatorio-questoes', { state: { relatorio: dadosParaResultado } });
  };


  if (loading) return <div className="status-container">Carregando prova...</div>;
  if (error) return <div className="status-container error">{error}</div>;
  if (questoes.length === 0) return <div className="status-container">Nenhuma questão disponível.</div>;

  const questaoAtual = questoes[indiceAtual];
  const opcoesDaQuestao = [
    { id: 'A', texto: questaoAtual.optionA }, { id: 'B', texto: questaoAtual.optionB },
    { id: 'C', texto: questaoAtual.optionC }, { id: 'D', texto: questaoAtual.optionD },
    { id: 'E', texto: questaoAtual.optionE },
  ].filter(opcao => opcao.texto != null);

  return (
    <div className="prova-container">
      <header className="prova-header">
        <button className="back-button" onClick={() => navigate(`/selecionar-fase/${nivel}/${ano}`)}>
          <FaArrowLeft /> Voltar
        </button>
        <div className="progresso-prova">
          Questão {indiceAtual + 1} de {questoes.length}
        </div>
      </header>

      <main className="prova-content">
        <div className="enunciado-geral">
          <p>{questaoAtual.statement.split('\n').map((linha, i) => <span key={i}>{linha}<br/></span>)}</p>
        </div>
        
        {questaoAtual.imageUrl && (
            <div className="imagem-container">
                <img src={questaoAtual.imageUrl} alt="Ilustração da questão" className="questao-imagem" />
            </div>
        )}
        
        <h2 className="pergunta-especifica">{questaoAtual.content}</h2>

        <div className="opcoes-lista">
          {opcoesDaQuestao.map((opcao) => (
            <div
              key={opcao.id}
              className={`
                opcao-item 
                ${opcaoSelecionada === opcao.id ? 'selecionada' : ''}
                ${feedback && opcao.id === questaoAtual.correctAnswer ? 'correta' : ''}
                ${feedback === 'errado' && opcaoSelecionada === opcao.id ? 'errada' : ''}
              `}
              onClick={() => !feedback && handleOpcaoSelect(opcao.id)}
            >
              <input type="radio" id={`opcao-${opcao.id}`} name={`questao-${questaoAtual.id}`} value={opcao.id} checked={opcaoSelecionada === opcao.id} readOnly />
              <label htmlFor={`opcao-${opcao.id}`}>{opcao.id}) {opcao.texto}</label>
            </div>
          ))}
        </div>

        {feedback && (
          <div className={`feedback-mensagem ${feedback}`}>
            {feedback === 'correto' ? 'Resposta Correta!' : `Incorreto! A resposta correta era: ${respostaCorreta}`}
          </div>
        )}

        <div className="prova-actions">
          {!feedback ? (
            <button className="avancar-button" onClick={handleVerificarResposta}>
              Verificar Resposta
            </button>
          ) : (
            <button className="avancar-button" onClick={handleProximaQuestao}>
              {indiceAtual === questoes.length - 1 ? 'Finalizar Prática' : 'Próxima Questão'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Prova;