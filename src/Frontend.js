import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Backend-API-URL (Azure Function)
  const API_BASE = "https://<deine-function-app>.azurewebsites.net/api";

  // Todos laden
  useEffect(() => {
    fetch(`${API_BASE}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, []);

  // Neues Todo hinzufügen
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const res = await fetch(`${API_BASE}/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });

    if (res.ok) {
      const added = await res.json();
      setTodos([...todos, added]);
      setNewTodo("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">☁️ Azure To-Do App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neues To-Do..."
          className="px-4 py-2 border rounded-lg w-64"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Hinzufügen
        </button>
      </div>

      <ul className="bg-white shadow-md rounded-lg w-80 p-4">
        {todos.length === 0 && <p className="text-gray-500">Noch keine Todos.</p>}
        {todos.map((todo, i) => (
          <li key={i} className="border-b py-2">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
