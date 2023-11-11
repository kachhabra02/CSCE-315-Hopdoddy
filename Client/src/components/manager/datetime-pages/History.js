import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { registerDateTimePage } from './PageInput';

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

registerDateTimePage(
  History,
  'Order History',
  'history',
  true, true
);

export default History