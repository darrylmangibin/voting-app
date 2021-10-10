import { FC } from 'react';

import VotersTable from 'components/voters-table';
import TableAction from 'components/table-action';
import { Typography } from '@mui/material';

const VotersPage: FC = () => {
  return (
    <>
      <TableAction sx={{ justifyContent: 'start' }}>
        <Typography variant="h5">List of voters</Typography>
      </TableAction>
      <VotersTable />
    </>
  );
};

export default VotersPage;
