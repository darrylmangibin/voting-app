import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ModalContainer from 'components/modal/modal-container';
import CandidateForm from '../candidate-form';

import * as routes from 'routes';

const candidates = [
  {
    id: 1,
    firstName: 'Peter',
    lastName: 'Parker',
    shortName: 'Spiderman',
  },
  {
    id: 2,
    firstName: 'James',
    lastName: 'Howlett',
    shortName: 'Wolverine',
  },
  {
    id: 3,
    firstName: 'Tony',
    lastName: 'Stark',
    shortName: 'Ironman',
  },
  {
    id: 4,
    firstName: 'Steve',
    lastName: 'Rogers',
    shortName: 'Captain America',
  },
  {
    id: 5,
    firstName: 'Bruce',
    lastName: 'Banner',
    shortName: 'The Hulk',
  },
];

const CandidatesTable: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflow: 'auto', padding: '1.5rem' }}
      >
        <Table sx={{ minWidth: 650 }} aria-label='caption table'>
          <caption>Vote wisely</caption>
          <TableHead>
            <TableRow>
              <TableCell>Short Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Number of votes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                key={candidate.id}
                hover
                sx={{ cursor: 'pointer' }}
                // onClick={() => setOpenModal(true)}
                onClick={() => history.push(`${routes.CANDIDATES_ROUTE}/2`)}
              >
                <TableCell component='th' scope='row'>
                  {candidate.shortName}
                </TableCell>
                <TableCell>{candidate.firstName}</TableCell>
                <TableCell>{candidate.lastName}</TableCell>
                <TableCell>153</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalContainer
        open={openModal}
        onClose={() => setOpenModal(false)}
        title='Edit a Candidate'
      >
        <CandidateForm />
      </ModalContainer>
    </>
  );
};

export default CandidatesTable;
