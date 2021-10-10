import { FC, useEffect } from 'react';

import VotersTable from 'components/voters-table';
import DashboardHeader from 'components/dashboard-header';
import { Typography } from '@mui/material';

import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { userListSelector } from 'selectors';

const VotersPage: FC = () => {
  const { userList } = typedUseDispatch();
  const { users, loading } = typedUseSelector(userListSelector);

  useEffect(() => {
    userList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashboardHeader sx={{ justifyContent: 'start' }}>
        <Typography variant='h5'>List of voters</Typography>
      </DashboardHeader>
      <VotersTable voters={users} loading={loading} />
    </>
  );
};

export default VotersPage;
