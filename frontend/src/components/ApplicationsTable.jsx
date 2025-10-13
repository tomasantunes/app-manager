import React, { useState } from "react";

const ApplicationsTable = ({ applications, openEditApp, deleteApp }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentApps = applications.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>URL</th>
            <th>Back-End Atualizado</th>
            <th>Front-End Atualizado</th>
            <th>Refatorizada</th>
            <th>Online</th>
            <th>Tem Tarefas</th>
            <th>Tem Repositório</th>
            <th>Tem Backup</th>
            <th>Tem Documentação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentApps.map((app) => (
            <tr key={app._id}>
              <td>{app.name}</td>
              <td>{app.url}</td>
              <td className={app.backend_updated ? "green-cell" : "red-cell"}>
                <b>{app.backend_updated ? "Sim" : "Não"}</b>
              </td>
              <td className={app.frontend_updated ? "green-cell" : "red-cell"}>
                <b>{app.frontend_updated ? "Sim" : "Não"}</b>
              </td>
              <td className={app.refactored ? "green-cell" : "red-cell"}>
                <b>{app.refactored ? "Sim" : "Não"}</b>
              </td>
              <td className={app.online ? "green-cell" : "red-cell"}>
                <b>{app.online ? "Sim" : "Não"}</b>
              </td>
              <td className={app.has_tasks ? "green-cell" : "red-cell"}>
                <b>{app.has_tasks ? "Sim" : "Não"}</b>
              </td>
              <td className={app.has_repo ? "green-cell" : "red-cell"}>
                <b>{app.has_repo ? "Sim" : "Não"}</b>
              </td>
              <td className={app.has_backup ? "green-cell" : "red-cell"}>
                <b>{app.has_backup ? "Sim" : "Não"}</b>
              </td>
              <td className={app.has_docs ? "green-cell" : "red-cell"}>
                <b>{app.has_docs ? "Sim" : "Não"}</b>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => openEditApp(app._id)}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteApp(app._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ← Anterior
          </button>

          <div>
            Página <b>{currentPage}</b> de <b>{totalPages}</b>
          </div>

          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
