var newTask = document.querySelector("#new-task");
var addTaskBtn = document.querySelector("#addTask");
var toDoUl = document.querySelector(".todo-list ul");
var completeUl = document.querySelector(".complete-list ul");

var allTodos = [];

function createElement(tag, attrs = {}, children = []) {
  let dom = document.createElement(tag);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}
// creating new task
var createNewTask = function(task) {
  var listItem = createElement("li");
  var checkBox = createElement("input");
  var label = createElement("label");
  label.innerText = task;
  checkBox.type = "checkbox";
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  return listItem;
};

// adding tasks
var addTask = function() {
  var listItem = createNewTask(newTask.value);
  toDoUl.appendChild(listItem);
  newTask.value = "";
  bindIncompleteItems(listItem, completeTask);
  allTodos.push(listItem);
};

// completing tasks

var completeTask = function() {
  var listItem = this.parentNode;
  var deleteBtn = createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";
  listItem.appendChild(deleteBtn);
  var checkBox = listItem.querySelector("input[type=checkbox]");
  checkBox.remove();
  completeUl.appendChild(listItem);
  bindCompleteItems(listItem, deleteTask);
};

// deleting tasks
var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  allTodos.pop(listItem);
};

var bindIncompleteItems = function(taskItem, checkBoxClick) {
  var checkBox = taskItem.querySelector("input[type=checkbox]");
  checkBox.onchange = checkBoxClick;
};

var bindCompleteItems = function(taskItem, deleteButtonPress) {
  var deleteButton = taskItem.querySelector(".delete");
  deleteButton.onclick = deleteButtonPress;
};

for (var i = 0; i < toDoUl.children.length; i++) {
  bindIncompleteItems(toDoUl.children[i], completeTask);
}

for (var i = 0; i < completeUl.children.length; i++) {
  bindCompleteItems(completeUl.children[i], deleteTask);
}

addTaskBtn.addEventListener("click", addTask);
