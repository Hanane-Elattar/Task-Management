import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onEdit, onDelete }) {
  const statuses = [
    { name: "TODO", color: "bg-warning text-white" },
    { name: "IN_PROGRESS", color: "bg-danger text-white" },
    { name: "DONE", color: "bg-success text-white" },
  ];

  return (
    <div className="row">
      {statuses.map((status) => (
        <div key={status.name} className="col-md-4">
          <br />
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
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
