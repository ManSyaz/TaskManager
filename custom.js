let tasks = []; // Sample data structure for tasks

// Function to render the task form
function renderTaskForm() {
    const formContainer = document.querySelector('.layer-container form');
    formContainer.addEventListener('submit', function (event) {
        event.preventDefault();
        handleTaskFormSubmission();
    });
}

// Function to handle task form submission
function handleTaskFormSubmission() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    if (title && description && date && priority) {
        const newTask = {
            title,
            description,
            date,
            priority,
            completed: false,
        };

        tasks.push(newTask);
        renderTaskList();
        clearTaskForm();
    } else {
        alert('Please fill in all required fields.');
    }
}

// Function to clear the task form after submission
function clearTaskForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
}

// Function to render the task list
function renderTaskList() {
    const taskListContainer = document.querySelector('.task-list-container');
    taskListContainer.innerHTML = ''; // Clear existing content

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed-task');
        }
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due Date: ${task.date}</p>
            <p>Priority: ${task.priority}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="completeTask(${index})">Complete</button>
        `;
        taskListContainer.appendChild(taskElement);
    });
}

// Function to edit a task
function editTask(index) {
    const taskToEdit = tasks[index];
    // Implement logic to populate the form with the task details for editing
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
}

// Function to mark a task as completed
function completeTask(index) {
    tasks[index].completed = true;
    renderTaskList();
}

// Function to apply user-customized styles
function applyUserStyles(userStyles) {
    document.body.style.backgroundColor = userStyles.backgroundColor || 'white';
    document.querySelector('.head h1').innerText = userStyles.appName || 'My Task Manager';
    document.querySelector('.footer p').innerText = `@ 2023 ${userStyles.appCreator || 'Pixel Pusher'}`;
    // Add more styles as needed
}

// Example: Apply user-customized styles
const userStyles = {
    backgroundColor: 'lightgray', // Replace with user preference or default
    appName: 'Awesome Task Manager', // Replace with user preference or default
    appCreator: 'Code Magician', // Replace with user preference or default
};

applyUserStyles(userStyles);

// Initial render
renderTaskForm();
renderTaskList();
