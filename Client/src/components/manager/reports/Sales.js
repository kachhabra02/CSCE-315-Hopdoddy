import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { assignReportProperties } from './Reports';

function Sales() {
  const { startTime, endTime } = useParams();

return (
  <Box>
    {Sales.title}<br/>
    {startTime}<br/>
    {endTime}
  </Box>
)
}

assignReportProperties(
  Sales,
  'Sales Report',
  'sales',
  true, true
);

export default Sales