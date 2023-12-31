import React from 'react';
import { useState } from 'react';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from "mui-datatables";

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 10000 // 10 second timeout
});


const title = 'Inventory Restock Report';

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
      name: 'Average Weekly Usage',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Recommended Reorder',
      options: {
        filter: false,
        sort: true
      }
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'restockReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};


/**
 * Component for displaying an inventory restock report.
 * Fetches inventory data from an API and displays it in a table format.
 *
 * @returns {React.Component} A component that displays the inventory restock report.
 */
function Restock() {
  const [data, setData] = useState(undefined);

  API.get(`/reports/restock`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.inventory_id, item.inventory_name, item.current_quantity,
                                         parseFloat(item.avg_weekly_usage).toFixed(2), parseFloat(item.recommended_reorder).toFixed(2)]));
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

export default Restock