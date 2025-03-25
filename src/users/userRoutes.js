import userController from "./userController.js";

async function routes(fastify, options) {
  fastify.get("/", userController.getUsers);
  fastify.post("/", userController.craeteUser);
  fastify.put("/:id", userController.updateUser);
  fastify.delete("/:id", userController.deleteUser);
}

export default routes;
