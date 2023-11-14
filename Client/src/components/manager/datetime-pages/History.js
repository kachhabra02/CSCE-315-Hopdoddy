import React from 'react';
import {useState} from 'react';
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


const title = 'Order/Transaction History Report';

const columns = ['Transaction ID', 'Time', 'Cashier ID', 'Total Price', 'Item\'s Ordered'];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'orderHistoryReport.csv', serparator: ',' }
};


function History() {
  const { startTime, endTime } = useParams();
  const [data, setData] = useState(undefined);
  
  API.get(`/transactions?startTime=${(new Date(startTime)).toISOString()}&endTime=${(new Date(endTime)).toISOString()}`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.trans_id, (new Date(item.transaction_time)).toLocaleString(navigator.language),
                                         item.employee_id, item.total_price, item.item_names.join(', ')]));
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
  History,
  'Order History',
  'history',
  true, true
);

export default History