
import { Fragment, useEffect, useRef, useState } from 'react';

function TaskView() {
    const [todos, setTodos] = useState(['Hi', 'Hello']);
    const todoText = useRef('');

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
        <form onSubmit={addTodo}>
            <input type='text' placeholder='What to do...' ref={todoText} /><br />
            <input type='submit' value='Add' />
        </form>
    );
}
export default TaskView;