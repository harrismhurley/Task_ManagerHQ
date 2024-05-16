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

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

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
        }
  
        // Append the dropped card to the target container
        if (targetContainer) {
          targetContainer.append(droppedCard);
        }
      }
    });
  }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

    // date picker for the modal
    $(function () {
        $("#dueDate").datepicker();
    });
});
