import { useEffect, useRef, useState } from 'react';


import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import { Box } from '@mui/material';
import IconButton from '@mui/joy/IconButton';
import { Add, ExpandMoreOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/joy/Checkbox';

function TaskList() {
    const [todos, setTodos] = useState([]);
    const [check, setCheck] = useState([]);

    useEffect(() => {
        const userTodos = localStorage.getItem('todos');
        const userCheck = localStorage.getItem('check');
        setCheck(userCheck ? JSON.parse(userCheck) : []);
        setTodos(userTodos ? JSON.parse(userTodos) : []);
    }, [])

    function removeTodo(index) {
        todos.splice(index, 1);
        [...JSON.parse(localStorage.getItem('todos'))].splice(index, 1);
        check.splice(index, 1);
        [...JSON.parse(localStorage.getItem('check'))].splice(index, 1);

        setTodos([...todos])
        localStorage.setItem('todos', JSON.stringify([...todos]));
        setCheck([...check])
        localStorage.setItem('check', JSON.stringify([...check]));
    }

    return (
        <div>

            <List
                variant="outlined"
                sx={{
                    margin: '0 auto',
                    width: 500,
                    minHeight: 500,
                    borderRadius: 'sm',
                }}
            >
                <ListItem nested>
                    <ListSubheader sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2
                    }}>Todo List{<IconButton><Link to='/taskview'><Add /></Link></IconButton>}</ListSubheader>
                    <List>
                        {todos.map((todo, index) => (
                            <ListItem>
                                <ListItemButton sx={{ gap: 2 }}>
                                    <Checkbox color="primary" checked={check[index]} onChange={() => {
                                        check[index] = (!check[index]);
                                        setCheck([...check])
                                        localStorage.setItem('check', JSON.stringify([...check]));
                                    }} />
                                    {todo}
                                </ListItemButton>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button size="sm" variant="plain" color="neutral">
                                        Edit
                                    </Button>
                                    <Button onClick={() => removeTodo(index)} size="sm" variant="soft" color="danger">
                                        Delete
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </ListItem>
            </List>
        </div>
    );
}

export default TaskList;