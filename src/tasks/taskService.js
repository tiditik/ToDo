import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (error) {
    throw new Error("Не удалось получить задачи.");
  }
}
async function getTaskById(id) {
  try {
    const task = await prisma.task.findFirst({
      where: { id: id },
    });
    return task;
  } catch (error) {
    throw new Error("Не удалось получить задачу.");
  }
}
async function createTask(token, title, description, fastifyInstance) {
  try {
    const pyload = await fastifyInstance.jwt.decode(token);
    const userId = pyload.id;
  
    const taskData = {
      title: title,
      userId: userId,
    };
  
    // если есть описание то добавим описание
    if (description) {
      taskData.description = description;
    }
  
    const task = await prisma.task.create({ data: taskData });
    return task;
  } catch (error) {
    throw new Error("Не удалось создать задачу.");
  }

}
async function updateTask() {}
async function deleteTask() {}

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
