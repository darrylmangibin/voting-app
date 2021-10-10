import { FC } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

import TableAction from 'components/table-action';
import { Box } from '@mui/system';

const ProfilePage: FC = () => {
  return (
    <>
      <TableAction sx={{ justifyContent: 'start' }}>
        <Typography variant='h5'>Profile</Typography>
      </TableAction>
      <Paper variant='elevation' elevation={3} sx={{ padding: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box component='form' noValidate autoComplete='off'>
              <TextField
                label='First Name'
                variant='standard'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Last Name'
                variant='standard'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Email'
                variant='standard'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Password'
                variant='standard'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Confirm Password'
                variant='standard'
                fullWidth
                margin='normal'
              />
              <Button
                type='submit'
                variant='contained'
                sx={{ marginTop: '2rem' }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ProfilePage;
