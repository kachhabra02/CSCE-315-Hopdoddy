import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MUIDataTable from "mui-datatables";

import { registerDateTimePage } from './PageInput';

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 60000 // 60 second timeout
});


const title = 'Order/Transaction History Report';

const columns = [
    {
      name: 'Transaction ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Time',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Cashier ID',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Total Price',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Order Status',
      options: {
        filter: true,
        sort: false
      }
    },
    {
      name: 'Item\'s Ordered',
      options: {
        filter: false,
        sort: true
      }
    }
];


function History() {
  const { startTime, endTime } = useParams();
  const [data, setData] = useState(undefined);
  const [alerts, setAlerts] = useState([]);

  function loadHistory() {
    API.get(`/transactions?startTime=${(new Date(startTime)).toISOString()}&endTime=${(new Date(endTime)).toISOString()}`)
     .then((res) => {
       if (res.status < 300) {
         console.log('Success');
         setData(res.data.map((item) => [item.trans_id, (new Date(item.transaction_time)).toLocaleString(navigator.language),
                                         item.employee_id, item.total_price, item.order_status, item.item_names.join(', ')]));
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
  }

  function removeAlert(index) {
    alerts.splice(index, 1);
    setAlerts([...alerts]);
  }

  async function deleteItem(item_info, new_alerts) {
    await API.delete(`/transactions/${item_info[0]}`)
     .then((res) => {
       if (res.status < 300) {
         console.log(`Deleted order ${item_info[0]} from ${item_info[1]}`);
         new_alerts.unshift(
           {
             severity: 'success',
             text: `Successfully Deleted Order '${item_info[0]}' From '${item_info[1]}'`
           }
         );
       }
       else {
         console.log(`Failed to delete order ${item_info[0]} from ${item_info[1]}`);
         new_alerts.unshift(
           {
             severity: 'error',
             text: `Failed to Delete Order '${item_info[0]}' From '${item_info[1]}'`
           }
         );
       }
     })
     .catch((error) => {
       console.log(error);
       new_alerts.unshift(
         {
           severity: 'error',
           text: `Failed to Delete Order '${item_info[0]}' From '${item_info[1]}'`
         }
       );
     });
  }

  const options = {
    filterType: 'multiselect',
    selectableRows: 'multiple',
    downloadOptions: { filename: 'orderHistoryReport.csv', serparator: ',' },
    draggableColumns: { enabled: true },
    resizableColumns: true,
    onRowsDelete: async (rowsDeleted) => {
        const new_alerts = [...alerts];

        const item_info = rowsDeleted.data.map((item) => data[item.dataIndex]);
        await Promise.all(item_info.map(async (item) => deleteItem(item, new_alerts)));

        console.log([...new_alerts]);
        setAlerts(new_alerts);
        loadHistory();
    }
  };
  
  if (data === undefined) {
    loadHistory();
  }

  return (
    <Box>
      <br/><br/>
      {'Start Time: ' + (new Date(startTime)).toLocaleString(navigator.language)}<br/>
      {'End Time: ' + (new Date(endTime)).toLocaleString(navigator.language)}
      <br/><br/><br/>
      
      <Stack spacing={1}>
        {
          alerts.map((item, index) => 
              <Alert severity={item.severity} onClose={() => removeAlert(index)} key={`alert-${index}`}>
                {item.text}
              </Alert>
          )
        }
      </Stack>
      
      <br/>

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