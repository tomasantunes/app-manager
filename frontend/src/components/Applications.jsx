import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import ApplicationsTable from "./ApplicationsTable";
import axios from 'axios';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [newAppName, setNewAppName] = useState('');
  const [newAppURL, setNewAppURL] = useState('');
  const [newAppServer, setNewAppServer] = useState('');
  const [newAppPort, setNewAppPort] = useState('');
  const [newAppManager, setNewAppManager] = useState('');
  const [newAppTech, setNewAppTech] = useState('');
  const [newAppStack, setNewAppStack] = useState('');
  const [newAppBackendUpdated, setNewAppBackendUpdated] = useState(false);
  const [newAppFrontendUpdated, setNewAppFrontendUpdated] = useState(false);
  const [newAppRefactored, setNewAppRefactored] = useState(false);
  const [newAppOnline, setNewAppOnline] = useState(false);
  const [newAppHasTasks, setNewAppHasTasks] = useState(false);
  const [newAppHasRepo, setNewAppHasRepo] = useState(false);
  const [newAppHasBackup, setNewAppHasBackup] = useState(false);
  const [newAppHasDocs, setNewAppHasDocs] = useState(false);
  const [newAppNotes, setNewAppNotes] = useState('');
  const [editAppId, setEditAppId] = useState(null);
  const [editAppName, setEditAppName] = useState('');
  const [editAppURL, setEditAppURL] = useState('');
  const [editAppServer, setEditAppServer] = useState('');
  const [editAppPort, setEditAppPort] = useState('');
  const [editAppManager, setEditAppManager] = useState('');
  const [editAppTech, setEditAppTech] = useState('');
  const [editAppStack, setEditAppStack] = useState('');
  const [editAppBackendUpdated, setEditAppBackendUpdated] = useState(false);
  const [editAppFrontendUpdated, setEditAppFrontendUpdated] = useState(false);
  const [editAppRefactored, setEditAppRefactored] = useState(false);
  const [editAppOnline, setEditAppOnline] = useState(false);
  const [editAppHasTasks, setEditAppHasTasks] = useState(false);
  const [editAppHasRepo, setEditAppHasRepo] = useState(false);
  const [editAppHasBackup, setEditAppHasBackup] = useState(false);
  const [editAppHasDocs, setEditAppHasDocs] = useState(false);
  const [editAppNotes, setEditAppNotes] = useState('');

  function loadApplications() {
    axios.get('/get-applications')
    .then(response => {
      setApplications(response.data.data);
    })
    .catch(error => {
      console.error("Error fetching applications:", error);
    });
  }

  function addApplication() {
    const newApp = {
      name: newAppName,
      url: newAppURL,
      server: newAppServer,
      port: newAppPort,
      manager: newAppManager,
      tech: newAppTech,
      stack: newAppStack,
      backend_updated: newAppBackendUpdated,
      frontend_updated: newAppFrontendUpdated,
      refactored: newAppRefactored,
      online: newAppOnline,
      has_tasks: newAppHasTasks,
      has_repo: newAppHasRepo,
      has_backup: newAppHasBackup,
      has_docs: newAppHasDocs,
      notes: newAppNotes
    };

    axios.post('/add-application', newApp)
    .then(response => {
      alert("Application added successfully.");
      setNewAppName('');
      setNewAppURL('');
      setNewAppServer('');
      setNewAppPort('');
      setNewAppManager('');
      setNewAppTech('');
      setNewAppStack('');
      setNewAppBackendUpdated(false);
      setNewAppFrontendUpdated(false);
      setNewAppRefactored(false);
      setNewAppOnline(false);
      setNewAppHasTasks(false);
      setNewAppHasRepo(false);
      setNewAppHasBackup(false);
      setNewAppHasDocs(false);
      setNewAppNotes('');
      loadApplications();
    })
    .catch(error => {
      alert("Error adding application: " + error);
    });
  }

  function openEditApp(id) {
    const appToEdit = applications.find(app => app._id === id);
    if(appToEdit) {
      setEditAppId(appToEdit._id);
      setEditAppName(appToEdit.name);
      setEditAppURL(appToEdit.url);
      setEditAppServer(appToEdit.server);
      setEditAppPort(appToEdit.port);
      setEditAppManager(appToEdit.manager);
      setEditAppTech(appToEdit.tech);
      setEditAppStack(appToEdit.stack);
      setEditAppBackendUpdated(appToEdit.backend_updated);
      setEditAppFrontendUpdated(appToEdit.frontend_updated);
      setEditAppRefactored(appToEdit.refactored);
      setEditAppOnline(appToEdit.online);
      setEditAppHasTasks(appToEdit.has_tasks);
      setEditAppHasRepo(appToEdit.has_repo);
      setEditAppHasBackup(appToEdit.has_backup);
      setEditAppHasDocs(appToEdit.has_docs);
      setEditAppNotes(appToEdit.notes);
      var myModal = new window.bootstrap.Modal(document.querySelector('.editAppModal'));
      myModal.show();
    }
  }

  function closeEditApp() {
    var myModalEl = document.querySelector('.editAppModal');
    var modal = window.bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

  function deleteApp(id) {
    if(window.confirm("Tem a certeza que deseja remover esta aplicação?")) {
      axios.post("/delete-application", {id: id})
      .then(response => {
        alert("Aplicação removida com sucesso.");
        loadApplications();
      })
      .catch(error => {
        alert("Erro ao remover aplicação: " + error);
      });
    }
  }

  function saveApp() {
    const updatedData = {
      name: editAppName,
      url: editAppURL,
      server: editAppServer,
      port: editAppPort,
      manager: editAppManager,
      tech: editAppTech,
      stack: editAppStack,
      backend_updated: editAppBackendUpdated,
      frontend_updated: editAppFrontendUpdated,
      refactored: editAppRefactored,
      online: editAppOnline,
      has_tasks: editAppHasTasks,
      has_repo: editAppHasRepo,
      has_backup: editAppHasBackup,
      has_docs: editAppHasDocs,
      notes: editAppNotes
    };

    axios.post("/update-application", { id: editAppId, updatedData: updatedData })
    .then(response => {
      alert("Aplicação atualizada com sucesso.");
      closeEditApp();
      loadApplications();
    })
    .catch(error => {
      alert("Erro ao atualizar aplicação: " + error);
    });
  }

  useEffect(() => {
    loadApplications();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row  mb-4">
          <h2 className="my-4">Aplicações</h2>
          <ApplicationsTable applications={applications} openEditApp={openEditApp} deleteApp={deleteApp} />
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="application-form">
              <h3>Adicionar Aplicação</h3>
              <div className="form-group mb-2">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" value={newAppName} onChange={e => setNewAppName(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">URL</label>
                <input type="text" className="form-control" value={newAppURL} onChange={e => setNewAppURL(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Servidor</label>
                <input type="text" className="form-control" value={newAppServer} onChange={e => setNewAppServer(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Port</label>
                <input type="text" className="form-control" value={newAppPort} onChange={e => setNewAppPort(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Gestor</label>
                <input type="text" className="form-control" value={newAppManager} onChange={e => setNewAppManager(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Técnico</label>
                <input type="text" className="form-control" value={newAppTech} onChange={e => setNewAppTech(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Stack</label>
                <textarea className="form-control" rows="3" value={newAppStack} onChange={e => setNewAppStack(e.target.value)}></textarea>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppBackendUpdated} onChange={e => setNewAppBackendUpdated(e.target.checked)} />
                <label className="form-label">Back-End Atualizado</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppFrontendUpdated} onChange={e => setNewAppFrontendUpdated(e.target.checked)} />
                <label className="form-label">Front-End Atualizado</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppRefactored} onChange={e => setNewAppRefactored(e.target.checked)} />
                <label className="form-label">Refatorizada</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppOnline} onChange={e => setNewAppOnline(e.target.checked)} />
                <label className="form-label">Online</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppHasTasks} onChange={e => setNewAppHasTasks(e.target.checked)} />
                <label className="form-label">Tem Tarefas</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppHasRepo} onChange={e => setNewAppHasRepo(e.target.checked)} />
                <label className="form-label">Tem Repositório</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppHasBackup} onChange={e => setNewAppHasBackup(e.target.checked)} />
                <label className="form-label">Tem Backup</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={newAppHasDocs} onChange={e => setNewAppHasDocs(e.target.checked)} />
                <label className="form-label">Tem Documentação</label>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Observações</label>
                <textarea className="form-control" rows="3" value={newAppNotes} onChange={e => setNewAppNotes(e.target.value)}></textarea>
              </div>
              <div className="text-end">
                <button className="btn btn-primary" onClick={addApplication}>Submeter</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade editAppModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Aplicação</h5>
              <button type="button" className="btn-close" onClick={closeEditApp} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-2">
                <label className="form-label">Nome</label>
                <input type="text" className="form-control" value={editAppName} onChange={e => setEditAppName(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">URL</label>
                <input type="text" className="form-control" value={editAppURL} onChange={e => setEditAppURL(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Servidor</label>
                <input type="text" className="form-control" value={editAppServer} onChange={e => setEditAppServer(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Port</label>
                <input type="text" className="form-control" value={editAppPort} onChange={e => setEditAppPort(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Gestor</label>
                <input type="text" className="form-control" value={editAppManager} onChange={e => setEditAppManager(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Técnico</label>
                <input type="text" className="form-control" value={editAppTech} onChange={e => setEditAppTech(e.target.value)} />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Stack</label>
                <textarea className="form-control" rows="3" value={editAppStack} onChange={e => setEditAppStack(e.target.value)}></textarea>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppBackendUpdated} onChange={e => setEditAppBackendUpdated(e.target.checked)} />
                <label className="form-label">Back-End Atualizado</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppFrontendUpdated} onChange={e => setEditAppFrontendUpdated(e.target.checked)} />
                <label className="form-label">Front-End Atualizado</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppRefactored} onChange={e => setEditAppRefactored(e.target.checked)} />
                <label className="form-label">Refatorizada</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppOnline} onChange={e => setEditAppOnline(e.target.checked)} />
                <label className="form-label">Online</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppHasTasks} onChange={e => setEditAppHasTasks(e.target.checked)} />
                <label className="form-label">Tem Tarefas</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppHasRepo} onChange={e => setEditAppHasRepo(e.target.checked)} />
                <label className="form-label">Tem Repositório</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppHasBackup} onChange={e => setEditAppHasBackup(e.target.checked)} />
                <label className="form-label">Tem Backup</label>
              </div>
              <div className="form-group mb-2">
                <input type="checkbox" checked={editAppHasDocs} onChange={e => setEditAppHasDocs(e.target.checked)} />
                <label className="form-label">Tem Documentação</label>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Observações</label>
                <textarea className="form-control" rows="3" value={editAppNotes} onChange={e => setEditAppNotes(e.target.value)}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeEditApp}>Fechar</button>
              <button type="button" className="btn btn-primary" onClick={saveApp}>Gravar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}