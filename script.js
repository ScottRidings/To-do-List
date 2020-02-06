// When window loads determine if there are tasks
var taskList = document.getElementById('task-list');
window.onload = function() {
    if (taskList.tBodies[0].rows.length > 0) {
        this.taskList.style.display = 'none';
    }
    else {
        document.getElementById('no-tasks').innerText = 'Currently, you have no tasks to complete.'
    }
}


var btnAddTask = document.getElementById('btn-add');
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