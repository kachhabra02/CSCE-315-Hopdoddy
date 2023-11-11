import React from 'react'
import { assignReportProperties } from './Reports';

function Excess() {
  return (
    <div>{Excess.title}</div>
  )
}

assignReportProperties(
    Excess,
    'Excess Report',
    'excess',
    true, false
);

export default Excess