import taskService from "./taskService.js";

async function getTasks(request, reply) {
  const tasks = await taskService.getTasks();
  return { tasks };
}
async function getTaskById(request, reply) {
  const { id } = request.params;

  const task = await taskService.getTaskById(id);
  return { task };
}
async function createTask(request, reply) {
  const requestAuthorization = request.headers.authorization;
  const token = requestAuthorization.split(" ")[1];

  const { title, description } = request.body;

  const task = await taskService.createTask(token, title, description, request.server);
  return { task };
}
async function updateTask(request, reply) {
  const { id } = request.params;
  const { title, description, status } = request.body;

  const updatedTask = await taskService.updateTask(id, title, description, status);
  return { updatedTask };
}
async function deleteTask(request, reply) {
  const { id } = request.params;

  const deletedTask = await taskService.deleteTask(id);
  return  { deletedTask };
}

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
