import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Nivel from './pages/Nivel/Nivel';
import Ano from './pages/Ano/Ano';
import Fase from './pages/Fase/Fase';
import Prova from './pages/Prova/Prova';
import Perfil from './pages/Perfil/Perfil';
import AlterarNome from './pages/Perfil/AlterarNome/AlterarNome';
import AlterarSenha from './pages/Perfil/AlterarSenha/AlterarSenha';
import Relatorio from './pages/Perfil/Relatorio/Relatorio';
import RelatorioQuestoes from './pages/RelatorioQuestoes/RelatorioQuestoes';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'; 

function App() {
  return (
    <div className="App">
      <Routes>
        {/* === Rotas de Autenticação e Acesso Inicial === */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* === Fluxo Principal do Quiz (Seleção de Prova) === */}
        <Route path="/selecionar-nivel" element={<Nivel />} />
        <Route path="/selecionar-ano/:nivel" element={<Ano />} />
        <Route path="/selecionar-fase/:nivel/:ano" element={<Fase />} />
        <Route path="/prova/:nivel/:ano/:fase" element={<Prova />} />
        
        {/* Rota para a tela de resultado após a prova */}
        <Route path="/relatorio-questoes" element={<RelatorioQuestoes />} />

        {/* === Rotas do Perfil do Usuário === */}
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/alterar-nome" element={<AlterarNome />} />
        <Route path="/perfil/alterar-senha" element={<AlterarSenha />} />
        <Route path="/perfil/relatorio" element={<Relatorio />} />

        {/* === Rotas da Área Administrativa === */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
