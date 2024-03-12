document.addEventListener('DOMContentLoaded', () => {
    const taskListEl = document.getElementById('taskList');
    const navigation = document.getElementById('navigation');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const editButton = document.getElementById('editButton');
    const editArea = document.getElementById('editArea');
    const taskInput = document.getElementById('taskInput');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');

    let tasks = ["take a nap", "buy pen", "organize room"];
    let currentTaskIndex = 0;

    const renderCurrentTask = () => {
        if (tasks.length > 0) {
            taskListEl.textContent = tasks[currentTaskIndex];
            navigation.style.display = 'block';
            // Update Next button text based on current task index
            nextButton.textContent = currentTaskIndex === tasks.length - 1 ? 'Done' : 'Next';
        } else {
            taskListEl.textContent = 'No tasks';
            navigation.style.display = 'none';
        }
    };

    const loadTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
        renderCurrentTask();
    };

    const updateTaskView = () => {
        if (currentTaskIndex < tasks.length - 1) {
            currentTaskIndex++;
        } else {
            // Reset for editing when done with the last task
            editArea.style.display = 'block';
            taskListEl.style.display = 'none';
            navigation.style.display = 'none';
            taskInput.value = tasks.join('\n');
            return; // Prevent further execution to switch to edit mode
        }
        renderCurrentTask();
    };

    const saveTasks = () => {
        tasks = taskInput.value.split('\n').filter(task => task.trim() !== '');
        localStorage.setItem('tasks', JSON.stringify(tasks));
        currentTaskIndex = 0; // Reset to the first task
        renderCurrentTask();
        editArea.style.display = 'none';
        taskListEl.style.display = 'block';
        if (tasks.length > 0) {
            navigation.style.display = 'block';
        }
    };

    loadTasks();

    editButton.addEventListener('click', () => {
        taskInput.value = tasks.join('\n');
        editArea.style.display = 'block';
        taskListEl.style.display = 'none';
        navigation.style.display = 'none';
    });

    saveButton.addEventListener('click', saveTasks);

    cancelButton.addEventListener('click', () => {
        editArea.style.display = 'none';
        taskListEl.style.display = 'block';
        if (tasks.length > 0) {
            navigation.style.display = 'block';
        }
    });

    prevButton.addEventListener('click', () => {
        currentTaskIndex = (currentTaskIndex - 1 + tasks.length) % tasks.length;
        renderCurrentTask();
    });

    nextButton.addEventListener('click', updateTaskView);

});
