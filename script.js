window.addEventListener("load", () => {
  let todos = JSON.parse(localStorage.getItem("todos")) ?? [];
  const newTodoForm = document.querySelector("#new-task");

  if (newTodoForm) {
    newTodoForm.addEventListener("submit", (e) => {
      const form = e.target;
      const content = form.elements.content.value;
      e.preventDefault();
      if (content) {
        const todo = {
          id: todos.length + 1,
          content: content,
          done: false,
          createdAt: new Date().getTime(),
        };
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));

        form.reset();
        displayTodos();
      } else {
        alert("Please enter a todo");
      }
    });
  }
  const displayTodos = () => {
    const todoList = document.querySelector("#tasks #list");
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");
      if (todo.done) {
        todoItem.classList.add("done");
      }
      const label = document.createElement("label");
      todoItem.appendChild(label);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = todo.done;
      label.appendChild(input);

      const content = document.createElement("div");
      content.classList.add("todo-content");
      content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
      todoItem.appendChild(content);

      const actions = document.createElement("div");
      actions.classList.add("actions");
      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerHTML = "Edit";
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = "Delete";
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);

      input.addEventListener("change", (e) => {
        checkTodo(e, todo.id, todoItem);
      });
      editButton.addEventListener("click", () => {
        editTodo(todo.id, todoItem);
      });
      deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id);
      });
    });
  };
  const checkTodo = (e, id, item) => {
    const checked = e.target.checked;

    const todo = todos.find((t) => t.id === id);
    if (todo) {
      todo.done = checked;
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    if (checked) {
      item.classList.add("done");
    } else {
      item.classList.remove("done");
    }
  };
  const editTodo = (id, item) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const contentInput = item.querySelector(".todo-content input");
      contentInput.removeAttribute("readonly");
      contentInput.focus();
      contentInput.addEventListener("blur", (e) => {
        contentInput.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
      });
    }
  };
  const deleteTodo = (id) => {
    console.log("dsfsf");
    todos = todos.filter((t) => t.id !== id);
    console.log("todos", todos, id);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
  };
  displayTodos();
});
