const inputText = document.querySelector(".input-text");
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const radioOption = document.querySelectorAll(".form-check-input");
const radioContainer = document.querySelector(".radio-container");
const date = document.querySelector(".date");
const notification = document.querySelector(".notifications");

function newTodo() {
  todoBtn.addEventListener("click", (e) => {
    e.preventDefault;

    //Create new todo container
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoList.prepend(todoItem);

    //Add li to tod container

    const todo = document.createElement("li");
    todo.classList.add("todo");

    //Adding todo's and handling toast messages
    let x;
    let y;

    if (!inputText.value) {
      clearTimeout(x);
      notification.classList.add("active--orange");
      notification.innerHTML = `<h5><i class="bi bi-exclamation-triangle-fill"></i>Cannot create an empty todo</h5>`;
      x = setTimeout(() => {
        notification.classList.remove("active--orange");
      }, 3000);
      return;
    } else if (inputText.value) {
      clearTimeout(y);
      todo.innerHTML = `<textarea disabled class="text-area" >${inputText.value}</textarea>`;
      todoItem.prepend(todo);
      notification.classList.add("active--green");
      notification.innerHTML = `<h5><i class="bi bi-check-lg"></i>Todo added</h5>`;
      y = setTimeout(() => {
        notification.classList.remove("active--green");
      }, 2000);
    }

    //Clearing input after tod is added
    inputText.value = "";

    //Due date
    if (date.value) {
      const dueDate = document.createElement("div");
      dueDate.innerHTML = `<i class="bi bi-calendar-week-fill icon-calender"></i>`;
      dueDate.classList.add("due-date-container");
      dueDate.innerHTML = `<textArea disabled type="number" class="text-area due-date-text-area">  ${date.value} </textArea>`;
      todoItem.append(dueDate);
    }
    //Clear date selector after todo submittion
    date.value = "";

    //Add edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    editButton.classList.add("edit-button");
    todoItem.append(editButton);

    //Implementing edit for the edit button
    const dueDateTextArea = document.querySelector(".due-date-text-area");
    editButton.addEventListener("click", () => {
      dueDateTextArea.toggleAttribute("disabled");
    });

    const todoTextArea = document.querySelector(".todo-text-area");

    editButton.addEventListener("click", () => {
      todoTextArea.toggleAttribute("disabled");
    });

    //Add complete button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="bi bi-check-circle"></i>';
    completeButton.classList.add("complete-button");
    todoItem.append(completeButton);

    //Add level of importance

    radioOption.forEach((opt) => {
      if (opt.checked && opt.value === "high") {
        todoList.firstChild.style.backgroundColor = "#ff8469";
      } else if (opt.checked && opt.value === "medium") {
        todoList.firstChild.style.backgroundColor = "#fcebb6";
      } else if (opt.checked && opt.value === "low") {
        todoList.firstChild.style.backgroundColor = "#9ce3b2";
      }
    });

    //Deselect radio button on todo addition
    radioOption.forEach((opt) => {
      opt.checked = false;
    });

    //Implementing task counter
    const taskCounter = document.querySelector(".task-counter");
    const tasks = document.querySelectorAll(".todo-item");

    const totalTasks = [];
    function totalTasks1() {
      for (let i = 0; i <= tasks.length - 1; i++) {
        totalTasks.push(tasks[i]);
      }
    }
    totalTasks1();

    taskCounter.innerHTML = `<h3>You currently have <span class="counter">${
      totalTasks.length
    }</span> tod${totalTasks.length === 1 ? "o" : "o's"}</h3>`;

    //Implementing task counter color changes
    const counter = document.querySelector(".counter");

    if (totalTasks.length <= 5) {
      counter.style.color = "#9ce3b2";
    } else if (totalTasks.length <= 10) {
      counter.style.color = "#fcebb6";
    } else {
      counter.style.color = "#ff8469";
    }
  });
}

newTodo();

//Implementing delete and complete buttons

todoList.addEventListener("click", (e) => {
  const selected = e.target;

  if (selected.classList[0] == "complete-button") {
    const todo = selected.parentElement;
    selected.addEventListener("click", () => {
      todo.remove();
    });
  }
});
