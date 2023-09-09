import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const todoText = useRef();

  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
    todoText.current.value = '';
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
