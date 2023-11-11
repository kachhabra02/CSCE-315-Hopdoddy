import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { assignReportProperties } from './Reports';

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

assignReportProperties(
    Usage,
    'Product Usage',
    'usage',
    true, true
);

export default Usage