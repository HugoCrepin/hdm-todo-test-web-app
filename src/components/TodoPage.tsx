import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';
import './TodoPage.css';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      handleFetchTasks();
    })();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleFetchTasks = async () => {
    const fetchedTasks = await api.get('/tasks');
    if (Array.isArray(fetchedTasks)) {
      setTasks(fetchedTasks);
    } else {
      console.error("La réponse de l'API n'est pas un tableau :", fetchedTasks);
      setTasks([]);
    }
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    await handleFetchTasks();
  };

  const handleSave = async () => {
    if (!taskName) return;

    const data = {
        name: taskName,
        id: editingTaskId,
    };

    if (editingTaskId) {
        await api.patch(`/tasks/${editingTaskId}`, data);
        setEditingTaskId(null);
    } else {
        await api.post('/tasks', data);
    }

    setTaskName('');
    await handleFetchTasks();
};





  const handleEdit = (task: Task) => {
    setTaskName(task.name);
    setEditingTaskId(task.id);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
        <Button onClick={() => setIsDarkMode(!isDarkMode)} style={{ marginLeft: '20px' }}>
          {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
        </Button>
      </Box>
      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
            <TextField
              size="small"
              value={task.name}
              fullWidth
              sx={{ maxWidth: 350 }}
              onClick={() => handleEdit(task)}
            />
            <Box>
              <IconButton color="success" disabled>
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Nouvelle tâche"
            sx={{ maxWidth: 350 }}
          />
          <Button variant="outlined" onClick={handleSave}>
            {editingTaskId ? 'Modifier la tâche' : 'Ajouter une tâche'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TodoPage;
