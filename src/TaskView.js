import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, Button, CssBaseline, CssVarsProvider, FormControl, FormLabel, Input, List, ListItem, ListItemContent, Textarea, useColorScheme } from '@mui/joy';
import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ModeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="soft"
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
            }}
        >
            {mode === 'light' ? <DarkMode /> : <LightMode />}
        </Button>
    );
}

function TaskView() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [check, setCheck] = useState([]);
    const [todoText, setTodoText] = useState('');
    const [textArea, setTextArea] = useState('');
    const [due, setDue] = useState('');
    const [dates, setDates] = useState([]);
    const [description, setDescription] = useState([]);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        const userTodos = localStorage.getItem('todos');
        const userCheck = localStorage.getItem('check');
        const editIndex = localStorage.getItem('index');
        const userDescription = localStorage.getItem('description');
        const userDates = localStorage.getItem('dates');
        setIndex(editIndex ? JSON.parse(editIndex) : -1);
        setCheck(userCheck ? JSON.parse(userCheck) : []);
        setTodos(userTodos ? JSON.parse(userTodos) : []);
        setDescription(userDescription ? JSON.parse(userDescription) : []);
        setDates(userDates ? JSON.parse(userDates) : []);
    }, [])

    useEffect(() => {
        if (index >= 0) {
            setTodoText(todos[index]);
            setTextArea(description[index]);
            setDue(dates[index]);
            localStorage.setItem('index', -1);
        }
    }, [index])

    function addTodo(event) {
        if (todoText != '' && index < 0) {
            event.preventDefault();
            // todos.unshift(todoText.current.value);
            todos.push(todoText);
            check.push(false);
            description.push(textArea);
            dates.push(due);
            setTodos([...todos]);
            setDescription([...description]);
            setDates([...dates]);
            localStorage.setItem('todos', JSON.stringify([...todos]));
            localStorage.setItem('check', JSON.stringify([...check]));
            localStorage.setItem('description', JSON.stringify([...description]));
            localStorage.setItem('dates', JSON.stringify([...dates]));
            setTodoText('');
        }
        else {
            event.preventDefault();
            todos[index] = todoText
            description[index] = textArea
            localStorage.setItem('todos', JSON.stringify([...todos]));
            localStorage.setItem('description', JSON.stringify([...description]));
            setTodoText('');
        }
        navigate(-1);
    }

    return (
        <Container>
            <CssVarsProvider>
                <CssBaseline />
                <main>
                    <ModeToggle />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                        <form onSubmit={addTodo} >
                            <FormControl sx={{ gap: 2 }}>
                                <FormLabel>Todo</FormLabel>
                                <Input value={todoText} placeholder='Task to do...' onChange={(event) => { setTodoText(event.currentTarget.value) }} required />
                            </FormControl>
                            <FormControl sx={{ gap: 2 }}>
                                <FormLabel>Description</FormLabel>
                                <Textarea value={textArea} placeholder='Enter Description...' onChange={(event) => { setTextArea(event.currentTarget.value); }} />
                            </FormControl>
                            <FormControl sx={{ gap: 2 }}>
                                <FormLabel>Due Date</FormLabel>
                                <Input
                                    value={due}
                                    onChange={(event) => { setDue(event.currentTarget.value) }}
                                    type="date"
                                    slotProps={{
                                        input: {
                                            min: '2023-09-07T00:00',
                                            max: '2030-09-14T00:00',
                                        },
                                    }}
                                />
                                <Button type='submit'>Add</Button>
                                <Button onClick={() => {
                                    navigate(-1);
                                }}>Go Back</Button>
                            </FormControl>
                        </form>
                    </Box>
                </main>
            </CssVarsProvider>
        </Container >
    );
}
export default TaskView;