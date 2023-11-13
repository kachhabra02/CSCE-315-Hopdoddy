import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { registerDateTimePage } from './PageInput';

function Excess() {
  const { startTime } = useParams();

  return (
    <Box>
      {Excess.title}<br/>
      {startTime}
    </Box>
  )
}

registerDateTimePage(
  Excess,
  'Excess Report',
  'excess',
  true, false
);

export default Excess