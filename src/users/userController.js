import userService from "./userService";

async function getAllUsers(request, reply) {
  const users = await userService.getAllUsers();
  return { users };
}

async function getUserById(request, reply) {
  const { id } = request.params;
  const user = await userService.getUserById(id);
  return { user };
}

async function craeteUser(request, reply) {
  const { email, password } = request.body;
  const user = await userService.createUser(email, password);
  return { user };
}

async function loginUser(request, reply) {
  const { email, password } = request.body;
  const token = await userService.loginUser(email, password, request.server);
  return { token };
}

async function updateUser(request, reply) {
  const { id } = request.params;
  const { email } = request.body;

  const updatedUser = await userService.updateUser(id, email);
  return { updatedUser };
}

async function deleteUser(request, reply) {
  const { id } = request.params;

  const deletedUser = await userService.deleteUser(id);
  return { deletedUser };
}

export default {
  getAllUsers,
  getUserById,
  loginUser,
  craeteUser,
  updateUser,
  deleteUser,
};
