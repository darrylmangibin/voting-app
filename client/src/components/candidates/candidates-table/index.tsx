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
  Box,
  Modal,
  Typography,
  Button,
} from '@mui/material';

import ModalContainer from 'components/modal/modal-container';
import CandidateForm, { CandidateFormCandidateData } from '../candidate-form';
import Skeleton from 'components/skeleton';

import * as routes from 'routes';
import { CandidateInterface, UserRole } from 'interfaces';
import {
  candidateUpdateSelector,
  userAuthSelector,
  candidateDeleteSelector,
} from 'selectors';
import { typedUseSelector, typedUseDispatch } from 'hooks/redux-hooks';

interface CandidatesTableProps {
  candidates: CandidateInterface[];
  loading?: boolean;
}

const CandidatesTable: FC<CandidatesTableProps> = ({ candidates, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const {
    candidateUpdate,
    candidateUpdateReset,
    candidateDelete,
    candidateDeleteReset,
  } = typedUseDispatch();
  const { user } = typedUseSelector(userAuthSelector);
  const { loading: candidateUpdateLoading, success } = typedUseSelector(
    candidateUpdateSelector
  );
  const { loading: candidateDeleteLoading, success: candidateDeleteSuccess } =
    typedUseSelector(candidateDeleteSelector);

  const history = useHistory();

  const candidateRef = useRef<CandidateInterface | null>(null);

  useEffect(() => {
    if (!openModal) {
      candidateRef.current = null;
      candidateUpdateReset();
      candidateDeleteReset();
    }

    if (success || candidateDeleteSuccess) {
      setOpenModal(false);
      setConfirmDeleteModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal, success, candidateDeleteSuccess]);

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
        <CandidateForm
          onSubmit={onSubmit}
          candidate={candidateRef.current}
          loading={candidateUpdateLoading}
          onDelete={() => setConfirmDeleteModal(true)}
        />
      </ModalContainer>

      <Modal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id='modal-modal-title' variant='body1' gutterBottom>
            Are you sure to delete this candidate?
          </Typography>
          <Box textAlign='right'>
            <Button
              color='primary'
              onClick={() => candidateDelete(candidateRef.current?._id)}
              disabled={candidateDeleteLoading}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CandidatesTable;
