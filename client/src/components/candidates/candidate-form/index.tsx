import { FC, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const CandidateForm: FC = () => {
  const [candidateData, setCandidateData] = useState({
    firstName: '',
    lastName: '',
    shortName: '',
  });

  return (
    <Box component='form' noValidate autoComplete='off'>
      <TextField
        label='First Name'
        variant='standard'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Last Name'
        variant='standard'
        fullWidth
        margin='normal'
      />
      <TextField
        label='Short Name'
        variant='standard'
        fullWidth
        margin='normal'
      />
      <Button type='submit' variant='contained' sx={{ marginTop: '2rem' }}>
        Submit
      </Button>
    </Box>
  );
};

export default CandidateForm;
