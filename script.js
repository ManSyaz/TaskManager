//array to store tasks
const tasks = [];

//function to clear the form after adding a task
function clearForm() {
    document.getElementById('task-form').reset();
}

//function to update the task list on the ui
function updateTaskList(filteredTasks = tasks) 
{
    //clear the current list
    document.getElementById('task-list').innerHTML = '';

    //render the updated list by showing filtered task
    filteredTasks.forEach(task => renderTask(task));
}

//function to add a new task
function addTask() 
{
    //get input from the input form
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    //validate and check the form if any field is empty
    if (!title || !description || !dueDate || !priority) 
    {
        alert('Please fill in all the fields');
        return null;
    }

    //create a new task object
    const newTask = 
    {
        title,
        description,
        dueDate,
        priority,
        completed: false,
    };

    //add the new task to the list
    tasks.push(newTask);
    //update task list
    updateTaskList();
    //clear form after adding task
    clearForm();
}

//function to show task added after user add task
function renderTask(task) 
{
    const listItem = document.createElement('li');
    listItem.className = task.completed ? 'completed-task' : '';
    listItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>Description: ${task.description}</p>
        <p>Due Date: ${task.dueDate}</p>
        <p>Priority: ${task.priority}</p>
        <button class="editButton" onclick="editTask('${task.title}')">Edit</button>
        <button class="deleteButton" onclick="deleteTask('${task.title}')">Delete</button>
        <button class="completeButton" onclick="markAsCompleted('${task.title}')">${task.completed ? 'Complete' : 'Complete'}</button>
    `;

    //append new task to task list
    document.getElementById('task-list').appendChild(listItem);
}

//function to edit task details
function editTaskDetails(title, field) 
{
    const taskIndex = findTaskIndex(title);
    if (taskIndex !== -1) 
    {
        let newValue;
        if (field === 'dueDate') 
        {
            // use date input for editing due date
            newValue = prompt(`Enter a new ${field} for the task:`, tasks[taskIndex][field]);
        } 
        else 
        {
            // use generic prompt for other fields
            newValue = prompt(`Enter a new ${field} for the task:`, tasks[taskIndex][field]);
        }

        if (newValue !== null) 
        {
            tasks[taskIndex][field] = newValue;
            updateTaskList();
        }
    }
}

//function to edit task details dynamically
function editTask(title) 
{
    const taskIndex = findTaskIndex(title);
    if (taskIndex !== -1) 
    {
        const fieldToEdit = prompt(`Select a field to edit (title, description, dueDate, priority):`);
        if (fieldToEdit === null) 
        {
            return; //user clicked cancel
        }

        //validate the input field
        if (['title', 'description', 'dueDate', 'priority'].includes(fieldToEdit)) 
        {
            editTaskDetails(title, fieldToEdit);
        } 
        else 
        {
            alert('Invalid field selected. Please choose title, description, dueDate, or priority.');
        }
    }
}

//function to delete a task
function deleteTask(title) 
{
    const taskIndex = findTaskIndex(title);
    if (taskIndex !== -1 && confirm(`Are you sure you want to delete "${title}"?`)) 
    {
        //remove task from array
        tasks.splice(taskIndex, 1);
        //update task ui
        updateTaskList();
    }
}

//function to mark a task as completed
function markAsCompleted(title) 
{
    const taskIndex = findTaskIndex(title);
    //if task have same title, it will mark 1 task as complete only, in other word..the title must be specific
    if (taskIndex !== -1) 
    {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        updateTaskList();
    }
}

//function to find the task index by title
function findTaskIndex(title) 
{
    return tasks.findIndex(task => task.title === title);
}

//function to filter tasks based on completion status or priority
function filterTasks() 
{
    const filterStatus = document.getElementById('filter-status').value;
    const filterPriority = document.getElementById('filter-priority').value;

    //filter task based on status and priority
    const filteredTasks = tasks.filter(task => {
        const statusMatch = filterStatus === 'all' || (filterStatus === 'completed' && task.completed) || (filterStatus === 'pending' && !task.completed);
        const priorityMatch = filterPriority === 'all' || filterPriority === task.priority;

        return statusMatch && priorityMatch;
    });

    //update the ui with filtered task
    updateTaskList(filteredTasks);
}

//customization functions
function toggleCustomizeModal() 
{
    //toggle the visibility of the customization modal
    document.getElementById('customization').classList.toggle('hidden');
}

//function to apply color customization
function applyCustomization() 
{
    //get customization input from input fields
    const headerColor = document.getElementById('header-color').value;
    const containerColor = document.getElementById('container-color').value;
    const footerColor = document.getElementById('footer-color').value;
    const buttonColor = document.getElementById('button-color').value || '#3498db'; // default color for buttons
    const textColor = document.getElementById('text-color').value || '#ffffff'; // default text color

    //apply customization to header, container, and footer
    document.querySelector('header').style.backgroundColor = headerColor || '#3498db';
    document.querySelector('.container').style.backgroundColor = containerColor || '#ffffff';
    document.querySelector('footer').style.backgroundColor = footerColor || '#2c3e50';

    //apply the color to all buttons and customize text color
    const allButtons = document.querySelectorAll('.addButton, .customButton, .editButton, .deleteButton, .completeButton');
    allButtons.forEach(button => {
        button.style.backgroundColor = buttonColor;
        button.style.color = textColor; //customize text color
        button.style.border = '2px';
        button.style.padding = '8px 16px';
        button.style.marginRight = '8px';
        button.style.cursor = 'pointer';
    });

    //apply customization to text color in task-form-container, filter-container, filter-priority, and task-list-container
    document.getElementById('task-form-container').style.color = textColor;
    document.getElementById('task-form').style.color = textColor;
    document.getElementById('filter-container').style.color = textColor;
    document.getElementById('filter-status').style.color = textColor;
    document.getElementById('filter-priority').style.color = textColor;
    document.getElementById('task-list-container').style.color = textColor;
    document.getElementById('.app-name').style.color = textColor;

    //close the customization modal after applying
    toggleCustomizeModal();
}

//update task list on the ui
updateTaskList();
