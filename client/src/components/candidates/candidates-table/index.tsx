import { FC, useState } from 'react';
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
              <TableCell align='right'>First Name</TableCell>
              <TableCell align='right'>Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                key={candidate.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenModal(true)}
              >
                <TableCell component='th' scope='row'>
                  {candidate.shortName}
                </TableCell>
                <TableCell align='right'>{candidate.firstName}</TableCell>
                <TableCell align='right'>{candidate.lastName}</TableCell>
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
