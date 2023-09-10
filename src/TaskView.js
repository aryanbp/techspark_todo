import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';


function TaskView() {
    const [todos, setTodos] = useState([]);
    const todoText = useRef('');
    const [check, setCheck] = useState([])

    useEffect(() => {
        const userTodos = localStorage.getItem('todos');
        const userCheck = localStorage.getItem('check');
        setCheck(userCheck ? JSON.parse(userCheck) : []);
        setTodos(userTodos ? JSON.parse(userTodos) : []);
    }, [])

    function addTodo(event) {
        if (todoText.current.value != '') {
            event.preventDefault();
            // todos.unshift(todoText.current.value);
            todos.push(todoText.current.value);
            check.push(false)
            setTodos([...todos]);
            localStorage.setItem('todos', JSON.stringify([...todos]));
            localStorage.setItem('check', JSON.stringify([...check]));
            todoText.current.value = '';
        }
    }

    return (
        <Container>
            <CssVarsProvider>
                <CssBaseline />
                <form onSubmit={addTodo}>
                    <input type='text' placeholder='What to do...' ref={todoText} /><br />
                    <input type='submit' value='Add' />
                </form>
            </CssVarsProvider>
        </Container>
    );
}
export default TaskView;