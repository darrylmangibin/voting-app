import { FC } from 'react';

import VotersTable from 'components/voters-table';
import DashboardHeader from 'components/dashboard-header';
import { Typography } from '@mui/material';

const VotersPage: FC = () => {
  return (
    <>
      <DashboardHeader sx={{ justifyContent: 'start' }}>
        <Typography variant="h5">List of voters</Typography>
      </DashboardHeader>
      <VotersTable />
    </>
  );
};

export default VotersPage;
