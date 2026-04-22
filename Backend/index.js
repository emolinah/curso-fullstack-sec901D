const express = require('express');
const app = express();
app.use(express.json()); // Para que el servidor entienda JSON

let tasks = []; // Aquí guardaremos las tareas temporalmente

// 2. Endpoint GET /tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// 3. Endpoint POST /tasks
app.post('/tasks', (req, res) => {
    const { name } = req.body;
    const newTask = { id: tasks.length + 1, name, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. Endpoint PATCH /tasks/:id
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).send('Tarea no encontrada');
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));