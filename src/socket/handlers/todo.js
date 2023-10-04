const Todo = require("../../models/todo");

class TodoHandlers {
  constructor(socket) {
    // console.log(socket.id);
    this.socket = socket;
    this.createTodo = this.createTodo.bind(this);
    this.getTodoList = this.getTodoList.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  async createTodo(payload, callback) {
    const { title, completed } = payload;

    const todo = new Todo({ title, completed });
    await todo.save();

    callback(await this.getTodoList());
  }

  async getTodoById(payload, callback) {
    const { _id } = payload;

    const todo = await Todo.findById(_id);

    callback({ data: todo });
  }

  async deleteTodo(payload, callback) {
    const { _id } = payload;
    await Todo.findByIdAndDelete(_id);
    callback({
      message: "deleted successfully",
      ...(await this.getTodoList()),
    });
  }

  async getTodoList() {
    const list = await Todo.find();
    return { data: list };
  }
}

module.exports = TodoHandlers;
