import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, Box } from '@mui/material';

import DashboardHeader from 'components/dashboard-header';
import Skeleton from 'components/skeleton';

import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { userProfileSelector } from 'selectors';

const ProfilePage: FC = () => {
  const { userProfile, userProfileReset } = typedUseDispatch();
  const { user, loading } = typedUseSelector(userProfileSelector);

  const [userProfileData, setUserProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { firstName, lastName, email, password, confirmPassword } =
    userProfileData;

  const onChangeUserProfileDate = (e: ChangeEvent<HTMLInputElement>) => {
    setUserProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.name,
    }));
  };

  useEffect(() => {
    userProfile();

    return () => {
      userProfileReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      setUserProfileData((prevState) => ({
        ...prevState,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }));
    }
  }, [user]);

  return (
    <>
      <DashboardHeader sx={{ justifyContent: 'start' }}>
        <Typography variant='h5'>Profile</Typography>
      </DashboardHeader>
      <Paper variant='elevation' elevation={3} sx={{ padding: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {loading ? (
              <Skeleton />
            ) : (
              <Box component='form' noValidate autoComplete='off'>
                <TextField
                  label='First Name'
                  variant='standard'
                  fullWidth
                  name='firstName'
                  margin='normal'
                  value={firstName}
                  onChange={onChangeUserProfileDate}
                />
                <TextField
                  label='Last Name'
                  variant='standard'
                  fullWidth
                  name={lastName}
                  margin='normal'
                  value={lastName}
                  onChange={onChangeUserProfileDate}
                />
                <TextField
                  label='Email'
                  variant='standard'
                  fullWidth
                  name='email'
                  margin='normal'
                  value={email}
                  onChange={onChangeUserProfileDate}
                />
                <TextField
                  label='Password'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  name='password'
                  value={password}
                  onChange={onChangeUserProfileDate}
                />
                <TextField
                  label='Confirm Password'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={onChangeUserProfileDate}
                />
                <Button
                  type='submit'
                  variant='contained'
                  sx={{ marginTop: '2rem' }}
                >
                  Submit
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProfilePage;
