import { FC, useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import CandidatesTable from 'components/candidates/candidates-table';
import DashbaordHeader from 'components/dashboard-header';
import ModalContainer from 'components/modal/modal-container';
import CandidateForm, {
  CandidateFormCandidateData,
} from 'components/candidates/candidate-form';

import { typedUseDispatch, typedUseSelector } from 'hooks/redux-hooks';
import { candidateListSelector, candidateCreateSelector } from 'selectors';

const CandidatesPage: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  const { candidteList, candidateCreate, canidateCreateReset } =
    typedUseDispatch();
  const { candidates, loading } = typedUseSelector(candidateListSelector);
  const { loading: candidateCreateLoading, success } = typedUseSelector(
    candidateCreateSelector
  );

  const onSubmit = (candidateData: CandidateFormCandidateData) => {
    candidateCreate(candidateData);
  };

  useEffect(() => {
    if (success) {
      setOpenModal(false);
      canidateCreateReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    candidteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashbaordHeader
        onClick={() => setOpenModal(true)}
        sx={{ justifyContent: 'space-between' }}
      >
        <Typography variant='h5'>List of candidates</Typography>
      </DashbaordHeader>
      <CandidatesTable candidates={candidates} loading={loading} />
      <ModalContainer
        open={openModal}
        onClose={() => setOpenModal(false)}
        title='Add a Candidate'
      >
        <CandidateForm onSubmit={onSubmit} loading={candidateCreateLoading} />
      </ModalContainer>
    </>
  );
};

export default CandidatesPage;
