PRIORITY = { "LOW": 1, "MEDIUM": 3, "HIGH": 5, "URGENT": 7 };
 
function validInteger(value) {
  // Convert to a string, trim whitespace, and check for a non-negative integer format
  const trimmedValue = String(value).trim();
  return /^[0-9]+$/.test(trimmedValue) && Number(trimmedValue) >= 0;
}
 
const validatePriority = priority => [1, 3, 5, 7].includes(Number(priority)) ? Number(priority) : PRIORITY["LOW"];
 
function todaysDate() {
  const today = new Date();

  const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
  const month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
  const year = today.getFullYear();

  const hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
  const minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
  const seconds = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
 
class Task {
  constructor(title, priority, added = todaysDate()) {
    this._added = added;
    this._title = title;
    this._priority = validatePriority(priority);
  }
 
  get added() { return this._added; }
  get title() { return this._title; }
  get priority() { return this._priority; }
  set priority(newPriority) { this._priority = validatePriority(newPriority); }
}
 
class ToDo {
  constructor() { this._tasks = []; }
 
  add(task) {
    this._tasks.push(task);
    return this._tasks.length;
  }
 
  remove(title) {
    const initialLength = this._tasks.length;
    this._tasks = this._tasks.filter(task => task.title !== title);
    return this._tasks.length !== initialLength;
  }
 
  list(priority = 0) {
    return this._tasks
      .filter(task => priority === 0 || task.priority === priority)
      .map(task => [task.added, task.title, task.priority]);
  }
 
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