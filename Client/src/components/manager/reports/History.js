import React from 'react'
import { assignReportProperties } from './Reports';

function History() {
  return (
    <div>{History.title}</div>
  )
}

assignReportProperties(
  History,
  'Order History',
  'history',
  true, true
);

export default History