import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showImageUrl, setShowImageUrl] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const notificationTimer = useRef(null);


  const [formData, setFormData] = useState({
    Name: '',
    Statement: '',
    ImageUrl: '',
    Content: '',
    OptionA: '',
    OptionB: '',
    OptionC: '',
    OptionD: '',
    OptionE: '',
    CorrectAnswer: '', 
    Level: 'junior', 
    Year: '2021', 
    Phase: '1', 
    IsMultipleParts: false 
  });

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showNotification = (message, type) => {
    clearTimeout(notificationTimer.current);
    setNotification({ message, type });
    notificationTimer.current = setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 4000);
  };
  useEffect(() => {
      return () => clearTimeout(notificationTimer.current);
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name || !formData.Statement || !formData.Content || !formData.CorrectAnswer || !formData.OptionA) {
      showNotification('Preencha todos os campos obrigatórios!', 'error');
      return;
    }

    const token = localStorage.getItem('adminAuthToken');
    if (!token) {
        showNotification('Acesso negado. Faça login como administrador.', 'error');
        navigate('/admin-login');
        return;
    }

    try {
      await axios.post('http://localhost:5037/api/Question/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      showNotification('Questão cadastrada com sucesso!', 'success');

       setFormData({
        Name: '', Statement: '', ImageUrl: '', Content: '',
        OptionA: '', OptionB: '', OptionC: '', OptionD: '', OptionE: '',
        CorrectAnswer: '', Level: 'junior', Year: '2021', Phase: '1', IsMultipleParts: false
      });
      setShowImageUrl(false);
    } catch (error) {
      console.error("Erro ao cadastrar questão:", error);
      showNotification('Erro ao cadastrar a questão.', 'error');
    }
  };

  return (
    <div className="dashboard-container">
      {notification.message && (
          <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}
      <header className="dashboard-header">
        <h1>Painel do Administrador</h1>
        <button onClick={() => navigate('/login')} className="nav-button-dash">Voltar ao App</button>
      </header>

      <main className="dashboard-content">
        <form onSubmit={handleSubmit} className="form-questao">
          <h2>Cadastrar Nova Questão</h2>

          <div className="form-group">
            <label>Nome da Questão (ex: "Troco", "Quadrado Mágico")</label>
            <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label>Enunciado (A descrição geral do problema)</label>
            <textarea name="Statement" value={formData.Statement} onChange={handleChange} className="form-textarea" rows="5"></textarea>
          </div>

          <div className="form-group-checkbox">
            <input type="checkbox" id="show-image-url" checked={showImageUrl} onChange={(e) => setShowImageUrl(e.target.checked)} />
            <label htmlFor="show-image-url">A questão possui uma imagem no enunciado?</label>
          </div>

          {showImageUrl && (
            <div className="form-group">
              <label>URL da Imagem</label>
              <input type="text" name="ImageUrl" value={formData.ImageUrl} onChange={handleChange} className="form-input" placeholder="https://exemplo.com/imagem.png"/>
            </div>
          )}

          <div className="form-group">
            <label>Pergunta Específica (ex: "Qual o menor número de notas...")</label>
            <textarea name="Content" value={formData.Content} onChange={handleChange} className="form-textarea" rows="2"></textarea>
          </div>

          <div className="alternativas-container">
            <h3>Alternativas</h3>
            <div className="form-group-inline"><label>A)</label><input type="text" name="OptionA" value={formData.OptionA} onChange={handleChange}/></div>
            <div className="form-group-inline"><label>B)</label><input type="text" name="OptionB" value={formData.OptionB} onChange={handleChange}/></div>
            <div className="form-group-inline"><label>C)</label><input type="text" name="OptionC" value={formData.OptionC} onChange={handleChange}/></div>
            <div className="form-group-inline"><label>D)</label><input type="text" name="OptionD" value={formData.OptionD} onChange={handleChange}/></div>
            <div className="form-group-inline"><label>E)</label><input type="text" name="OptionE" value={formData.OptionE} onChange={handleChange}/></div>
          </div>
          
          <div className="form-group">
            <h3>Resposta Correta</h3>
            <div className="radio-group">
              {['A', 'B', 'C', 'D', 'E'].map(letra => (
                <label key={letra}>
                  <input type="radio" name="CorrectAnswer" value={letra} checked={formData.CorrectAnswer === letra} onChange={handleChange} />
                  {letra}
                </label>
              ))}
            </div>
          </div>
         
          <div className="filtros-container">
              <div className="form-group">
                <label>Nível</label>
                <select name="Level" value={formData.Level} onChange={handleChange} className="form-select">
                    <option value="junior">Júnior</option>
                    <option value="nivel-1">Nível 1</option>
                    <option value="nivel-2">Nível 2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ano</label>
                <select name="Year" value={formData.Year} onChange={handleChange} className="form-select">
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fase</label>
                <select name="Phase" value={formData.Phase} onChange={handleChange} className="form-select">
                    <option value="1">Fase 1</option>
                    <option value="2">Fase 2</option>
                    <option value="3">Fase 3</option>
                </select>
              </div>
          </div>


          <button type="submit" className="submit-button">Cadastrar Questão</button>
        </form>
      </main>
    </div>
  );
};

export default AdminDashboard;
