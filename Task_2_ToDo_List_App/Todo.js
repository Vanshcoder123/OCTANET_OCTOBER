
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];



function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskName !== '') {
        const newTask = {
            name: taskName,
            dueDate: dueDate,
            completed: false
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        dueDateInput.value = '';
        displayTasks();
    }
}


function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed || false;
        checkbox.addEventListener('change', () => toggleTaskStatus(index));

        const taskText = document.createElement('span');
        taskText.textContent = task.name;

        const dueDate = document.createElement('span');
        dueDate.textContent = task.dueDate;
        dueDate.className = 'due-date';

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<i style="color:white" class="fa-regular fa-trash-can"></i>';
        deleteButton.addEventListener('click', () => deleteTask(index));

        card.appendChild(checkbox);
        card.appendChild(taskText);
        card.appendChild(dueDate);
        card.appendChild(deleteButton);
        taskList.appendChild(card);


        const isOverdue = isTaskOverdue(task.dueDate);
        const isChecked = checkbox.checked;

        if (isOverdue && !isChecked) {
            card.classList.add('overdue');
        } else if (!isChecked) {
            card.classList.add('not-completed');
        } else {
            card.classList.add('completed');
        }
    });
}


function isTaskOverdue(dueDate) {
    const now = new Date().setHours(0, 0, 0, 0);
    const taskDueDate = new Date(dueDate).setHours(0, 0, 0, 0);
    return now > taskDueDate;
}

displayTasks();




function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


function toggleTaskStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}



