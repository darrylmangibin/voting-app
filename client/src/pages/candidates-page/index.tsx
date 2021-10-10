import { FC, useState } from 'react';

import CandidatesTable from 'components/candidates/candidates-table';
import TableAction from 'components/table-action';
import ModalContainer from 'components/modal/modal-container';
import CandidateForm from 'components/candidates/candidate-form';
import { Typography } from '@mui/material';

const CandidatesPage: FC = () => {
  const [openMoldal, setOpenModal] = useState(false);

  return (
    <>
      <TableAction
        onClick={() => setOpenModal(true)}
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography variant='h5'>List of candidates</Typography>
      </TableAction>
      <CandidatesTable />
      <ModalContainer
        open={openMoldal}
        onClose={() => setOpenModal(false)}
        title='Add a Candidate'
      >
        <CandidateForm />
      </ModalContainer>
    </>
  );
};

export default CandidatesPage;
