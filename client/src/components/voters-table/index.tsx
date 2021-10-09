import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const voters = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
  },
  {
    id: 4,
    firstName: 'Steve',
    lastName: 'Smith',
    email: 'steve@example.com',
  },
  {
    id: 5,
    firstName: 'Greg',
    lastName: 'Harris',
    email: 'greg@example.com',
  },
];

const VotersTable = () => {
  return (
    <TableContainer
      component={Paper}
      sx={{ overflow: 'auto', padding: '1.5rem' }}
    >
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
    </TableContainer>
  );
};

export default VotersTable;
