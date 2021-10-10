import { FC, useState } from 'react';

import CandidatesTable from 'components/candidates/candidates-table';
import DashbaordHeader from 'components/dashboard-header';
import ModalContainer from 'components/modal/modal-container';
import CandidateForm from 'components/candidates/candidate-form';
import { Typography } from '@mui/material';

const CandidatesPage: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <DashbaordHeader
        onClick={() => setOpenModal(true)}
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography variant='h5'>List of candidates</Typography>
      </DashbaordHeader>
      <CandidatesTable />
      <ModalContainer
        open={openModal}
        onClose={() => setOpenModal(false)}
        title='Add a Candidate'
      >
        <CandidateForm />
      </ModalContainer>
    </>
  );
};

export default CandidatesPage;
