const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para que el servidor pueda leer JSON en el cuerpo (body) de las peticiones
app.use(express.json());

// Base de datos temporal (un array simple)
let tareasMock = [
    { id: 1, nombre: 'Aprender Express', completada: false }
];

// --- Endpoint GET /tasks ---
app.get('/tasks', (req, res) => {
    res.json(tareas);
});

// --- Endpoint POST /tasks ---
app.post('/tasks', (req, res) => {
    const nuevaTarea = {
        id: tareas.length + 1,
        nombre: req.body.nombre,
        completada: false
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// --- Endpoint PATCH /tasks/:id ---
app.patch('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        tarea.completada = true;
        res.json({ mensaje: "Tarea marcada como completada", tarea });
    } else {
        res.status(404).json({ mensaje: "No encontré esa tarea" });
    }
});

// Iniciar el servidor
//Extiende de PORT inicializado al inicio
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});