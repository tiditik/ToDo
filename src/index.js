import figlet from "figlet";
import Fastify from "fastify";
import userRoute from "./users/userRoutes.js";
import jwtPlugin from "./plugins/jwtPlugin.js";
import taskRoute from "./tasks/taskRoutes.js";


const fastify = Fastify({
  logger: true,
});

fastify.register(jwtPlugin);
fastify.register(userRoute, { prefix: "api/users" });
fastify.register(taskRoute, { prefix: "api/tasks" });

// Функция запуска сервера.
const start = async () => {
  try {
    await fastify.listen({ port: Bun.env.PORT });
    console.log(await figlet.text("TaskAlert"));
    console.log(`Server is now listening on port ${Bun.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Запускаем сервер.
start();
