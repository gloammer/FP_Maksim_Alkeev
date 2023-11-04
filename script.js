class User {
  #id;
  #name;
  #email;

  get id() {
    return this.#id;
  }

  get email() {
    return this.#email;
  }

  set email(newEmail) {
    this.#email = newEmail;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  constructor(id, name, email) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  display() {
    return `User ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
  }
}

class Task {
  #id;
  #title;
  #description;
  #status;

  constructor(id, title, description, status = "ToDo") {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#status = status;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  set title(newTitle) {
    this.#title = newTitle;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get status() {
    return this.#status;
  }

  set status(newStatus) {
    this.#status = newStatus;
  }

  display() {
    return `Task ID: ${this.#id}, Title: ${this.#title}, Description: ${
      this.#description
    },Status: ${this.#status}`;
  }
}

class TaskList {
  #id;
  #name;
  #tasks = [];

  constructor(id, name) {
    this.#id = id;
    this.#name = name;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get tasks() {
    return this.#tasks;
  }

  addTask(id, title, description, status) {
    this.tasks.push(new Task(id, title, description, status));
  }

  removeTask(id) {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  display() {
    let taskListInfo = `List ID: ${this.#id}, Name: ${this.#name}\nTasks:\n`;

    this.tasks.forEach((task) => {
      taskListInfo += task.display() + "\n";
    });

    return taskListInfo;
  }
}

class UserTaskList extends TaskList {
  #id;
  #user;

  get id() {
    return this.#id;
  }

  get user() {
    return this.#user;
  }

  constructor(id, task_list_id, name, user) {
    super(task_list_id, name);

    this.#id = id;
    this.#user = user;
  }

  display() {
    return `User: {id: ${this.#user.id}, name: ${
      this.#user.name
    }}\n${super.display()}`;
  }
}

module.exports = { User, Task, TaskList, UserTaskList };
