import { FC } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import Skeleton from 'components/skeleton';

import { UserInterface } from 'interfaces';

interface VotersTableProps {
  voters: UserInterface[];
  loading?: boolean;
}

const VotersTable: FC<VotersTableProps> = ({ voters, loading }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: 'auto', padding: '1.5rem' }}
    >
      {loading ? (
        <Skeleton />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label='caption table'>
          <caption>List of voters</caption>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align='right'>Last Name</TableCell>
              <TableCell align='right'>email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.id} hover sx={{ cursor: 'pointer' }}>
                <TableCell component='th' scope='row'>
                  {voter.firstName}
                </TableCell>
                <TableCell align='right'>{voter.lastName}</TableCell>
                <TableCell align='right'>{voter.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default VotersTable;
