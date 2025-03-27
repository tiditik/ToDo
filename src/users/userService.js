import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error("Не удалось получить пользователей.");
  }
}

async function getUserById(id) {
  try {
    const user = await prisma.user.findFirst({ where: { id: id } });
    return user;
  } catch (error) {
    throw new Error("Не удалось получитья пользователя.");
  }
}

async function createUser(email, password) {
  try {
    // Для шифрования будем использовать встроенный в Bun методы хеширования (argon2 по дефолту)
    const passwordHash = await Bun.password.hash(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
      },
    });

    return user;
  } catch (error) {
    if (error.code === "P2002") {
      throw new Error("Пользователь с таким email уже существует.");
    } else {
      throw new Error("Не удалось создать пользователя.");
    }
  }
}

async function loginUser(email, password, fastifyInstance) {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new Error("Пользователя с таким email, не существует.");
    }
    // Если нашли, то сравним пароли
    const passwordsIsMatch = await Bun.password.verify(password, user.password);

    if (!passwordsIsMatch) {
      throw new Error("Ошибка в email или пароль.");
    }
    const token = await fastifyInstance.jwt.sign({
      id: user.id,
      email: user.email,
    });
    return token;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deletedUser;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Пользователь не найден.");
    }
    throw new Error("Не удалось удалить пользователя.");
  }
}

async function updateUser(id, email) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
      },
    });
    return updatedUser;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Пользователь не найден.");
    } else if (error.code === "P2002") {
      throw new Error("Email уже занят.");
    }

    throw new Error("Не удалось обновить пользователя.");
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  deleteUser,
  updateUser,
};
