import { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
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
import Skeleton from 'components/skeleton';

import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { candidateDetailsSelector } from 'selectors';

interface CandidateDetailsPageProp
  extends RouteComponentProps<{ id: string }> {}

const CandidateDetailsPage: FC<CandidateDetailsPageProp> = ({ match }) => {
  const { candidateDetails, candidateDetailsReset } = typedUseDispatch();
  const { candidate, loading } = typedUseSelector(candidateDetailsSelector);

  useEffect(() => {
    candidateDetails(match.params.id);

    return () => {
      candidateDetailsReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashboardHeader>
        <Typography variant='h5'>Candidate Details</Typography>
      </DashboardHeader>
      <Paper variant='elevation' elevation={3} sx={{ padding: '2rem' }}>
        {loading ? (
          <Grid item xs={4}>
            <Skeleton />
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <List>
                <ListItem>
                  <ListItemText
                    primary='First Name'
                    secondary={`${candidate?.firstName}`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Last Name'
                    secondary={`${candidate?.lastName}`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Short Name'
                    secondary={`${candidate?.shortName}`}
                  />
                </ListItem>
                <Divider />
                <Box style={{ marginTop: '2rem' }}>
                  <Button variant='contained'>Vote</Button>
                </Box>
              </List>
            </Grid>
          </Grid>
        )}
      </Paper>
    </>
  );
};

export default CandidateDetailsPage;
