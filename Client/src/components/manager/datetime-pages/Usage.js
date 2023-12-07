/**
 * This module provides the 'Product/Inventory Usage Report' component for the application.
 * It displays a report of inventory usage within a specified time range, showing total usage per item.
 * @module Usage
 */

import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from "mui-datatables";

import { registerDateTimePage } from './PageInput';

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});


const title = 'Product/Inventory Usage Report';

const columns = [
    {
      name: 'Inventory ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Total Usage',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Unit',
      options: {
        filter: true,
        sort: true
      }
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'productUsageReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};

/**
 * Displays a report of product or inventory usage.
 * The time range for the report is obtained from URL parameters.
 * 
 * @returns {React.Component} A component displaying the 'Product/Inventory Usage' report.
 */
function Usage() {
  const { startTime, endTime } = useParams();
  const [data, setData] = useState(undefined);
  
  API.get(`/reports/product-usage?startTime=${(new Date(startTime)).toISOString()}&endTime=${(new Date(endTime)).toISOString()}`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.inventory_id, item.inventory_name, item.total_usage, item.unit]));
       }
       else {
         console.log(res.data);
         setData(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
       }
     })
     .catch((error) => {
       console.log(error);
       setData(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
     });

  return (
    <Box>
      <br/><br/>
      {'Start Time: ' + (new Date(startTime)).toLocaleString(navigator.language)}<br/>
      {'End Time: ' + (new Date(endTime)).toLocaleString(navigator.language)}
      <br/><br/><br/>

      {data === undefined ? <CircularProgress /> :
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      }
    </Box>
  );
}

registerDateTimePage(
  Usage,
  'Product Usage',
  'usage',
  true, true
);

export default Usage