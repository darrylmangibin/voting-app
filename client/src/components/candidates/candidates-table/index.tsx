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
import Skeleton from 'components/skeleton';

import * as routes from 'routes';
import { CandidateInterface, UserRole } from 'interfaces';
import { userAuthSelector } from 'selectors';
import { typedUseSelector } from 'hooks/redux-hooks';

interface CandidatesTableProps {
  candidates: CandidateInterface[];
  loading?: boolean;
}

const CandidatesTable: FC<CandidatesTableProps> = ({ candidates, loading }) => {
  const [openModal, setOpenModal] = useState(false);

  const { user } = typedUseSelector(userAuthSelector);

  const history = useHistory();

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflow: 'auto', padding: '1.5rem' }}
      >
        {loading ? (
          <Skeleton />
        ) : (
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
                  onClick={() => {
                    if (user?.role === UserRole.ADMIN) {
                      setOpenModal(true);
                    } else {
                      history.push(
                        `${routes.CANDIDATES_ROUTE}/${candidate._id}`
                      );
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {candidate.shortName}
                  </TableCell>
                  <TableCell>{candidate.firstName}</TableCell>
                  <TableCell>{candidate.lastName}</TableCell>
                  <TableCell>{candidate.votes.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
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
