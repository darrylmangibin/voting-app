import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import DashboardHeader from 'components/dashboard-header';
import { FC } from 'react';

const CandidateDetailsPage: FC = () => {
  return (
    <>
      <DashboardHeader>
        <Typography variant='h5'>Candidate Details</Typography>
      </DashboardHeader>
      <Paper variant='elevation' elevation={3} sx={{ padding: '2rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <List>
              <ListItem>
                <ListItemText primary='First Name' secondary='Peter' />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary='Last Name' secondary='Parker' />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary='Shor Name' secondary='Spiderman' />
              </ListItem>
              <Divider />
              <Box style={{ marginTop: '2rem' }}>
                <Button variant='contained'>Vote</Button>
              </Box>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CandidateDetailsPage;
