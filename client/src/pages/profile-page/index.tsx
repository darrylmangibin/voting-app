import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Paper, TextField, Typography, Box } from '@mui/material';

import DashboardHeader from 'components/dashboard-header';
import Skeleton from 'components/skeleton';

import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { userProfileSelector, userProfileUpdateSelector } from 'selectors';
import * as ActionTypes from 'action-types';
import { SnackBarActionOpen } from 'actions';

interface ProfilePageUserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const {
    userProfile,
    userProfileReset,
    userProfileUpdate,
    userProfileUpdateReset,
  } = typedUseDispatch();
  const { user, loading } = typedUseSelector(userProfileSelector);
  const { loading: userProfileUpdateLoading } = typedUseSelector(
    userProfileUpdateSelector
  );

  const [userProfileData, setUserProfileData] =
    useState<ProfilePageUserProfileData>({
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
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    userProfile();

    return () => {
      userProfileReset();
      userProfileUpdateReset();
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return dispatch<SnackBarActionOpen>({
        type: ActionTypes.SNACKBAR_OPEN,
        message: 'Password do not match',
        severity: 'error',
      });
    }

    userProfileUpdate({
      firstName,
      lastName,
      email,
      password,
    });
  };

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
              <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={onSubmit}
              >
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
                  type='password'
                  margin='normal'
                  name='password'
                  value={password}
                  onChange={onChangeUserProfileDate}
                />
                <TextField
                  label='Confirm Password'
                  variant='standard'
                  type='password'
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
                  disabled={userProfileUpdateLoading}
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
