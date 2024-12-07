import React, { useState } from "react"; 

export default function TaskCard({ task, onEdit, onDelete, onChangeStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const saveEdit = () => {
    if (editedTask.name.trim() === "") {
      alert("Le nom de la tâche est obligatoire.");
      return;
    }
    onEdit(editedTask);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedTask({ ...task }); 
    setIsEditing(false);
  };

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body">
        {isEditing ? (
          <>
            
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Nom de la tâche"
              required
            />

            
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleInputChange}
              className="form-control mb-2"
              placeholder="Description"
            ></textarea>

            
            <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>
              Sauvegarder
            </button>
            <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
              Annuler
            </button>
          </>
        ) : (
          <>
            
            <h5 className="card-title">{task.name}</h5>
            <p className="card-text">{task.description || "Pas de description"}</p>
            <p className="card-text">
              <strong>Début :</strong> {task.startDate || "Non spécifiée"} <br />
              <strong>Fin :</strong> {task.endDate || "Non spécifiée"}
            </p>

            
            <button
              className="btn btn-dark btn-sm me-2"
              onClick={() => setIsEditing(true)}
            >
              Modifier
            </button>
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => onDelete(task.id)}
            >
              Supprimer
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onChangeStatus(task.id)}
            >
              Changer Statut
            </button>
          </>
        )}
      </div>
    </div>
  );
}
