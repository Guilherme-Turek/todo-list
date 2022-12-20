import { Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { TaskListItem } from '../components/TaskList/TaskListItem';
import { selectTasks } from '../store/modules/tasksSlice/tasksSlice';
import { selectUsers } from '../store/modules/usersSlice/usersSlice';
import { useNavigate } from 'react-router-dom';
import DrawerAppBar from '../components/Appbar/DrawerAppBar';

export const CompletedTasks: React.FC = () => {
  const navigate = useNavigate();
  const TasksRedux = useAppSelector(selectTasks);
  const usersRedux = useAppSelector(selectUsers);
  const userLogged = usersRedux.find(user => user.logged);
  const userTasks = TasksRedux.filter(task => task.username == userLogged?.username && task.status == 'Completed');

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, [usersRedux]);

  return (
    <>
      <DrawerAppBar />
      <div className="Home">
        <Container maxWidth="lg" fixed sx={{ paddingBottom: '20px' }}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4" textTransform="uppercase" sx={{ mt: '75px', color: '#fff' }}>
              Tasks Completed
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ padding: '5px' }}>
              {userTasks.map(item => {
                return <TaskListItem key={item.id} task={item} />;
              })}
            </Paper>
          </Grid>
        </Container>
      </div>
    </>
  );
};
