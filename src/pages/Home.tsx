import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { TaskListItem } from '../components/TaskList/TaskListItem';
import { addTask, selectTasks, Task } from '../store/modules/tasksSlice/tasksSlice';
import { selectUsers } from '../store/modules/usersSlice/usersSlice';
import { useNavigate } from 'react-router-dom';
import DrawerAppBar from '../components/Appbar/DrawerAppBar';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const TasksRedux = useAppSelector(selectTasks);
  const usersRedux = useAppSelector(selectUsers);
  const userLogged = usersRedux.find(user => user.logged);
  const userTasks = TasksRedux.filter(task => task.username == userLogged?.username && task.status == 'Pendent');
  const [open, setOpen] = React.useState(false);
  const taskID = Math.floor(Date.now() / 1000);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, [usersRedux]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setName('');
    setDescription('');
  };

  const handleCreateTask = () => {
    if (description == '' || name == '') {
      alert('Preencha todos os campos');
      return;
    }
    const newTask: Task = {
      id: taskID,
      name: name,
      description,
      status: 'Pendent',
      username: userLogged!.username
    };
    dispatch(addTask(newTask));
    handleClear();
    handleClose();
  };

  return (
    <>
      <DrawerAppBar />
      <div className="Home">
        <Container maxWidth="lg" fixed sx={{ paddingBottom: '20px' }}>
          <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: '75px' }}>
              <Button variant="contained" onClick={handleClickOpen}>
                Add new task
              </Button>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add task</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    onChange={ev => setName(ev.target.value)}
                    label="Task"
                    value={name || ''}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    onChange={ev => setDescription(ev.target.value)}
                    label="Description"
                    value={description || ''}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreateTask}>Add</Button>
            </DialogActions>
          </Dialog>

          <Divider variant="middle" sx={{ my: '6px' }} />

          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" textTransform="uppercase" sx={{ my: '10px', color: '#fff' }}>
              Tasks pendent
            </Typography>
          </Grid>
          {userTasks && (
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ padding: '5px' }}>
                {userTasks.map(item => {
                  return <TaskListItem key={item.id} task={item} />;
                })}
              </Paper>
            </Grid>
          )}
        </Container>
      </div>
    </>
  );
};
