import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { assignReportProperties } from './Reports';

function Restock() {
  return (
    <Box>
      {Restock.title}
    </Box>
  )
}

assignReportProperties(
  Restock,
  'Restock Report',
  'restock',
  false, false
);

export default Restock