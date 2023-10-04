const TodoHandler = require("./handlers/todo");
const middlewares = require("./middlewares");

module.exports = (io) => {
  const todoNamespace = io.of("/todo");

  const todoConnection = (socket) => {
    console.log("connected to socket.io");

    // handler
    const handler = new TodoHandler(socket);

    handler.getTodoList().then((data) => {
      socket.emit("todo:list", data);
    });

    // Create todo listener create
    socket.on("todo:create", handler.createTodo);

    // Get todo by id
    socket.on("todo:getById", handler.getTodoById);

    // Delete todo
    socket.on("todo:delete", handler.deleteTodo);
  };

  todoNamespace.on("connection", todoConnection);
};
