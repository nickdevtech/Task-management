const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

app.post("/tasks", (req, res) => {
  const { name, description } = req.body;
  const newTask = { id: idCounter++, name, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.name = name;
  task.description = description;
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
