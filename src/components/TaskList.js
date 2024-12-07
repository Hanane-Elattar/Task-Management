import React, { useState } from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({
    id: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "TODO", 
  });

  const handleEdit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleChangeStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const nextStatus =
            task.status === "TODO"
              ? "IN_PROGRESS"
              : task.status === "IN_PROGRESS"
              ? "DONE"
              : "TODO";
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };

  const handleAddTask = () => {
    if (!newTask.name || !newTask.description) {
      alert("Please fill out all fields!");
      return;
    }
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: Date.now().toString() }, 
    ]);
    setNewTask({
      id: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "TODO",
    }); 
  };

  const statuses = [
    { name: "TODO", color: "bg-warning text-white" },
    { name: "IN_PROGRESS", color: "bg-danger text-white" },
    { name: "DONE", color: "bg-success text-white" },
  ];

  return (
    <div>
      
      <div className="mb-4">
        <h5>Ajouter une tâche</h5>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={newTask.startDate}
              onChange={(e) =>
                setNewTask({ ...newTask, startDate: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={newTask.endDate}
              onChange={(e) =>
                setNewTask({ ...newTask, endDate: e.target.value })
              }
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-dark w-100" onClick={handleAddTask}>
              Ajouter
            </button>
          </div>
        </div>
      </div>

      
      <div className="row">
        {statuses.map((status) => (
          <div key={status.name} className="col-md-4">
            <div className={`card shadow-sm mb-4`}>
              <div className={`card-header ${status.color} text-uppercase`}>
                {status.name.replace("_", " ")}
              </div>
              <div className="card-body">
                {tasks
                  .filter((task) => task.status === status.name)
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onChangeStatus={handleChangeStatus}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
