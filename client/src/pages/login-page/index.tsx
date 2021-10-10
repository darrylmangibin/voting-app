import { ChangeEvent, FC, FormEvent, useState, useEffect } from 'react';
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
import Skeleton from 'components/skeleton';

import * as routes from 'routes';
import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { userAuthSelector, userLoginSelector } from 'selectors';

interface LoginPageProps extends RouteComponentProps {}

const LoginPage: FC<LoginPageProps> = ({ history }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userData;

  const { userLogin } = typedUseDispatch();
  const { loading } = typedUseSelector(userLoginSelector);
  const { auth, loading: userAuthLoading } = typedUseSelector(userAuthSelector);

  const onChangeUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    userLogin(userData);
  };

  useEffect(() => {
    if (auth) {
      history.push(routes.CANDIDATES_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <Container component='main' maxWidth='xs'>
      {userAuthLoading ? (
        <Skeleton />
      ) : (
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
            Login
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Email Address'
              name='email'
              value={email}
              onChange={onChangeUserData}
              autoComplete='off'
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              value={password}
              onChange={onChangeUserData}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to={routes.REGISTER_ROUTE}>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
