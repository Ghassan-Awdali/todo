import { useState, useEffect } from "react";
import Todoitem from "./Todoitem";
export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [
      ...tasks,
      { text: newTask, id: Date.now(), completed: false },
    ];
    setTasks(updatedTasks);
    setNewTask("");
  };

  // Remove a task
  const removeTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Sort tasks
  const sortTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;
      return a.text.localeCompare(b.text);
    });
    setTasks(sortedTasks);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTask()}
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white p-2 rounded-md w-full mb-4"
      >
        Add Task
      </button>
      <button
        onClick={sortTasks}
        className="bg-gray-500 text-white p-2 rounded-md w-full mb-4"
      >
        Sort Tasks
      </button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 border-b flex justify-between items-center ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              className="bg-red-500 text-white p-1 rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
