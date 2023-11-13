import React from 'react';
import {useState} from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import MUIDataTable from "mui-datatables";

import { registerDateTimePage } from './PageInput';

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});


const title = 'Product/Inventory Usage Report';

const columns = ['Inventory ID', 'Name', 'Total Usage', 'Unit'];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'productUsageReport.csv', serparator: ',' }
};


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
       }
     })
     .catch((error) => {
       console.log(error);
     });

  return (
    <Box>
      <br/><br/>
      {'Start Time: ' + startTime}<br/>
      {'End Time: ' + endTime}
      <br/><br/><br/>

      {data === undefined ? 'Loading...' :
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