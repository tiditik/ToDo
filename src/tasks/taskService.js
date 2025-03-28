import { PrismaClient } from "@prisma/client";
import { sendNotification } from "../rabbitmq";


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
      where: {
        id: id
      },
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
      creatorId: userId,
    };

    if (description != undefined) {
      taskData.description = description;
    }

    const task = await prisma.task.create({
      data: taskData
    });

    // Отправим сообщение в rabbitmq
    const newTaskData = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      craetedAd: task.createdAt
    };

    sendNotification( {action: 'create', task: newTaskData} );
    return task;
  } catch (error) {
    console.error(error)
    throw new Error("Не удалось создать задачу.");
  }
}
async function updateTask(id, title, description, status) {
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        status: status
      }
    });

    // Отправим сообщение в rabbitmq
    const updatedTaskData = {
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      status: updatedTask.status,
      userId: updatedTask.userId,
      updatedTask: updatedTask.updatedAt
    };

    sendNotification({ action: 'update', task: updatedTaskData });

    return { updatedTask };
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error("Не удалось найти задачу.")
    } 
    throw new Error("Не удалось обновить задачу.");
  }
}
async function deleteTask(id) {
  try {
    const deletedTask = await prisma.task.delete({
      where: {
        id: id
      }
    });

    sendNotification( { action: 'delete', task: deletedTask } );
    return deletedTask;
  } catch (error) {
    if (error.code === 'P2025') {
      throw new Error("Задача не найдена.");
    }
    throw new Error("Не удалось удалить задачу.")
  }
}

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};