import { FC } from 'react';

import VotersTable from 'components/voters-table';
import TableAction from 'components/table-action';

const VotersPage: FC = () => {
  const onClickHandler = () => {};

  return (
    <>
      <TableAction onClick={onClickHandler} />
      <VotersTable />
    </>
  );
};

export default VotersPage;
