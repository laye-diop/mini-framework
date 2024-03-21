import { Component } from "./component.js";

let todoCounter = 1;

function generateId() {
  return todoCounter++;
}

export class Todo extends Component {
  constructor() {
    super();
    this.proxyUser.data = JSON.parse(localStorage.getItem("todos")) || [];
    this.allChecked = false;
  }

  render() {
    let route = window.location.hash.slice(1);
    let filteredData = this.proxyUser.data;

    if (route === "/active") {
      filteredData = this.proxyUser.data.filter((item) => !item.completed);
    } else if (route === "/completed") {
      filteredData = this.proxyUser.data.filter((item) => item.completed);
    }

    return this.parse(
      `
        <div class="toggle-all-container">
        <input class="toggle-all" type="checkbox"  />
        <label for="toggle-all" class="">Mark all as complete</label>
        </div>

        <ul class="todo-list">
            ## for (let [index ,item] of data.entries()) { ##    
                <li data-id="{= item.id =}" class="{= item.completed ? 'completed' : '' =}">
                    ## if (!item.editing) { ##
                        <div class="view">
                            <input class="toggle" type="checkbox" {= item.completed ? 'checked' : '' =} />
                            <label >{= item.value =}</label>
                            <button class="destroy" />
                        </div>
                    ## } else { ##
                        <div class="input-container">
                            <input value={= item.value =} class="edit" autofocus />
                            <label class="visually-hidden" for="edit-todo-input">Edit Todo Input</label>
                        </div>
                    ## } ##
                </li>
            ## } ##
        </ul>


        <footer class="footer">
        <span class="todo-count">
            <strong>{=JSON.parse(localStorage.getItem("todos")) == undefined ? 0 : JSON.parse(localStorage.getItem("todos")).filter(item => !item.completed).length  =}</strong>
          items left
        </span>
    
        <ul class="filters">
            <li><a class="selected" href="#/">All</a></li>
            <li><a  href="#/active">Active</a></li>
            <li><a  href="#/completed">Completed</a></li>
        </ul>
    
        <button class="clear-completed" > Clear completed </button>
    </footer>
        `,
      filteredData
    );
  }

  events() {
    this.proxyUser.data.forEach((item, index) => {
      this.addEventWithDataSet(
        `[data-id="${item.id}"] .toggle`,
        "change",
        (event) => {
          item.completed = !item.completed;

          this.saveTodos();
          this.proxyUser.data = this.proxyUser.data;
        }
      );

      this.addEventWithDataSet(
        `[data-id="${item.id}"] label`,
        "dblclick",
        () => {
          const todoItem = this.proxyUser.data.find(
            (todo) => todo.id == item.id
          );
          if (todoItem) {
            todoItem.editing = true;
            this.proxyUser.data = this.proxyUser.data;
          }
        }
      );

      this.addEventWithDataSet(
        `[data-id="${item.id}"] .edit`,
        "blur",
        (event) => {
          console.log("Todo Id: ", item.id);
          const todoItem = this.proxyUser.data.find(
            (todo) => todo.id == item.id
          );
          if (todoItem) {
            console.log("hereee", event);
            todoItem.value = event.target.value;
            todoItem.editing = false;
            this.saveTodos();
            this.proxyUser.data = this.proxyUser.data;
          }
        }
      );

      this.addEventWithDataSet(
        `[data-id="${item.id}"] .edit`,
        "keydown",
        (event) => {
          if (event.key === "Enter") {
            const todoItem = this.proxyUser.data.find(
              (todo) => todo.id == item.id
            );
            if (todoItem) {
              todoItem.value = event.target.value;
              todoItem.editing = false;
              this.saveTodos();
              this.proxyUser.data = this.proxyUser.data;
            }
          }
        }
      );

      this.addEventWithDataSet(
        `[data-id="${item.id}"] .destroy`,
        "click",
        () => {
          console.log("enter", item.id, index);
          this.proxyUser.data = this.proxyUser.data.filter(
            (todo) => todo.id !== item.id
          );
          this.saveTodos();
        }
      );

      this.addEvent(".clear-completed", "click", () => {
        console.log("Clear completed clicked");
        this.proxyUser.data = this.proxyUser.data.filter(
          (todo) => !todo.completed
        );
        this.saveTodos();
      });
    });

    this.addEventWithDataSet(".toggle-all-container label", "click", () => {
      console.log("here");
      if (!this.allChecked) {
        this.proxyUser.data.forEach((elem, ind) => {
          elem.completed = true;
          this.saveTodos();
        });
        this.allChecked = true;
        this.proxyUser.data = this.proxyUser.data;
      } else {
        this.proxyUser.data.forEach((elem, ind) => {
          elem.completed = false;
          this.saveTodos();
        });
        this.allChecked = false;
        this.proxyUser.data = this.proxyUser.data;
      }
    });
  }

  saveTodos() {
    localStorage.setItem("todos", JSON.stringify(this.proxyUser.data));
  }

  staticEvent() {
    this.addEventWithDataSet(".new-todo", "keydown", (ev) => {
      if (ev.key == "Enter") {
        var value = document.querySelector(".new-todo").value;
        let todo = {
          value: value,
          completed: false,
          editing: false,
          id: generateId(),
          checked: false,
        };
        this.proxyUser.data.push(todo) 
        this.saveTodos();
        this.proxyUser.data = this.proxyUser.data
      }
    });
  }
}
