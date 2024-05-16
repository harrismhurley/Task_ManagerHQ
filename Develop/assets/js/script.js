// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId(selectedDate) {
    const taskDate = selectedDate.getTime();
    const randomID = Math.floor(Math.random() * 1000);

    const taskID = `${taskDate}_${randomID}`;

    return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = document.createElement('div');
    card.classList.add('taskCard', 'card', 'mb-3');
    card.id = task.id;

    card.innerHTML = `
        <div class="card">
            <h5 class="card-header">${task.name}</h5>
            <div class="card-body">
                <p class="card-text">${task.description}</p>
                <p class="card-text">Due Date: ${task.dueDate}</p>
                <a href="#" class="btn btn-danger border-light">Delete</a>
            </div>
        </div>
    `;

    return card;
}



// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // Retrieve tasks from local storage
    taskList = JSON.parse(localStorage.getItem("tasks")) || [];

    // Clear existing task cards
    $('#todo-cards, #in-progress-cards, #done-cards').empty();

    // Render each task
    taskList.forEach(task => {
        const card = createTaskCard(task);

        // Append the card to the appropriate column based on task status
        switch (task.status) {
            case 'todo':
                $('#todo-cards').append(card);
                break;
            case 'inProgress':
                $('#in-progress-cards').append(card);
                break;
            case 'done':
                $('#done-cards').append(card);
                break;
            default:
                console.error('Invalid task status:', task.status);
        }
    });

    // Make cards draggable
    $('.taskCard').draggable({
        revert: 'invalid', // Snap back if not dropped in a droppable area
        containment: 'document',
        helper: 'clone', // Drag a clone of the card
        zIndex: 100
    });

    // Make lanes droppable
    handleDrop();
}




// Todo: create a function to handle adding a new task
function handleAddTask(event) {

    console.log('handleAddTask called');

    // Get input values from the modal
    const title = $('#title').val();
    const description = $('#description').val();
    const dueDate = $('#dueDate').val();

    // Validate input (you can add more validation if needed)

    // Create a new task object
    const newTask = {
        id: generateTaskId(new Date(dueDate)),
        name: title,
        description: description,
        dueDate: dueDate,
        status: 'todo'
    };

    // Add the new task to the task list
    taskList.push(newTask);

    // Save the updated task list to local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Create the task card
    const card = createTaskCard(newTask);

    // Append the task card to the "To Do" column
    $('#todo-cards').append(card);
}


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest('.taskCard').attr('id');

    // Remove the task from the task list
    taskList = taskList.filter(task => task.id !== taskId);

    // Save the updated task list to local storage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    // Remove the task card from the UI
    $(event.target).closest('.taskCard').remove();

    // Render the updated task list
    renderTaskList();
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop() {
    // Make each lane droppable
    $('.lane').droppable({
        accept: '.taskCard',
        drop: function (event, ui) {
            const droppedCard = ui.draggable;
            const targetLaneId = $(this).attr('id');
            let targetContainer;

            // Determine the target container based on the lane id
            switch (targetLaneId) {
                case 'to-do':
                    targetContainer = $('#todo-cards');
                    break;
                case 'in-progress':
                    targetContainer = $('#in-progress-cards');
                    break;
                case 'done':
                    targetContainer = $('#done-cards');
                    break;
                default:
                    console.error('Invalid target lane:', targetLaneId);
                    return; // Exit if target lane is invalid
            }

            // Move the task card to the target container
            targetContainer.append(droppedCard);

            // Get the task ID from the dropped card
            const taskId = droppedCard.attr('id');

            // Update the task status based on the target column
            let newStatus;
            switch (targetLaneId) {
                case 'to-do':
                    newStatus = 'todo';
                    break;
                case 'in-progress':
                    newStatus = 'inProgress';
                    break;
                case 'done':
                    newStatus = 'done';
                    break;
            }

            // Find the task in the task list and update its status
            const taskIndex = taskList.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                taskList[taskIndex].status = newStatus;

                // Save the updated task list to local storage
                localStorage.setItem('tasks', JSON.stringify(taskList));
            } else {
                console.error('Task not found in task list:', taskId);
            }
        }
    });
}


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // date picker for the modal
    $("#dueDate").datepicker();

    // Event listener for adding a new task
    $('#formModal').on('click', 'button.btn-success', handleAddTask);

    // Event listener for deleting a task
    $('.container').on('click', '.taskCard .btn-danger', handleDeleteTask);

    // Render the initial task list
    renderTaskList();
});

