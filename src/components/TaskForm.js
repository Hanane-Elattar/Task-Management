import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../redux/actions";

export default function TaskForm({ existingTask, onSave }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState(
    existingTask || { id: Date.now(), name: "", description: "", status: "TODO", startDate: "", endDate: "" }
  );

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask(task));
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
      <h5>{existingTask ? "Modifier une tâche" : "Ajouter une tâche"}</h5>
      <div className="mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          value={task.name}
          onChange={handleChange}
          placeholder="Nom de tâche"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          name="description"
          className="form-control"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
      </div>
      <div className="mb-3">
        <select name="status" className="form-select" value={task.status} onChange={handleChange}>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Date de début</label>
        <input
          type="date"
          name="startDate"
          className="form-control"
          value={task.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Date de fin</label>
        <input
          type="date"
          name="endDate"
          className="form-control"
          value={task.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-dark w-100">{existingTask ? "Modifier" : "Ajouter"}</button>
    </form>
  );
}
