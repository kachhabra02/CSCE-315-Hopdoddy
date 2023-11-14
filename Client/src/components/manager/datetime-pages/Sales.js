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


const title = 'Sales Report';

const columns = [
    {
      name: 'Item ID',
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
      name: 'Price',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Is Modification?',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Sales Made',
      options: {
        filter: false,
        sort: true
      }
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'salesReport.csv', serparator: ',' }
};


function Sales() {
  const { startTime, endTime } = useParams();
  const [data, setData] = useState(undefined);

  API.get(`/reports/sales?startTime=${(new Date(startTime)).toISOString()}&endTime=${(new Date(endTime)).toISOString()}`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.item_id, item.item_name, item.price, item.is_modification, item.sales_made]));
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
  Sales,
  'Sales Report',
  'sales',
  true, true
);

export default Sales