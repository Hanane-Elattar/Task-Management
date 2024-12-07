import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { deleteTask } from "./redux/actions";
import './App.css';

export default function App() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div>
      <Navbar />
      <div className="container">
        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={(id) => dispatch(deleteTask(id))}
        />
      </div>
    </div>
  );
}
