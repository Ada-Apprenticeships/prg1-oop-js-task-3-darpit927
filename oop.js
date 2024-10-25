// Priority levels for tasks, mapped to integer values
const PRIORITY = { LOW: 1, MEDIUM: 3, HIGH: 5, URGENT: 7 };

// Validates if a value is a non-negative integer
function validInteger(value) {
  // Convert to a string, trim whitespace, and check for a non-negative integer format
  const trimmedValue = String(value).trim();
  return /^[0-9]+$/.test(trimmedValue) && Number(trimmedValue) >= 0;
}

// Checks and returns a valid priority level, defaulting to 'LOW' if invalid
const validatePriority = priority => [1, 3, 5, 7].includes(Number(priority)) ? Number(priority) : PRIORITY["LOW"]

// Returns the current date and time in "DD/MM/YYYY HH:MM:SS" format
const todaysDate = () => {
  const today = new Date();

  // Manually format each date component without using a helper function
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const year = today.getFullYear();
  const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
  const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
  const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Class representing a Task with title, priority, and date added
class Task {
  constructor(title, priority, added = todaysDate()) {
    this._added = added; // Date task was added
    this._title = title; // Title of the task
    this._priority = validatePriority(priority); // Priority level
  }

  // Getters and setters for task properties
  get added() { return this._added; }
  get title() { return this._title; }
  get priority() { return this._priority; }
  set priority(newPriority) { this._priority = validatePriority(newPriority); }
}

// Class representing a To-Do list, which manages multiple tasks
class ToDo {
  constructor() {
    this._tasks = []; // Initialize an empty array to store tasks
  }

  // Adds a new task to the list; returns the updated list length
  add(task) {
    this._tasks.push(task);
    return this._tasks.length;
  }

  // Removes a task by title; returns true if a task was removed, false if not
  remove(title) {
    const initialLength = this._tasks.length;
    this._tasks = this._tasks.filter(task => task.title !== title);
    return this._tasks.length < initialLength;
  }

  // Lists tasks, optionally filtered by priority; default shows all tasks
  list(priority = 0) {
    return this._tasks
      .filter(task => !priority || task.priority === priority)
      .map(({ added, title, priority }) => [added, title, priority]);
  }

  // Retrieves a task by title; logs an error if the task is not found
task(title) {
    const foundTask = this._tasks.find(task => task.title === title);
    if (foundTask) return foundTask;
    throw new Error(`Task '${title}' Not Found`);
  }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}