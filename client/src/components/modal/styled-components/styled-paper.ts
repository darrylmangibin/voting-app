import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const StyledBox = styled(Paper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '2rem',
});

export default StyledBox;
