// ---------------------- Page Load ---------------------- //
window.onload = function() {
  if (localStorage.getItem("ListOfTasks") !== null) {
    let arrCompletionStatus = localStorage.getItem('CompletionStatus').split("|");
    let arrTaskList = localStorage.getItem("ListOfTasks").split("|");
    arrTaskList.forEach((e, i) => {
      loadTasksToTable(e, i, arrCompletionStatus);
    });

    document.getElementById('btn-clear').className = 'btn-status-complete';
  }
  
  if (getTableRowCount() === 0) {
      document.getElementById('task-list').style.display = 'none';
      document.getElementById('no-tasks').innerText = 'Currently, you have no tasks to complete.';
      document.getElementById('btn-clear').className = 'btn-status-incomplete';
    }
}



// ------------------- Table of Tasks ------------------- //
var taskList = document.getElementById('task-list');

function getTableRowCount() {
  let taskListRowCount = taskList.getElementsByTagName('tbody')[0].rows.length;
  return taskListRowCount;
}

// Load tasks to table from local storage
function loadTasksToTable(item, index, arrCompletionStatus) {
    // Add new row with cells
    let newRow = taskList.getElementsByTagName('tbody')[0].insertRow();
    let cell0 = newRow.insertCell(0);
    let cell1 = newRow.insertCell(1);
    let cell2 = newRow.insertCell(2);

    addCheckbox(index, cell0, arrCompletionStatus[index])

    addTaskToTable(index, cell1, arrCompletionStatus[index], item);

    addDeleteButton(index, cell2, arrCompletionStatus[index]);
}

// Add task text to table
function addTaskToTable(rowNumber, cell1, status, task) {
  cell1.setAttribute('id', 'task-' + rowNumber.toString());
  cell1.setAttribute('class', status);
  cell1.innerHTML = task;
}



// ---------------------- Checkboxs ---------------------- //
function addCheckbox(rowNumber, cell0, status) {
  let isTaskComplete = (status == 'status-complete') ? true : false;
  let cbxTitle = (status == 'status-complete') ? 'Mark as incomplete' : 'Mark as complete';

  let cbx = document.createElement('INPUT');
  cbx.setAttribute('id', 'cbx-' + rowNumber.toString());
  cbx.setAttribute('class', status);
  cbx.setAttribute('onclick', 'changeTaskStatus(this)');
  cbx.setAttribute('type', 'checkbox');
  cbx.setAttribute('title', cbxTitle);
  cell0.append(cbx);
  
  document.getElementById('cbx-' + rowNumber.toString()).checked = isTaskComplete;
}

function changeTaskStatus(cbx) {
  let taskNumber = cbx.id.substring(4,cbx.id.length);
  // let isTaskComplete = (arrCompletionStatus[index] == 'status-complete') ? true : false;
  let taskStatus = cbx.checked ? 'status-complete' : 'status-incomplete';
  let cbxTitle = (status == 'status-complete') ? 'Mark as incomplete' : 'Mark as complete';

  document.getElementById('cbx-' + taskNumber).className = taskStatus
  document.getElementById('cbx-' + taskNumber).title = cbxTitle
  document.getElementById('task-' + taskNumber).className = taskStatus;
  document.getElementById('delete-' + taskNumber).className = 'btn-' + taskStatus;

  // Rewrite status to local storage
  rewriteLocalStorage(getTableRowCount());
  window.location.reload(false); 
}



// -------------------- Delete Buttons -------------------- //
function addDeleteButton(rowNumber, cell2, status) {
  let btnDelete = document.createElement('button');
      btnDelete.setAttribute('id', 'delete-' + rowNumber.toString());
      btnDelete.setAttribute('class', 'btn-' + status);
      btnDelete.setAttribute('onclick', 'deleteRow(this)');
      
      cell2.append(btnDelete);

      document.getElementById('delete-' + rowNumber.toString()).innerText = 'Delete';
}

function deleteRow(btnDelete) {
  let taskNumber = btnDelete.id.substring(7,btnDelete.id.length);
  
  rewriteLocalStorage(getTableRowCount(), taskNumber)
  
  window.location.reload(false); 
}



// -------------------- Local Storage -------------------- //

function addNewTaskToLocalStorage() {
  let newTask = document.getElementById('textbox-task').value;
  if (localStorage.getItem("ListOfTasks") === null) {
    localStorage.setItem("ListOfTasks", newTask);
    localStorage.setItem("CompletionStatus", 'status-incomplete');
  }
  else {
    localStorage.setItem("ListOfTasks", localStorage.getItem("ListOfTasks") + '|' + newTask);
    localStorage.setItem("CompletionStatus", localStorage.getItem("CompletionStatus") + '|' + 'status-incomplete');
  }
}

function rewriteLocalStorage(taskCount, skipDeletedTask = -1) {
  localStorage.removeItem('CompletionStatus');
  localStorage.removeItem('ListOfTasks');

  let taskStatusList = '';
  let taskList = '';
  for (i = 0; i < taskCount; i++) {
    if (i != skipDeletedTask) {
      taskStatusList = taskStatusList + document.getElementById('task-' + i).className + '|';
      taskList = taskList + document.getElementById('task-' + i).innerText + '|';
    }
  }

  if (taskCount == 1 && skipDeletedTask !== -1) {
    // This condition is relevant when deleting the last remaining item
    // Do nothing local storage has already been cleared
  }
  else {
    taskStatusList = taskStatusList.substring(0, taskStatusList.length-1); // Remove last '|'
    taskList = taskList.substring(0, taskList.length-1);
    localStorage.setItem('CompletionStatus', taskStatusList);
    localStorage.setItem('ListOfTasks', taskList);
  }

}



// -------------------- Clear button -------------------- //
var clear = document.getElementById('btn-clear')
clear.onclick = function() {
  localStorage.removeItem('ListOfTasks');
  localStorage.removeItem('CompletionStatus');
  window.location.reload(false); 
}



// -------------------- Modal Window -------------------- //
var modal = document.getElementById('form-add-task');
var btnShowModal = document.getElementById('btn-show-modal');
var span = document.getElementsByClassName('close')[0];
// When the user clicks on the button, open the modal
btnShowModal.onclick = function() {
  modal.style.display = 'block';
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

