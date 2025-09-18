let todos = [];

module.exports = async function (context, req) {
    const {text} = req.body;

     if (!text || text.trim() === "") {
    context.res = {
      status: 400,
      body: { error: "ToDo darf nicht leer sein" },
    };
    return;
  }

  const newToDo = { id: Date.now(), text: text.trim() };
  todos.push(newToDo);

  context.res = {
    status: 201,
    headers: { "Content-Type": "application/json" },
    body: newToDo,
  };
};