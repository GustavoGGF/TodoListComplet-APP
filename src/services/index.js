// Selecionando elemento
const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInp = document.querySelector("#search-input");
const searchClear = document.querySelector("#erase-button");
const filter = document.querySelector("#filter-select");
var List = [];

let oldTitle;

//  Funções
const saveList = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  List.push(text);
  ArrayJSON = JSON.stringify(List);
  localStorage.setItem("lista", ArrayJSON);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.classList.add("bi");
  doneBtn.classList.add("bi-check-lg");
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.classList.add("bi");
  editBtn.classList.add("bi-pencil");
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.classList.add("bi");
  removeBtn.classList.add("bi-trash3");
  todo.appendChild(removeBtn);

  todoList.appendChild(todo);

  listInput.value = "";
  listInput.focus();
};

const toggleForm = () => {
  editForm.classList.toggle("hide");
  listForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
  cancelEditBtn.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todo = document.querySelectorAll(".todo");

  todo.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText == oldTitle) {
      todoTitle.innerText = text;
    }
  });
};

const searchtodo = (text) => {
  const todo = document.querySelectorAll(".todo");

  todo.forEach((todo) => {
    let title = todo.querySelector("h3");

    if (!title.innerText.includes(text)) {
      const parent = title.closest("div");
      parent.style.display = "none";
    } else {
      const parent = title.closest("div");
      parent.style.display = "flex";
    }
  });
};

const filteroption = (text) => {
  const todo = document.querySelectorAll(".todo");

  todo.forEach((todo) => {
    if (text == "done" && !todo.classList.contains("done")) {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
    if (text == "todo" && todo.classList.contains("done")) {
      todo.style.display = "none";
    }
    if (text == "all") {
      todo.style.display = "flex";
    }
  });
};

// Eventos
listForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = listInput.value;

  if (inputValue) {
    saveList(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const target = e.target;
  const parent = target.closest("div");
  let todoTitle;

  if (parent && parent.querySelector("h3")) {
    todoTitle = parent.querySelector("h3").innerText;
  }

  if (target.classList.contains("finish-todo")) {
    parent.classList.toggle("done");
  }

  if (target.classList.contains("remove-todo")) {
    parent.remove();
  }

  if (target.classList.contains("edit-todo")) {
    toggleForm();

    editInput.value = todoTitle;
    oldTitle = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForm();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInpvalue = editInput.value;

  if (editInpvalue) {
    updateTodo(editInpvalue);
  }

  toggleForm();
});

searchInp.addEventListener("keyup", (e) => {
  e.preventDefault();

  const searchValue = searchInp.value;

  searchtodo(searchValue);
});

searchClear.addEventListener("click", (e) => {
  e.preventDefault();

  searchInp.value = "";

  searchtodo((searchInp.value = ""));
});

filter.addEventListener("click", (e) => {
  e.preventDefault();

  const filterValue = filter.value;

  filteroption(filterValue);
});

listaNova = JSON.parse(localStorage.getItem("lista"));
if (listaNova.length > 1) {
  for (let i = 0; i < listaNova.length; i++) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.classList.add("bi");
    doneBtn.classList.add("bi-check-lg");
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.classList.add("bi");
    editBtn.classList.add("bi-pencil");
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.classList.add("bi");
    removeBtn.classList.add("bi-trash3");
    todo.appendChild(removeBtn);

    todoList.appendChild(todo);

    todoTitle.innerText = listaNova[i];
    console.log(i);
  }
}
