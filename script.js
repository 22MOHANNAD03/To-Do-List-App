// Load tasks from localStorage when the page loads
window.onload = function() {
    loadTasks();
  };
  
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
  
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
  
    const taskList = document.getElementById("task-list");
  
    // Create task element
    const taskItem = document.createElement("li");
  
    // Create task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskItem.appendChild(taskSpan);
  
    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.onclick = function () {
      taskItem.remove();
      saveTasks();
    };
    taskItem.appendChild(removeButton);
  
    // Mark task as completed
    taskItem.onclick = function () {
      taskItem.classList.toggle("completed");
      saveTasks();
    };
  
    // Append task to list
    taskList.appendChild(taskItem);
  
    // Save tasks to localStorage
    saveTasks();
  
    // Clear input field
    taskInput.value = "";
  }
  
  // Save all tasks to localStorage
  function saveTasks() {
    const taskList = document.getElementById("task-list");
    const tasks = [];
  
    // Loop through all tasks
    for (let i = 0; i < taskList.children.length; i++) {
      const taskItem = taskList.children[i];
      const taskText = taskItem.querySelector("span").textContent;
      const isCompleted = taskItem.classList.contains("completed");
      tasks.push({ text: taskText, completed: isCompleted });
    }
  
    // Store the tasks in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
  
    if (tasks) {
      const taskList = document.getElementById("task-list");
  
      tasks.forEach(task => {
        const taskItem = document.createElement("li");
  
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        taskItem.appendChild(taskSpan);
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove");
        removeButton.onclick = function () {
          taskItem.remove();
          saveTasks();
        };
        taskItem.appendChild(removeButton);
  
        if (task.completed) {
          taskItem.classList.add("completed");
        }
  
        taskItem.onclick = function () {
          taskItem.classList.toggle("completed");
          saveTasks();
        };
  
        taskList.appendChild(taskItem);
      });
    }
  }
  