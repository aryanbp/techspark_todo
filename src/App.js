import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const todoText = useRef();

  useEffect(() => {
    const userTodos = localStorage.getItem('todos');
    setTodos(userTodos ? JSON.parse(userTodos) : []);
  }, [])
  function addTodo(event) {
    if (todoText.current.value != '') {
      event.preventDefault();
      // todos.unshift(todoText.current.value);
      todos.push(todoText.current.value);
      setTodos([...todos]);
      localStorage.setItem('todos', JSON.stringify([...todos]));
      todoText.current.value = '';
    }
  }
  function removeTodo(index) {
    todos.splice(index, 1);
    [...JSON.parse(localStorage.getItem('todos'))].splice(index, 1)

    setTodos([...todos])
    localStorage.setItem('todos', JSON.stringify([...todos]));
  }
  return (
    <div style={{ margin: '0 auto' }}>
      <ul>
        {todos.map((todo, index) => (<><li key={todo}>{todo}</li><button onClick={() => removeTodo(index)}>X</button></>))}
      </ul><br />
      <form onSubmit={addTodo}>
        <input type='text' placeholder='What to do...' ref={todoText} /><br />
        <input type='submit' value='Add' />
      </form>
    </div>
  );
}

export default App;
