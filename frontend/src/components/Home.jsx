import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import axios from 'axios';

export default function Home() {
  const [appStats, setAppStats] = useState(null);

  const fetchAppStats = async () => {
    try {
      const response = await axios.get('/get-app-numbers');
      setAppStats(response.data.data);
    } catch (error) {
      console.error('Error fetching app stats:', error);
    }
  };

  useEffect(() => {
    fetchAppStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Estatísticas</h2>
        {appStats ? (
          <>
            <p><b>Total de Aplicações:</b> {appStats.totalApps}</p>
            <p><b>Aplicações Conformes:</b> {appStats.compliantApps}</p>
            <p><b>Aplicações com Backend Desatualizado:</b> {appStats.backendOutdatedApps}</p>
            <p><b>Aplicações com Frontend Desatualizado:</b> {appStats.frontendOutdatedApps}</p>
            <p><b>Aplicações Offline:</b> {appStats.offlineApps}</p>
            <p><b>Aplicações sem Repositório:</b> {appStats.noRepoApps}</p>
            <p><b>Aplicações sem Backup:</b> {appStats.noBackupApps}</p>
            <p><b>Aplicações sem Documentação:</b> {appStats.noDocsApps}</p>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  )
}