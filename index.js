const express = require("express");

const port = 3003;

const uuid = require("uuid");

const server = express();

server.use(express.json());

const users = [];

server.get("/users", (request, response) => {
  return response.status(201).json(users);
});

server.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(user);
});

server.put("/users/:id", (request, response) => {
  const { id } = request.params;

  const { name, age } = request.body;

  const updateUsers = { id, name, age };

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "user not found" });
  }

  users[index] = updateUsers;

  return response.status(201).json(updateUsers);
});

server.delete("/users/:id", (request, response) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "user not found" });
  }

  users.splice(index, 1);
  return response.status(204).json();
});

server.listen(port, () => {
  console.log(` 💀 † server started on port ${port} † 💀`);
});
