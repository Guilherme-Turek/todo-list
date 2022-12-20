import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addUser, login, selectUsers, selectUsersById, User } from '../../store/modules/usersSlice/usersSlice';

export const FormSignInUp: React.FC = () => {
  const usersRedux = useAppSelector(selectUsers);

  const pathName = useLocation().pathname;
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userExist = useAppSelector(state => selectUsersById(state, username));

  const handleClear = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert('Preencha todos os campos');
      return;
    }
    if (username.length < 3) {
      alert('O campo de username precisa de no minimo 3 caracteres');
      return;
    }
    if (password.length < 4) {
      alert('O campo de password precisa de no minimo 4 caracteres');
      return;
    }
    if (password != confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    if (userExist) {
      alert('User already exists');
      return;
    }
    const newUser: User = {
      username,
      password,
      logged: false
    };
    dispatch(addUser(newUser));
    handleClear();
    alert(' User created successfully!');
    navigate('/');
  };

  const handleLogin = () => {
    const findUser = usersRedux.find(user => username === user.username && password === user.password);
    if (!findUser) {
      alert('Usuário não encontrado. Verifique os dados ou crie uma conta');
      return;
    }
    dispatch(login({ username }));
    navigate('/home');
  };

  return (
    <Container sx={{ padding: '20px', width: '450px' }}>
      <Grid container spacing={3} sx={{ backgroundColor: '#fff', borderRadius: '8px', padding: '25px' }}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            {pathName == '/' ? 'Login' : 'Create account'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username || ''}
            onChange={ev => setUsername(ev.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            value={password || ''}
            onChange={ev => setPassword(ev.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          {pathName == '/' ? (
            // <FormControlLabel
            //   control={<Checkbox />}
            //   //   onChange={ev => setLogged(ev.target.checked)}
            //   label="Keep me logged"
            // />
            ''
          ) : (
            <TextField
              id="outlined-basic"
              label="confirmPassword"
              type="password"
              variant="outlined"
              value={confirmPassword || ''}
              onChange={ev => setConfirmPassword(ev.target.value)}
              fullWidth
            />
          )}
        </Grid>
        <Grid container spacing={1} sx={{ marginY: '10px' }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {pathName == '/' ? (
              <Button variant="contained" onClick={() => handleLogin()} fullWidth>
                Login
              </Button>
            ) : (
              <Button variant="contained" onClick={() => handleRegister()} fullWidth>
                Register
              </Button>
            )}
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {pathName == '/' ? (
              <Button variant="contained" onClick={() => navigate('/register')} fullWidth>
                Make an account
              </Button>
            ) : (
              <Button variant="contained" onClick={() => navigate('/')} fullWidth>
                I already have an account
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
