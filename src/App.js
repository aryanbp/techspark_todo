import './App.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';


import CssBaseline from '@mui/joy/CssBaseline';
import Button from '@mui/joy/Button';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import { Box } from '@mui/material';
import { Add, CheckBox, DarkMode, LightMode } from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';
import { Sheet } from '@mui/joy';
import TaskView from './TaskView';


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


function App() {

  //SetUp Routes...
  const navigate = useNavigate();

  const navigateToTaskView = () => {
    // 👇️ navigate to /
    navigate('/taskview');
  };

  const [todos, setTodos] = useState(['Hi', 'Hello']);
  const todoText = useRef();

  useEffect(() => {
    const userTodos = localStorage.getItem('todos');
    setTodos(userTodos ? JSON.parse(userTodos) : []);
  }, [])

  function removeTodo(index) {
    todos.splice(index, 1);
    [...JSON.parse(localStorage.getItem('todos'))].splice(index, 1)

    setTodos([...todos])
    localStorage.setItem('todos', JSON.stringify([...todos]));
  }

  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <main>
        <ModeToggle />
        <div>
          <List
            variant="outlined"
            sx={{
              margin: '0 auto',
              width: 500,
              borderRadius: 'sm',
            }}
          >
            <ListItem nested>
              <ListSubheader sx={{
                gap: 2
              }}>Todo List{<IconButton onClick={navigateToTaskView}><Add /></IconButton>}</ListSubheader>
              <List>
                {todos.map((todo, index) => (
                  <ListItem>
                    <ListItemButton>{todo}</ListItemButton>
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
          <Routes>
            {/* <Route path="/tasklist" element={<Contacts />} /> */}
            <Route path="/taskview" element={<TaskView />} />
          </Routes>
        </div>
      </main>
    </CssVarsProvider>
  );

  // //SetUp Routes...
  // const navigate = useNavigate();

  // const navigateToTaskList = () => {
  //   // 👇️ navigate to /contacts
  //   navigate('/tasklist');
  // };

  // const navigateToTaskView = () => {
  //   // 👇️ navigate to /
  //   navigate('/taskview');
  // };


  // const [todos, setTodos] = useState([]);
  // const todoText = useRef();

  // useEffect(() => {
  //   const userTodos = localStorage.getItem('todos');
  //   setTodos(userTodos ? JSON.parse(userTodos) : []);
  // }, [])

  // function addTodo(event) {
  //   if (todoText.current.value != '') {
  //     event.preventDefault();
  //     // todos.unshift(todoText.current.value);
  //     todos.push(todoText.current.value);
  //     setTodos([...todos]);
  //     localStorage.setItem('todos', JSON.stringify([...todos]));
  //     todoText.current.value = '';
  //   }
  // }

  // function removeTodo(index) {
  //   todos.splice(index, 1);
  //   [...JSON.parse(localStorage.getItem('todos'))].splice(index, 1)

  //   setTodos([...todos])
  //   localStorage.setItem('todos', JSON.stringify([...todos]));
  // }
  // return (
  // <div>
  //   <ul>
  //     {todos.map((todo, index) => (<><li key={todo}>{todo}</li>
  //       <button onClick={() => removeTodo(index)}>X</button>
  //     </>))}
  //   </ul><br />
  // <form onSubmit={addTodo}>
  //   <input type='text' placeholder='What to do...' ref={todoText} /><br />
  //   <input type='submit' value='Add' />
  // </form>

  // <Routes>
  //     {/* <Route path="/tasklist" element={<Contacts />} /> */}
  //     <Route path="/taskview" element={<Home />} />
  //   </Routes>
  // </div>
  // );
  // <Box sx={{ display: 'flex', gap: 1 }}>
  //         <Button size="sm" variant="plain" color="neutral">
  //           Edit
  //         </Button>
  //         <Button size="sm" variant="soft" color="danger">
  //           Delete
  //         </Button>
  //       </Box>
}

export default App;
