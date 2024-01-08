// Array to store tasks
const tasks = [];

// Function to add a new task
function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    if (!title || !description || !dueDate || !priority) {
        alert('Please fill in all the fields');
        return null;
    }

    const newTask = {
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };

    // Add the new task to the list
    tasks.push(newTask);
    updateTaskList();
    clearForm();
}

// Function to clear the form after adding a task
function clearForm() {
    document.getElementById('task-form').reset();
}

// Function to render a task
function renderTask(task) {
    const listItem = document.createElement('li');
    listItem.className = task.completed ? 'completed-task' : '';
    listItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>${task.dueDate}</p>
        <p>${task.priority}</p>
        <button class="editButton" onclick="editTask('${task.title}')">Edit</button>
        <button class="deleteButton" onclick="deleteTask('${task.title}')">Delete</button>
        <button class="completeButton" onclick="markAsCompleted('${task.title}')">${task.completed ? 'Complete' : 'Complete'}</button>
    `;

    document.getElementById('task-list').appendChild(listItem);
}

// Function to edit an existing task
function editTask(title) {
    const newTitle = prompt('Enter a new title for the task:');
    if (newTitle === null) {
        return; // User clicked Cancel
    }

    const taskIndex = findTaskIndex(title);
    if (taskIndex !== -1) {
        tasks[taskIndex].title = newTitle;
        updateTaskList();
    }
}

// Function to delete a task
function deleteTask(title) {
    const taskIndex = findTaskIndex(title);
    if (taskIndex !== -1 && confirm(`Are you sure you want to delete "${title}"?`)) {
        tasks.splice(taskIndex, 1);
        updateTaskList();
    }
}

// Function to mark a task as completed
function markAsCompleted(title) {
    const taskIndex = findTaskIndex(title);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        updateTaskList();
    }
}

// Function to find the task index by title
function findTaskIndex(title) {
    return tasks.findIndex(task => task.title === title);
}

// Function to update the task list on the UI
function updateTaskList(filteredTasks = tasks) {
    // Clear the current list
    document.getElementById('task-list').innerHTML = '';

    // Render the updated list
    filteredTasks.forEach(task => renderTask(task));
}

// Function to filter tasks based on completion status or priority
function filterTasks() {
    const filterStatus = document.getElementById('filter-status').value;
    const filterPriority = document.getElementById('filter-priority').value;

    const filteredTasks = tasks.filter(task => {
        const statusMatch = filterStatus === 'all' || (filterStatus === 'completed' && task.completed) || (filterStatus === 'pending' && !task.completed);
        const priorityMatch = filterPriority === 'all' || filterPriority === task.priority;

        return statusMatch && priorityMatch;
    });

    updateTaskList(filteredTasks);
}

// Customization functions
function toggleCustomizeModal() {
    document.getElementById('customization').classList.toggle('hidden');
}

// Function to apply customization
function applyCustomization() {
    const headerColor = document.getElementById('header-color').value;
    const containerColor = document.getElementById('container-color').value;
    const footerColor = document.getElementById('footer-color').value;
    const addButtonColor = document.getElementById('add-button-color').value;
    const customButtonColor = document.getElementById('custom-button-color').value;

    // Apply customization

    document.querySelector('header').style.backgroundColor = headerColor || '#3498db';
    document.querySelector('.container').style.backgroundColor = containerColor || '#ffffff';
    document.querySelector('footer').style.backgroundColor = footerColor || '#2c3e50';
    document.querySelector('.addButton').style.backgroundColor = addButtonColor || '#3498db';
    document.querySelector('.customButton').style.backgroundColor = customButtonColor || '#e74c3c';

    // Close the customization modal after applying
    toggleCustomizeModal();
}

// Sample usage
updateTaskList();
