const PRIORITY = { LOW: 1, MEDIUM: 3, HIGH: 5, URGENT: 7 };

// Validates if a value is a non-negative integer
function validInteger(value) {
  // Convert to a string, trim whitespace, and check for a non-negative integer format
  const trimmedValue = String(value).trim();
  return /^[0-9]+$/.test(trimmedValue) && Number(trimmedValue) >= 0;
}

// Checks and returns a valid priority level, defaulting to 'LOW' if invalid
const validatePriority = priority => [1, 3, 5, 7].includes(Number(priority)) ? Number(priority) : PRIORITY["LOW"];

// Returns the current date and time in "DD/MM/YYYY HH:MM:SS" format
const todaysDate = () => {
  const today = new Date();
  const formatNumber = num => (num < 10 ? `0${num}` : num);
  const day = formatNumber(today.getDate());
  const month = formatNumber(today.getMonth() + 1);
  const year = today.getFullYear();
  const hours = formatNumber(today.getHours());
  const minutes = formatNumber(today.getMinutes());
  const seconds = formatNumber(today.getSeconds());
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Class representing a Task with title, priority, and date added
class Task {
  #added;   // Private field for date added
  #title;   // Private field for title
  #priority; // Private field for priority level

  constructor(title, priority, added = todaysDate()) {
    this.#added = added; // Date task was added
    this.#title = title; // Title of the task
    this.#priority = validatePriority(priority); // Priority level
  }

  // Getters and setters for task properties
  get added() { return this.#added; }
  get title() { return this.#title; }
  get priority() { return this.#priority; }
  set priority(newPriority) { this.#priority = validatePriority(newPriority); }
}

// Class representing a To-Do list, which manages multiple tasks
class ToDo {
  #tasks; // Private field for storing tasks

  constructor() {
    this.#tasks = []; // Initialize an empty array to store tasks
  }

  // Adds a new task to the list; returns the updated list length
  add(task) {
    this.#tasks.push(task);
    return this.#tasks.length;
  }

  // Removes a task by title; returns true if a task was removed, false if not
  remove(title) {
    const initialLength = this.#tasks.length;
    this.#tasks = this.#tasks.filter(task => task.title !== title);
    return this.#tasks.length < initialLength;
  }

  // Lists tasks, optionally filtered by priority; default shows all tasks
  list(priority = 0) {
    return this.#tasks
      .filter(task => !priority || task.priority === priority)
      .map(task => [task.added, task.title, task.priority]);
  }

  // Retrieves a task by title; logs an error if the task is not found
  task(title) {
    const foundTask = this.#tasks.find(task => task.title === title);
    if (foundTask) return foundTask;
    throw new Error(`Task '${title}' Not Found`);
  }
}

// Leave this code here for the automated tests
module.exports = {
  PRIORITY, validInteger, validatePriority, todaysDate, ToDo, Task,
}