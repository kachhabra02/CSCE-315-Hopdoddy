import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { assignReportProperties } from './Reports';

function History() {
  const { startTime, endTime } = useParams();

  return (
    <Box>
      {History.title}<br/>
      {startTime}<br/>
      {endTime}
    </Box>
  )
}

assignReportProperties(
  History,
  'Order History',
  'history',
  true, true
);

export default History