import React from 'react'
import { assignReportProperties } from './Reports';

function Sales() {
  return (
    <div>{Sales.title}</div>
  )
}

assignReportProperties(
  Sales,
  'Sales Report',
  'sales',
  true, true
);

export default Sales