import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { assignReportProperties } from './Reports';

function Excess() {
  const { startTime } = useParams();

  return (
    <Box>
      {Excess.title}<br/>
      {startTime}
    </Box>
  )
}

assignReportProperties(
  Excess,
  'Excess Report',
  'excess',
  true, false
);

export default Excess