import userService from "./userService";

async function getUsers(request, reply) {
  const users = await userService.getUsers();
  return users;
}

async function craeteUser(request, reply) {
  return { user: { name: "Timur", age: 18 } };
}

async function updateUser(request, reply) {
  return { updated: { name: "Timur", age: 19 } };
}

async function deleteUser(request, reply) {
  return { deleted: { name: "Timur", age: 18 } };
}

export default { getUsers, craeteUser, updateUser, deleteUser };
