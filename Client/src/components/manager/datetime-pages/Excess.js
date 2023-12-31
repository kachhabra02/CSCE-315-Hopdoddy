/**
 * This module provides the 'Excess Inventory Report' component for the application.
 * It displays a report of inventory items, showing details such as current quantity, actual usage, and target usage.
 * @module Excess
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


const title = 'Excess Inventory Report';

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
      name: 'Current Quantity',
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
    },
    {
      name: 'Actual Usage',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Target Usage',
      options: {
        filter: false,
        sort: true
      }
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'excessReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};


/**
 * Displays a report of excess inventory.
 * The report is based on the start time obtained from URL parameters and includes inventory details.
 * 
 * @returns {React.Component} A component displaying the 'Excess Inventory Report'.
 */
function Excess() {
  const { startTime } = useParams();
  const [data, setData] = useState(undefined);

  API.get(`/reports/excess?startTime=${(new Date(startTime)).toISOString()}`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [
          item.inventory_id, item.inventory_name, item.current_quantity, 
          item.unit, item.actual_usage, item.target_usage
        ]));
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
      {'Start Time: ' + (new Date(startTime)).toLocaleString(navigator.language)}
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
  Excess,
  'Excess Report',
  'excess',
  true, false
);

export default Excess