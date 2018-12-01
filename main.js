/* What I learned
Use of JavaScript, HTML, Bootstrap, jQuery, change js
Bootstrap migration to v4
Bootstrap labels have been renamed to badges
Bootstrap panels, thumbnails, and wells dropped entirely for the new card component
*/

document.getElementById('taskInputForm').addEventListener('submit', saveTask);

function saveTask(e) {
  var taskDesc = document.getElementById('taskDescInput').value;
  var taskType = document.getElementById('taskTypeInput').value;
  var taskId = chance.guid();
  // var taskId = 1;
  var taskStatus = "Open";

  var task = {
    id: taskId,
    description: taskDesc,
    type: taskType,
    status: taskStatus
  }

  if (localStorage.getItem('tasks') == null) {
    var tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  document.getElementById('taskInputForm').reset();

  fetchTasks();

  e.preventDefault();
}

function setStatusClosed(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].status = 'Closed';
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchTasks();
}

function deleteIssue(id) {
  var tasks = JSON.parse(localStorage.getItem('tasks'));

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks.splice(i, 1);
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchTasks();
}

function fetchTasks() {
  var tasks = JSON.parse(localStorage.getItem('tasks'));
    var tasksList = document.getElementById('tasksList');

    tasksList.innerHTML = '';

    for (var i = 0; i < tasks.length; ++i) {
      var id = tasks[i].id;
      var desc = tasks[i].description;
      var type = tasks[i].type;
      var status = tasks[i].status;

      tasksList.innerHTML +=  '<div class="card"><div class="card-body">' +
                              '<h6>Task ID: ' + id + '</h6>' +
                              '<p><span class="badge badge-info">' + status + '</span></p>' +
                              '<h3>' + desc + '</h3>' +
                              '<p><span class="fas fa-user-astronaut"></span> ' + type + '</p>' +
                              '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
                              '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
                              '</div></div>';
    }
  }
