import React from "react";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>{task.name}</h5>
        <p>{task.description}</p>
        <p>
          <strong>Début :</strong> {task.startDate} <br />
          <strong>Fin :</strong> {task.endDate}
        </p>
        <button className="btn btn-dark btn-sm me-2" onClick={() => onEdit(task)}>
          Modifier
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
