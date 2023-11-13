import React from 'react';
import {useState} from 'react';

import { Box } from '@mui/material';
import MUIDataTable from "mui-datatables";

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});


const title = 'Inventory Restock Report';

const columns = ['Inventory ID', 'Name', 'Current Quantity', 'Average Weekly Usage', 'Recommended Reorder'];

const options = {
  filterType: 'textField',
  selectableRows: 'none'
};


function Restock() {
  const [data, setData] = useState(undefined);

  API.get(`/reports/restock`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.inventory_id, item.inventory_name, item.current_quantity,
                                         item.avg_weekly_usage, item.recommended_reorder]));
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

export default Restock