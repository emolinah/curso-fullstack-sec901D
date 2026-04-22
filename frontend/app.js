const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');

// 1. Cargar tareas (GET)
async function loadTasks() {
    try {
        const res = await fetch('http://localhost/tasks'); // El frontend llama a Nginx [cite: 156]
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach(t => renderTask(t));
    } catch (error) {
        console.error("Error cargando tareas:", error);
    }
}

// 2. Crear tarea (POST)
taskForm.onsubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    
    await fetch('http://localhost/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value }) // Envía el título al gateway [cite: 130, 151]
    });
    
    input.value = '';
    await loadTasks(); 
};

// 3. Completar tarea (PATCH)
async function completeTask(id) {
    await fetch(`http://localhost/tasks/${id}`, { method: 'PATCH' }); // Marca como completada [cite: 131, 154]
    await loadTasks();
}

function renderTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="completeTask('${task.id}')">
        <span style="${task.completed ? 'text-decoration:line-through' : ''}">${task.title}</span>
    `;
    taskList.appendChild(li);
}

loadTasks();