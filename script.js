// Startup
window.onload = function() {
  if (localStorage.getItem("ListOfTasks") !== null) {
    let arrStatus = localStorage.getItem("CompletionStatus").split("|");
    let arrTaskList = getArrayOfTasks();
    arrTaskList.forEach((e, i) => {
      addTaskToTable(e, i, arrStatus);
    });
  }
  
  if (getTableRowCount() === 0) {
      document.getElementById('task-list').style.display = 'none';
      document.getElementById('no-tasks').innerText = 'Currently, you have no tasks to complete.';
    }
}


var taskList = document.getElementById('task-list');

function getArrayOfTasks() {
  let arrStoredTasks = localStorage.getItem("ListOfTasks").split("|");
  return arrStoredTasks;
}

function getTableRowCount() {
  let taskListRowCount = taskList.getElementsByTagName('tbody')[0].rows.length;
  return taskListRowCount;
}

function changeTaskStatus(cbx) {
  let taskNumber = cbx.id.substring(4,cbx.id.length);
  let taskStatus = cbx.checked ? 'status-complete' : 'status-incomplete';
  
  document.getElementById('cbx-' + taskNumber).className = taskStatus
  document.getElementById('task-' + taskNumber).className = taskStatus;
  // Rewrite status to local storage
  rewriteStatusToLocalStorage(getTableRowCount());
}

function rewriteStatusToLocalStorage(taskCount) {
  localStorage.removeItem('CompletionStatus');

  let taskStatusList = '';
  for (i = 0; i < taskCount; i++) {
    taskStatusList = taskStatusList + document.getElementById('task-' + i).className + '|';
  }

  taskStatusList = taskStatusList.substring(0, taskStatusList.length-1); // Remove last '|'
  console.log(taskStatusList)
  localStorage.setItem("CompletionStatus", taskStatusList);
}

// Adds tasks to table from local storage
function addTaskToTable(item, index, arrCompletionStatus) {
    // When user clicks add button, add to list
    let newRow = taskList.getElementsByTagName('tbody')[0].insertRow();
    let cell0 = newRow.insertCell(0);
    let cell1 = newRow.insertCell(1);

    let cbx = document.createElement("INPUT");
    cbx.setAttribute('id', 'cbx-' + index.toString());
    cbx.setAttribute('class', arrCompletionStatus[index]);
    cbx.setAttribute('onclick', 'changeTaskStatus(this)');
    cbx.setAttribute('type', 'checkbox');
    cbx.setAttribute('title', 'Mark as complete');

    cell0.append(cbx);
    let isTaskComplete = arrCompletionStatus[index] = 'status-complete' ? true : false;
    console.log(arrCompletionStatus[index]);
    document.getElementById('cbx-' + index.toString()).checked = isTaskComplete;

    cell1.setAttribute('id', 'task-' + index.toString());
    cell1.setAttribute('class', arrCompletionStatus[index]);
    cell1.innerHTML = item;
}


// ===================== For Tesing Only ===================== //
var clear = document.getElementById('clear')
clear.onclick = function() {
  localStorage.removeItem('ListOfTasks');
  localStorage.removeItem('CompletionStatus');
}
// ========================================================== //


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

// Add new task to local storage. 
// When modal window closes, table reloads from local storage.
function addNewTask() {
  let newTask = document.getElementById('textbox-task').value;
  if (localStorage.getItem("ListOfTasks") === null) {
    localStorage.setItem("ListOfTasks", newTask);
    localStorage.setItem("CompletionStatus", 'status-incomplete');
  }
  else {
    localStorage.setItem("ListOfTasks", localStorage.getItem("ListOfTasks") + '|' + newTask);
    localStorage.setItem("CompletionStatus", localStorage.setItem("CompletionStatus") + '|' + 'status-incomplete');
  }
}