import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CandidateInterface } from 'interfaces';

export interface CandidateFormCandidateData {
  firstName: string;
  lastName: string;
  shortName: string;
}

interface CandidateFormProps {
  onSubmit: (candidateData: CandidateFormCandidateData) => void;
  onDelete?: () => void;
  loading?: boolean;
  candidate?: CandidateInterface | null;
}

const CandidateForm: FC<CandidateFormProps> = ({
  onSubmit, 
  loading,
  candidate,
  onDelete,
}) => {
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

  useEffect(() => {
    if (candidate) {
      setCandidateData((prevState) => ({
        ...prevState,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        shortName: candidate.shortName,
      }));
    }

    return () => {
      setCandidateData((prevState) => ({
        ...prevState,
        firstName: '',
        lastName: '',
        shortName: '',
      }));
    };
  }, [candidate]);

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
      <Box
        sx={{
          justifyContent: 'space-between',
          marginTop: '2rem',
          display: 'flex',
        }}
      >
        <Button type='submit' variant='contained' disabled={loading}>
          Submit
        </Button>
        {onDelete && (
          <Button
            type='button'
            variant='contained'
            color='error'
            onClick={onDelete}
            disabled={loading}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CandidateForm;
