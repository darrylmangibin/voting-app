import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export interface CandidateFormCandidateData {
  firstName: string;
  lastName: string;
  shortName: string;
}

interface CandidateFormProps {
  onSubmit: (candidateData: CandidateFormCandidateData) => void;
  loading?: boolean;
}

const CandidateForm: FC<CandidateFormProps> = ({ onSubmit, loading }) => {
  const [candidateData, setCandidateData] =
    useState<CandidateFormCandidateData>({
      firstName: '',
      lastName: '',
      shortName: '',
    });
  const { firstName, lastName, shortName } = candidateData;

  const onChangeCandidateData = (e: ChangeEvent<HTMLInputElement>) => {
    setCandidateData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(candidateData);
  };

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={onSubmitHandler}
    >
      <TextField
        label='First Name'
        variant='standard'
        fullWidth
        margin='normal'
        name='firstName'
        value={firstName}
        onChange={onChangeCandidateData}
      />
      <TextField
        label='Last Name'
        variant='standard'
        fullWidth
        margin='normal'
        name='lastName'
        value={lastName}
        onChange={onChangeCandidateData}
      />
      <TextField
        label='Short Name'
        variant='standard'
        fullWidth
        margin='normal'
        name='shortName'
        value={shortName}
        onChange={onChangeCandidateData}
      />
      <Button
        type='submit'
        variant='contained'
        sx={{ marginTop: '2rem' }}
        disabled={loading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CandidateForm;
