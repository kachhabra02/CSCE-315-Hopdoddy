import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { assignReportProperties } from './Reports';

function WhatSellsTogether() {
  const { startTime, endTime } = useParams();
  
  return (
    <Box>
      {WhatSellsTogether.title}<br/>
      {startTime}<br/>
      {endTime}
    </Box>
  )
}

assignReportProperties(
  WhatSellsTogether,
  'What Sells Together',
  'what-sells-together',
  true, true
);

export default WhatSellsTogether