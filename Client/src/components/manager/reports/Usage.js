import React from 'react'
import { assignReportProperties } from './Reports';

function Usage() {
  return (
    <div>{Usage.title}</div>
  )
}

assignReportProperties(
    Usage,
    'Product Usage',
    'usage',
    true, true
);

export default Usage