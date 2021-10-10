import { FC, useState } from 'react';

import CandidatesTable from 'components/candidates-table';
import TableAction from 'components/table-action';

const CandidatesPage: FC = () => {
  const [openMoldal, setOpenModal] = useState(false);


  const onClickHandler = () => {};

  return (
    <>
      <TableAction onClick={onClickHandler} />
      <CandidatesTable />
    </>
  );
};

export default CandidatesPage;
