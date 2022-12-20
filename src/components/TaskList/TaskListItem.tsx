import React, { useState } from 'react';
import {
  ListItem,
  IconButton,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List/List';
import { useAppDispatch } from '../../store/hooks';
import { editTask, Task } from '../../store/modules/tasksSlice/tasksSlice';

interface TaskListItemProps {
  task: Task;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const pathName = location.pathname;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (task: Task) => {
    setOpen(true);
    setName(task.name);
    setDescription(task.description);
  };

  const handleEditTask = () => {
    dispatch(editTask({ id: task.id, changes: { name, description } }));
    alert('Task edit successfully');
    setOpen(false);
  };

  const handleCompleteTask = () => {
    const confirmCompleted = confirm('Complete task?');
    if (confirmCompleted) {
      alert('Task send to completed');
      dispatch(editTask({ id: task.id, changes: { status: 'Completed' } }));
      return;
    }
    alert(' The task was not completed');
  };
  const handleDeleteTask = () => {
    const confirmExclusion = confirm('Send to Trash?');
    if (confirmExclusion) {
      alert('Task send to trash');
      dispatch(editTask({ id: task.id, changes: { status: 'Erased' } }));
      return;
    }
    alert('Deletion canceled');
  };
  return (
    <>
      <List>
        <ListItem
          alignItems="flex-start"
          secondaryAction={
            pathName == '/home' ? (
              <>
                <IconButton
                  edge="end"
                  aria-label="complete"
                  onClick={() => handleCompleteTask()}
                  sx={{ paddingRight: '20px' }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleClickOpen(task)}
                  sx={{ paddingRight: '20px' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask()}>
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              ''
            )
          }
        >
          <ListItemText primary={'Task: '} secondary={task.name} />
          <ListItemText primary={'Description: '} secondary={task.description} />
          <ListItemText primary={'Status: '} secondary={task.status} />
        </ListItem>
        <Divider variant="middle" />
      </List>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Task</DialogTitle>
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
            <Button onClick={() => handleEditTask()}>Edit</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};
