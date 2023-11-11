import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { registerDateTimePage } from './PageInput';

function Usage() {
  const { startTime, endTime } = useParams();
  
  return (
    <Box>
      {Usage.title}<br/>
      {startTime}<br/>
      {endTime}
    </Box>
  )
}

registerDateTimePage(
  Usage,
  'Product Usage',
  'usage',
  true, true
);

export default Usage