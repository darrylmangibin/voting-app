import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

import Copyright from 'components/copyright';

import * as routes from 'routes';
import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { userRegisterSelector, userAuthSelector } from 'selectors';

interface RegisterPageProps extends RouteComponentProps {}

interface RegisterPageUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterPage: FC<RegisterPageProps> = ({ history }) => {
  const [userData, setUserData] = useState<RegisterPageUserData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const { firstName, lastName, email, password } = userData;

  const { userRegister, userRegisterReset } = typedUseDispatch();

  const { loading } = typedUseSelector(userRegisterSelector);
  const { auth } = typedUseSelector(userAuthSelector);

  const onChangeUserData = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userRegister(userData);
  };

  useEffect(() => {
    if (auth) {
      history.push(routes.CANDIDATES_ROUTE);
    }

    return () => {
      userRegisterReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, history]);

  return (
    <Container component='main' maxWidth='sm'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        <Box component='form' noValidate sx={{ mt: 3 }} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='off'
                name='firstName'
                required
                fullWidth
                label='First Name'
                value={firstName}
                onChange={onChangeUserData}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='Last Name'
                name='lastName'
                autoComplete='off'
                value={lastName}
                onChange={onChangeUserData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Email Address'
                name='email'
                autoComplete='off'
                value={email}
                onChange={onChangeUserData}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                autoComplete='off'
                value={password}
                onChange={onChangeUserData}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Register
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link to={routes.LOGIN_ROUTE}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default RegisterPage;
