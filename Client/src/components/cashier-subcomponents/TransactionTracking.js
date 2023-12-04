import React, { useEffect } from 'react';
import { useState } from 'react';

import { Box, Modal, Button, Card, CardContent, Stack, TextField, CardActions, Typography, ButtonGroup } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from "mui-datatables";

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StartIcon from '@mui/icons-material/Start';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 60000 // 30 second timeout
});

const title = 'Current Transactions';

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'orderHistoryReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};

function TransactionTracking() {
  const [data, setData] = useState(undefined);
  const [datetimeOpen, setDatetimeOpen] = React.useState(false);

  const [startTime, setStartTime] = useState(new Date(1920,0,1));
  const [endTime, setEndTime] = useState(new Date());
  
  useEffect(() => {
    getOrders(startTime, endTime, setData);
  }, [startTime, endTime]);

  const handleClose = () => {
    setDatetimeOpen(false);
  };

  const handleGenerate = (newStart, newEnd) => {
    console.log("Broken AF");
    setDatetimeOpen(false);
    setStartTime(newStart);
    setEndTime(newEnd);
  };

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
      name: 'Item\'s Ordered',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Order Status',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: true,
        customBodyRender: actions => {
          return (
            <ButtonGroup>
              {actions.fufill && <Button
                variant="contained"
                color="success"
                startIcon={<DoneOutlineIcon />}
                children="Fulfill"
                onClick={async () => {
                  await actions.fufill()
                  getOrders(startTime, endTime, setData);
                }}
              />}
              {actions.pend && <Button
                variant="contained"
                color="warning"
                startIcon={<PendingActionsIcon />}
                children="Pending"
                onClick={async () => {
                  await actions.pend()
                  getOrders(startTime, endTime, setData);
                }}
              />}
              {actions.cancel && <Button
                variant="contained"
                color="error"
                startIcon={<CancelIcon />}
                children="Cancel"
                onClick={async () => {
                  await actions.cancel()
                  getOrders(startTime, endTime, setData);
                }}
              />}
            </ButtonGroup>
          );
        }
      }
    }
  ];

  return (
    <Box>
      <Box sx={{ paddingBottom: 2 }}>
        <Button 
          onClick={() => setDatetimeOpen(true)}
          children="Choose Time Frame"
          color="warning"
          variant="contained"
        />
      </Box>
      {data === undefined ? <><br /><CircularProgress /></> :
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      }
      <Modal
        open={datetimeOpen}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{
            display: 'flex',          // Enable flex container
            flexDirection: 'column',  // Stack children vertically
            justifyContent: 'center', // Center children along the vertical axis
            alignItems: 'center',     // Center children along the horizontal axis
            height: '80vh',           // Set the height of the container (e.g., full viewport height)
        }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <PageInputCard title="Pick Time Frame" onGenerate={handleGenerate} onClose={handleClose} />
          </LocalizationProvider>
        </Box>
      </Modal>
    </Box>
  );
}

async function changeOrderStatus(trans_id, status) {
  try {
    const response = await API.put(`/transactions/${trans_id}`, null, {
      params: { order_status: status }
    });
    console.log('Order status updated:', response.data);
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

async function deleteAllCanceled() {
  try {
    const response = await API.delete('/transactions/deleteCanceled');
    console.log('Canceled orders deleted:', response.data);
  } catch (error) {
    console.error('Error deleting canceled orders:', error);
  }
}

function getOrders(startTime, endTime, callback) {
  API.get(`/transactions?startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`)
    .then((res) => {
      if (res.status < 300) {
        callback(res.data.map((item) => [
          item.trans_id, 
          (new Date(item.transaction_time)).toLocaleString(navigator.language),
          item.employee_id, 
          item.total_price, 
          item.item_names.join(', '),
          item.order_status,
          {
            cancel: item.order_status !== "Canceled" && (() => changeOrderStatus(item.trans_id, 'Canceled')),
            pend: item.order_status !== "Pending" && (() => changeOrderStatus(item.trans_id, 'Pending')),
            fufill: item.order_status !== "Fulfilled" && (() => changeOrderStatus(item.trans_id, 'Fulfilled')),
          }
        ]));
      }
      else {
        console.log(res.data);
        callback(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
      }
    })
    .catch((error) => {
      console.log(error);
      callback(['Error Retrieving Report! Please try again... (may need to use a smaller time window)']);
    }
  );
}

function PageInputCard({ title, onGenerate, onClose }) {
  const [startTime, setStartTime] = useState(new Date(1920,0,1));
  const [endTime, setEndTime] = useState(new Date());

  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  return (
    <Card sx={{ minWidth: 345 }}>
      <CardContent>
        <Typography variant='h6' paddingBottom={3}>
          {title}
        </Typography>
        <Stack spacing={4}>
          <DateTimePicker
            label="Start Time"
            value={startTime}
            onChange={handleStartTimeChange}
            textField={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label="End Time"
            value={endTime}
            onChange={handleEndTimeChange}
            textField={(params) => <TextField {...params} />}
          />
        </Stack>
      </CardContent>
      <CardActions>
          <Box sx={{ textAlign: 'left', flexGrow: 1 }}>    
            <Button 
              variant='contained' 
              color='success' 
              onClick={() => onGenerate(startTime, endTime)}
              children={<StartIcon />}
            />
          </Box>
          <Button 
            variant='contained' 
            color='error' 
            onClick={onClose}
            children={<ExitToAppIcon />}
          />
      </CardActions>
    </Card>
  );
}


export default TransactionTracking