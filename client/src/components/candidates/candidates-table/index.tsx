import { FC, useState, useRef, useEffect } from 'react';
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
import CandidateForm, { CandidateFormCandidateData } from '../candidate-form';
import Skeleton from 'components/skeleton';

import * as routes from 'routes';
import { CandidateInterface, UserRole } from 'interfaces';
import { candidateUpdateSelector, userAuthSelector } from 'selectors';
import { typedUseSelector, typedUseDispatch } from 'hooks/redux-hooks';

interface CandidatesTableProps {
  candidates: CandidateInterface[];
  loading?: boolean;
}

const CandidatesTable: FC<CandidatesTableProps> = ({ candidates, loading }) => {
  const [openModal, setOpenModal] = useState(false);

  const { candidateUpdate, candidateUpdateReset } = typedUseDispatch();
  const { user } = typedUseSelector(userAuthSelector);
  const { loading: candidateUpdateLoading } = typedUseSelector(candidateUpdateSelector)

  const history = useHistory();

  const candidateRef = useRef<CandidateInterface | null>(null);

  useEffect(() => {
    if (!openModal) {
      candidateRef.current = null;
      candidateUpdateReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const onSubmit = (candidateData: CandidateFormCandidateData) => {
    candidateUpdate(candidateRef.current?._id, candidateData);
  };

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
                      candidateRef.current = candidate;
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
                  <TableCell>{candidate.votes?.length ?? 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <ModalContainer
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        title='Edit a Candidate'
      >
        <CandidateForm onSubmit={onSubmit} candidate={candidateRef.current} loading={candidateUpdateLoading} />
      </ModalContainer>
    </>
  );
};

export default CandidatesTable;
