import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormSignInUp } from '../components/FormSignInUp/FormSingInUp';
import { useAppSelector } from '../store/hooks';
import { selectUsers } from '../store/modules/usersSlice/usersSlice';

export const SignUp: React.FC = () => {
  const usersRedux = useAppSelector(selectUsers);
  const userLogged = usersRedux.find(user => user.logged);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogged) {
      navigate('/home');
    }
  }, [usersRedux]);
  return (
    <div className="Content">
      <Container maxWidth="xl" sx={{ paddingBottom: '20px', textAlign: 'center' }}>
        <Typography variant="h3" mb={4} sx={{ color: '#fff' }}>
          Task Notes
        </Typography>
        <FormSignInUp />
      </Container>
    </div>
  );
};
