import React from 'react';
import MUIDataTable from "mui-datatables";
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { registerDateTimePage } from './PageInput';

import {useState} from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});


const title = 'Excess Inventory Report';

const columns = ['Inventory ID', 'Name', 'Current Quantity', 'Unit', 'Actual Usage', 'Target Usage'];

const options = {
  filterType: 'textField',
  selectableRows: 'none'
};


function Excess() {
  const { startTime } = useParams();
  const [data, setData] = useState([]);

  API.get(`/reports/excess?startTime=${(new Date(startTime)).toISOString()}`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.inventory_id, item.inventory_name, item.current_quantity, item.unit,
                                         item.actual_usage, item.target_usage]));
       }
       else {
         console.log(res.data);
       }
     })
     .catch((error) => {
       console.log(error);
     });

  return (
    <Box>
      <br/><br/>
      {'Start Time: ' + startTime}
      <br/><br/><br/>
      <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options}
        />
    </Box>
  )
}

registerDateTimePage(
  Excess,
  'Excess Report',
  'excess',
  true, false
);

export default Excess