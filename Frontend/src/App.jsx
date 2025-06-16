import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      alert("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await axios.post(API_URL, task);
      fetchTasks();
    } catch (error) {
      alert("Error adding task");
    }
  };

  const updateTask = async (id, task) => {
    try {
      await axios.put(`${API_URL}/${id}`, task);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      alert("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
      }

      fetchTasks();
    } catch (error) {
      alert("Error deleting task");
    }
  };

  return (
    <div className="container">
      <h1>{editingTask ? "Edit Task" : "Add New Task"}</h1>

      <TaskForm
        onSubmit={editingTask ? (t) => updateTask(editingTask.id, t) : addTask}
        editingTask={editingTask}
      />

      <h2>Task List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} />
      )}
    </div>
  );
}

export default App;
