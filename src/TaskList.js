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
import { Modal, ModalClose, Sheet, Typography } from '@mui/joy';


function TaskList() {
    const [todos, setTodos] = useState([]);
    const [check, setCheck] = useState([]);
    const [open, setOpen] = useState(false);
    const dues = useRef([]);
    const desc = useRef([]);

    useEffect(() => {
        const userTodos = localStorage.getItem('todos');
        const userCheck = localStorage.getItem('check');
        const userDescription = localStorage.getItem('description');
        const userDates = localStorage.getItem('dates');
        setCheck(userCheck ? JSON.parse(userCheck) : []);
        setTodos(userTodos ? JSON.parse(userTodos) : []);
        dues.value = (userDates ? JSON.parse(userDates) : []);
        desc.value = (userDescription ? JSON.parse(userDescription) : []);
    }, [])

    function removeTodo(index) {
        todos.splice(index, 1);
        [...JSON.parse(localStorage.getItem('todos'))].splice(index, 1);
        check.splice(index, 1);
        [...JSON.parse(localStorage.getItem('check'))].splice(index, 1);
        // (dues.value).splice(index, 1);
        console.log(dues);
        [...JSON.parse(localStorage.getItem('dates'))].splice(index, 1);

        setTodos([...todos])
        localStorage.setItem('todos', JSON.stringify([...todos]));
        setCheck([...check]);
        localStorage.setItem('check', JSON.stringify([...check]));
        // localStorage.setItem('dates', JSON.stringify([...dues]));
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
                            <ListItem sx={{ gap: 2 }}>
                                <Checkbox sx={{ marginTop: '6px' }} color="primary" checked={check[index]} onChange={() => {
                                    check[index] = (!check[index]);
                                    setCheck([...check])
                                    localStorage.setItem('check', JSON.stringify([...check]));
                                }} />
                                <ListItemButton onClick={() => {
                                    setOpen(true);
                                    console.log(dues);
                                }} sx={{ gap: 2 }}>
                                    {todo}
                                </ListItemButton>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Sheet
                                        variant="outlined"
                                        sx={{
                                            maxWidth: 500,
                                            borderRadius: 'md',
                                            p: 3,
                                            boxShadow: 'lg',
                                        }}
                                    >
                                        <ModalClose
                                            variant="outlined"
                                            sx={{
                                                top: 'calc(-1/4 * var(--IconButton-size))',
                                                right: 'calc(-1/4 * var(--IconButton-size))',
                                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                                borderRadius: '50%',
                                                bgcolor: 'background.surface',
                                            }}
                                        />
                                        <Typography
                                            component="h2"
                                            id="modal-title"
                                            level="h4"
                                            textColor="inherit"
                                            fontWeight="lg"
                                            mb={1}
                                        >
                                            Due at {(dues.value)[index]}
                                        </Typography>
                                        <Typography id="modal-desc" textColor="text.tertiary">
                                            {(desc.value)[index]}
                                        </Typography>
                                    </Sheet>
                                </Modal>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button onClick={() => {
                                        localStorage.setItem('index', index);
                                    }} size="sm" variant="plain" color="neutral">
                                        <Link to='/taskview'>Edit</Link>
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