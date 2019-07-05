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
    todoList.addToDo("name");    
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

    if (todoList.todos.length === 0) {
      console.log('todos array is empty');
      displayToDoOutput.appendChild(this.addButton('empty'));
      
    } else {
      todoList.todos.forEach ( function (todo, index) {
        var toDoElement = document.createElement('li');
        
        toDoElement.id = index;

        toDoElement.appendChild(this.toggleButton(index));
        toDoElement.appendChild(this.changeElement(todo.textToDo, index));
        toDoElement.appendChild(this.deleteButton());

        displayToDoOutput.appendChild(toDoElement);
      },this);
      
      displayToDoOutput.appendChild(this.addButton());
    }
  },
  addButton: function (status) {
    var addButtonElement = document.createElement('Button');
    addButtonElement.className = 'addButton';  
    
    if (status === 'empty') 
    addButtonElement.innerHTML = 'ADD TARGET';
    
    else if (status === undefined) 
    addButtonElement.innerHTML = 'MORE';
    
    var addContainer = document.createElement('li');
    addContainer.appendChild(addButtonElement);
    addContainer.className = 'addContainer';  
  
    return addContainer;
  },
  deleteButton: function () {
    var deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerHTML = 'x';
    deleteButtonElement.className = 'deleteButton';    
    
    return deleteButtonElement;
  },
  toggleButton: function (index) {
    var toggleButtonElement = document.createElement('div');
    
    if (todoList.todos[index].completed === true) {
      toggleButtonElement.className = 'toggleButton on';
      
    } else if (todoList.todos[index].completed === false) {
      toggleButtonElement.className = 'toggleButton off';
    }
    
    return toggleButtonElement;
  },
  changeElement: function (textToDo, index) {
    var changeElement = undefined;
    
    if (todoList.todos[index].edit === true){
      changeElement = document.createElement('input');
      changeElement.value = textToDo;
      changeElement.className = 'changeInput';
      
    } else if (todoList.todos[index].edit === false) {
      changeElement = document.createElement('button');
      changeElement.textContent = textToDo;
      changeElement.className = 'changeButton';
    }
    return changeElement;
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
      
    } else if (event.target.className === 'changeButton') { 
      let position = parseInt(event.target.parentNode.id);
      handlers.changeToDo(todoList.todos[position].textToDo, position, 'button');
      
    } else if (event.target.className === 'addButton') {
      handlers.addToDo();
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
view.displayToDo();
 