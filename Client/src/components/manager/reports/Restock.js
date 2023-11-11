import React from 'react'
import { assignReportProperties } from './Reports';

function Restock() {
  return (
    <div>{Restock.title}</div>
  )
}

assignReportProperties(
  Restock,
  'Restock Report',
  'restock',
  false, false
);

export default Restock