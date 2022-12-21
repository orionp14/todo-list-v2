  var filterResults = function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    getTasks();
  }

  $(document).ready(function(){
    var getAndDisplayAllTasks = function () {
      $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=2',
        dataType: 'json',
        success: function (response, textStatus) {
          $('#todo-list').empty();
          response.tasks.forEach(function (task) {
            $("#todo-list").append('<div class="row"><li class="list-group-item"><input type="checkbox" class="mark-complete" data-id="' 
            + task.id + '"' + (task.completed ? 'checked' : '') + '>' + task.content + 
            '<button class="delete btn btn-sm btn-danger" data-id="' + task.id + 
            '">Delete</button>');
          });
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
    
    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=2',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#new-task-content').val()
          }
        }),
        success: function (response, textStatus) {
          $('#new-task-content').val('');
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
    }
    
    var markTaskComplete = function (id) {
      $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=2',
        dataType: 'json',
        success: function (response, textStatus) {
          getTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
  
    var markTaskActive = function (id) {
      $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=2',
        dataType: 'json',
        success: function (response, textStatus) {
          getTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }

    var deleteTask = function (id) {
      $.ajax({
        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=2',
        success: function (response, textStatus) {
          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }

  $(".toggle-active").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".mark-complete").prop("checked")) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  $(".toggle-completed").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      if ($(this).find(".mark-complete").prop("checked") !== true) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  $(".toggle-all").on("click", function () {
    $(".list-group-item").each(function (i, ele) {
      $(this).show();
    });
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask();
  });

  $(document).on('click', '.delete', function () {
    deleteTask($(this).data('id'));
  });

  $(document).on('click', '.select', function () {
    if ($(this).data('completed')) {
      markTaskActive($(this).data('id'));
    } else {
    } markTaskComplete($(this).data('id'));
  });

    getAndDisplayAllTasks();
  });