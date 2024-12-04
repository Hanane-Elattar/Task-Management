import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, changeTaskStatus } from "../redux/actions";
import './style.css';

const TaskManager = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const columns = useSelector((state) => state.columns);
  const dispatch = useDispatch();


  const handleFormChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };


  const handleFormSubmit = () => {
    if (newTask.name && newTask.description && newTask.startDate) {
      dispatch(addTask(currentColumn, { ...newTask, id: Date.now() }));
      setNewTask({ name: "", description: "", startDate: "", endDate: "" });
      setIsFormOpen(false);
    } else {
      alert("Veuillez remplir tous les champs obligatoires !");
    }
  };


  const getNextColumn = (currentColumn) => {
    switch (currentColumn) {
      case "To Do":
        return "In Progress";
      case "In Progress":
        return "Completed";
      default:
        return null;
    }
  };


  const handleChangeTaskStatus = (fromColumn, taskId) => {
    const toColumn = getNextColumn(fromColumn);
    if (toColumn) {
      console.log(`Changing status of task ${taskId} from ${fromColumn} to ${toColumn}`);
      dispatch(changeTaskStatus(fromColumn, toColumn, taskId));
    }
  };

  return (
    <div className="container">
  {Object.keys(columns).map((column) => (
    <div key={column} className="column">
      <h3>{column}</h3>
      <button
        className="add-task-btn"
        onClick={() => {
          setCurrentColumn(column);
          setIsFormOpen(true);
        }}
      >
        Ajouter +
      </button>
      <ul>
        {columns[column].map((task) => (
          <li key={task.id} className="task">
            <p>{task.name}</p>
            <p>{task.description}</p>
            <p>
              {task.startDate} - {task.endDate || "Pas de date de fin"}
            </p>
            <button
              onClick={() => handleChangeTaskStatus(column, task.id)}
              disabled={column === "Completed"}
            >
              Changer statut
            </button>
          </li>
        ))}
      </ul>
    </div>
  ))}

      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <h3>Ajouter une tâche</h3>
          <form>
            <div>
              <label>Nom de la tâche :</label>
              <input
                type="text"
                name="name"
                value={newTask.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Description :</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleFormChange}
                required
              ></textarea>
            </div>
            <div>
              <label>Date de début :</label>
              <input
                type="date"
                name="startDate"
                value={newTask.startDate}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Date de fin :</label>
              <input
                type="date"
                name="endDate"
                value={newTask.endDate}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <button type="button" onClick={handleFormSubmit}>
                Ajouter
              </button>
              <button type="button" onClick={() => setIsFormOpen(false)}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {isFormOpen && (
        <div
          onClick={() => setIsFormOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        ></div>
      )}
    </div>
  );
};

export default TaskManager;
