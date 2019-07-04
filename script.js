var todoList = {
  todos: [],
  addToDo: function(textToDo) {
    this.todos.push({
      textToDo: textToDo,
      completed: false,
      edit: false
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
  changeToDo: function (textToDo, position, status) {
    // button change to input, input change to button 
    if (status === 'button') {
      todoList.todos[position].edit = true;    
    } else if (status === 'input') {
      todoList.todos[position].edit = false;
    }
    todoList.changeToDo(textToDo, position);
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
    // catch ul element    
    if (todoList.todos.length === 0) {
      console.log('todos array is empty');
      // change output from console to the view
    } else {
      todoList.todos.forEach ( function (todo, index) {
        var toDoElement = document.createElement('li');
        
        toDoElement.id = index;
        toDoElement.appendChild(this.toggleButton(index));
        if (todoList.todos[index].edit === true) {
          toDoElement.appendChild(this.changeInput(todo.textToDo));
        } else if (todoList.todos[index].edit === false) {
          toDoElement.appendChild(this.changeButton(todo.textToDo));
        }
        
        // add condition for .toggle method for todo object 
        // or function output two diffreint buttons depende of index 
        
        toDoElement.appendChild(this.deleteButton());
        displayToDoOutput.appendChild(toDoElement);
      },this)
    }
  },
  deleteButton: function () {

    var deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerHTML = 'delete';
    deleteButtonElement.className = 'deleteButton';    
    
    return deleteButtonElement;
  },
//   toggleButton: function () {
    
//     var toggleButtonElement = document.createElement('button');
//     toggleButtonElement.innerHTML = 'toggle';
//     toggleButtonElement.className = 'toggleButton';
    
//     return toggleButtonElement;
//   },
  toggleButton: function (index) {
    var toggleButtonElement = document.createElement('div');
    if (todoList.todos[index].completed === true) {
      toggleButtonElement.className = 'toggleButton on';
    } else if (todoList.todos[index].completed === false) {
      toggleButtonElement.className = 'toggleButton off';
    }
    
    return toggleButtonElement;
  },
  changeInput: function (textToDo) {
    var changeInputElement = document.createElement('input');
    changeInputElement.value = textToDo;
    changeInputElement.className = 'changeInput';

    return changeInputElement;
  },
  changeButton: function (textToDo) {
    var changeButtonElement = document.createElement('button');
    changeButtonElement.textContent = textToDo;
    changeButtonElement.className = 'changeButton';

    return changeButtonElement;
  // refactor to functions in one, one create function for two cases
  },
  setupEventListeners: function () {
    var Ulist = document.querySelector('ul');
    Ulist.addEventListener('click', function (event) {
      if (event.target.className === 'deleteButton'){
      let position = parseInt(event.target.parentNode.id);
      handlers.deleteToDo(position);
    } else if (event.target.classList.contains('toggleButton')) {
      let position = parseInt(event.target.parentNode.id);
      handlers.toggleToDo(position);
      // add to target cases: 1) className = todoActiveButton 2) className = todoPassiveButton
    } else if (event.target.className === 'changeButton') { 
      
      let position = parseInt(event.target.parentNode.id);
      // edit mode on (next displayToDo create ul with active button)
      handlers.changeToDo(todoList.todos[position].textToDo, position, 'button');
      }
    });
    this.addEventListenerButton();
  },
  addEventListenerButton: function () {
    document.addEventListener('click', function (event) {
    var changeInput = document.querySelector(".changeInput"); 
    if (!event.target.closest(".changeInput") && !event.target.closest(".changeButton") && changeInput !== null) {

      let position = parseInt(changeInput.parentNode.id);
      let textToDo = changeInput.value;

      handlers.changeToDo(textToDo, position, 'input');
    }
  });
  },
}


view.setupEventListeners();

 