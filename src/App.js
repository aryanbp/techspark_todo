import { Box, Container } from '@mui/material';
import './App.css';
import { Button, CssBaseline, CssVarsProvider, useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import { DarkMode, LightMode } from '@mui/icons-material';
import TaskList from './TaskList';

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
}

export default App;
