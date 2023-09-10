import { Box, Container } from '@mui/material';
import './App.css';
import { Button, CssBaseline, CssVarsProvider, useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import TaskList from './TaskList';
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
  return (
    <Container>
      <CssVarsProvider defaultMode='system'>
        <CssBaseline />
        <main>
          <ModeToggle />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TaskList />
          </Box>
        </main>
      </CssVarsProvider>
    </Container>
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
