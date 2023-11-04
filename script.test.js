const _ = require("./script");

// User
test("User: should create User", () => {
  const user = new _.User(1, "Alice", "alice@gmail.com");

  expect(user.id).toBe(1);
  expect(user.name).toBe("Alice");
  expect(user.email).toBe("alice@gmail.com");
  expect(user.display()).toBe(
    "User ID: 1, Name: Alice, Email: alice@gmail.com"
  );
});

test("User: should NOT change #id", () => {
  const user = new _.User(1, "Alice", "alice@gmail.com");

  user.id = 2;

  expect(user.id).toBe(1);
});

// Task
test("Task: should create Task", () => {
  const task = new _.Task(1, "WEB", "Lab #5", "Progress");

  expect(task.id).toBe(1);
  expect(task.title).toBe("WEB");
  expect(task.description).toBe("Lab #5");
  expect(task.status).toBe("Progress");
  expect(task.display()).toBe(
    "Task ID: 1, Title: WEB, Description: Lab #5,Status: Progress"
  );
});

// TaskList
test("TaskList: should create Task", () => {
  const taskList = new _.TaskList(1, "University");

  expect(taskList.id).toBe(1);
  expect(taskList.name).toBe("University");
  expect(taskList.tasks).toEqual([]);
});

test("TaskList: addTask", () => {
  const taskList = new _.TaskList(1, "University");

  taskList.addTask(2, "WEB", "Lab #5", "Progress");

  expect(taskList.tasks[0].display()).toBe(
    "Task ID: 2, Title: WEB, Description: Lab #5,Status: Progress"
  );
});

test("TaskList: removeTask", () => {
  const taskList = new _.TaskList(1, "University");

  taskList.addTask(2, "WEB", "Lab #5", "Progress");
  taskList.removeTask(2);

  expect(taskList.tasks.length).toBe(0);
});

test("TaskList: display", () => {
  const taskList = new _.TaskList(1, "University");

  taskList.addTask(2, "WEB", "Lab #5", "Progress");
  taskList.addTask(3, "TESTING", "Lab #1", "Closed");

  expect(taskList.display()).toBe(`List ID: 1, Name: University
Tasks:
Task ID: 2, Title: WEB, Description: Lab #5,Status: Progress
Task ID: 3, Title: TESTING, Description: Lab #1,Status: Closed
`);
});

// UserTaskList
test("UserTaskList: should create Task", () => {
  const user = new _.User(2, "Alice", "alice@gmail.com");
  const userTaskList = new _.UserTaskList(1, 5, "Alice University", user);

  expect(userTaskList.id).toBe(1);
  expect(userTaskList.user.display()).toBe(
    "User ID: 2, Name: Alice, Email: alice@gmail.com"
  );
});

test("UserTaskList: addTask", () => {
  const user = new _.User(2, "Alice", "alice@gmail.com");
  const userTaskList = new _.UserTaskList(1, 5, "Alice University", user);

  userTaskList.addTask(2, "WEB", "Lab #5", "Progress");

  expect(userTaskList.tasks[0].display()).toBe(
    "Task ID: 2, Title: WEB, Description: Lab #5,Status: Progress"
  );
});

test("UserTaskList: removeTask", () => {
  const user = new _.User(2, "Alice", "alice@gmail.com");
  const userTaskList = new _.UserTaskList(1, 5, "Alice University", user);

  userTaskList.addTask(2, "WEB", "Lab #5", "Progress");
  userTaskList.removeTask(2);

  expect(userTaskList.tasks.length).toBe(0);
});

test("UserTaskList: display", () => {
  const user = new _.User(2, "Alice", "alice@gmail.com");
  const userTaskList = new _.UserTaskList(1, 5, "Alice University", user);

  userTaskList.addTask(2, "WEB", "Lab #5", "Progress");
  userTaskList.addTask(3, "TESTING", "Lab #1", "Closed");

  expect(userTaskList.display()).toBe(`User: {id: 2, name: Alice}
List ID: 5, Name: Alice University
Tasks:
Task ID: 2, Title: WEB, Description: Lab #5,Status: Progress
Task ID: 3, Title: TESTING, Description: Lab #1,Status: Closed
`);
});
