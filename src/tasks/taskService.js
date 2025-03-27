import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTasks() {}
async function getTaskById() {}
async function createTask() {}
async function updateTask() {}
async function deleteTask() {}

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
