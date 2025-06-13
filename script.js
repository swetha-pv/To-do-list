let tasks = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  tasks = saved ? JSON.parse(saved) : [];
}

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text: text, completed: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();

  if (tasks[index].completed) {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(status) {
  let filtered = tasks;

  if (status === "completed") {
    filtered = tasks.filter(task => task.completed);
  } else if (status === "pending") {
    filtered = tasks.filter(task => !task.completed);
  }

  renderTasks(filtered);
}

function renderTasks(taskList = tasks) {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = () => toggleComplete(index);

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Dark toggle
document.getElementById("dark-toggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// Initial load
window.onload = () => {
  loadTasks();
  renderTasks();
};
