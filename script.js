var todoList = {
  todos: [],
  addToDo: function(textToDo) {
    this.todos.push({
      textToDo: textToDo,
      completed: false
    });
  },
  changeToDo: function(textToDo, position) {
    // Check position number between 0 and this.todos.length
    this.todos[position].textToDo = textToDo;
  },
  deleteToDo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleToDo: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var countToDo = this.todos.length;
    var completedToDo = 0;
    
    // collect al completed todos
    this.todos.forEach(function (todo) {
      if (todo.completed === true) {
        completedToDo++;
      }
    })
    
    this.todos.forEach ( function (todo) {
      if (completedToDo === countToDo) {
        // case 0: all todos were completed, should inverse all completed value-boolens
        todo.completed = false;
      } else {
        // case 1: otherwise cases, something is true (completed), but not at all
        todo.completed = true;
      }
    });
  }
}

var handlers = {
  displayToDo: function () {
    view.displayToDo();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayToDo();
  },
  addToDo: function () {
    var addToDoInput = document.getElementById('addToDoInput');
    todoList.addToDo(addToDoInput.value);
    addToDoInput.value = "";
    view.displayToDo();
  },
  changeToDo: function () {
    var changeToDoInputTextTodo = document.getElementById('changeToDoInputTextTodo');
    var changeToDoInputPosition = document.getElementById('changeToDoInputPosition');
    
    todoList.changeToDo(changeToDoInputTextTodo.value, changeToDoInputPosition.valueAsNumber);
    changeToDoInputTextTodo.value = "";
    changeToDoInputPosition.value = "";
    view.displayToDo();
  },
  toggleToDo: function (position) {
    todoList.toggleToDo(position);
    view.displayToDo();
  },
  deleteToDo: function (positiion) {
    todoList.deleteToDo(positiion);
    view.displayToDo();
  }
};

var view = {
  displayToDo: function () {
    var displayToDoOutput = document.getElementById("displayToDoOutput");
    displayToDoOutput.innerHTML = '';
    if (todoList.todos.length === 0) {
      console.log('todos array is empty');
      // change output from console to the view
    } else {
      todoList.todos.forEach ( function (todo, index) {
        var toDoElement = document.createElement('li');
        var toDoTextElement = document.createElement('span');
        
        toDoElement.id = index;
        
        
        // delete point decoration of li 
        if (todo.completed) {
          toDoTextElement.textContent = todo.textToDo + '(x)';
        } else {
          toDoTextElement.textContent = todo.textToDo + '( )';
        }
        
        toDoElement.appendChild(this.toggleButton());
        toDoElement.appendChild(toDoTextElement);
        toDoElement.appendChild(this.deleteButton());
        
        displayToDoOutput.appendChild(toDoElement);
      }, this)
    }
  },
  deleteButton: function () {

    var deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerHTML = 'delete';
    deleteButtonElement.className = 'deleteButton';    
    
    return deleteButtonElement;
  },
  toggleButton: function () {
    
    var toggleButtonEelement = document.createElement('button');
    toggleButtonEelement.innerHTML = 'toggle';
    toggleButtonEelement.className = 'toggleButton';
    
    return toggleButtonEelement;
  },
  setupEventListeners: function () {
    var Ulist = document.querySelector('ul');
    Ulist.addEventListener('click', function (event) {
      if (event.target.className === 'deleteButton'){
      let position = parseInt(event.target.parentNode.id);
      handlers.deleteToDo(position);
    } else if (event.target.className === 'toggleButton') {
      let position = parseInt(event.target.parentNode.id);
      handlers.toggleToDo(position);
    }
  });
  },
  
};

view.setupEventListeners();

// create pretest for input information for addToDO