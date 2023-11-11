import React from 'react'
import { assignReportProperties } from './Reports';

function WhatSellsTogether() {
  return (
    <div>{WhatSellsTogether.title}</div>
  )
}

assignReportProperties(
    WhatSellsTogether,
    'What Sells Together',
    'what-sells-together',
    true, true
);

export default WhatSellsTogether