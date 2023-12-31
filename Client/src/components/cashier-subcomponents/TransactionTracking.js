/**
 * TransactionTracking Module
 *
 * This module contains components and functions related to transaction tracking and management.
 * It includes a component for displaying transaction data with filtering options and actions.
 * Additionally, it provides utility functions for interacting with transaction data.
 *
 * @module TransactionTracking
 */

import React, { useEffect } from 'react';
import { useState } from 'react';

import { Box, Modal, Button, Card, CardContent, Stack, TextField, CardActions, Typography, ButtonGroup, Chip } from '@mui/material';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

/**
 * TransactionTracking Component
 *
 * This component displays a transaction tracking interface that allows users to view, filter, and
 * manage transactions. It includes options to choose a time frame, view transactions in a table,
 * and perform actions on individual transactions.
 *
 * @returns {JSX.Element} The JSX element representing the transaction tracking interface.
 */
function TransactionTracking() {
  const [data, setData] = useState(undefined);
  const [datetimeOpen, setDatetimeOpen] = React.useState(false);

  const [startTime, setStartTime] = useState((() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return startOfToday;
  })());
  const [endTime, setEndTime] = useState((() => {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    return endOfToday;
  })());
  
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
      name: 'Transaction',
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
      name: 'Cashier',
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
      name: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: status => {
          return <Chip
            label={status} 
            variant="contained" 
            color={(() => {
              if (status === "Fulfilled") return "success";
              if (status === "Canceled") return "error";
              if (status === "Pending") return "warning";
            })()}
          />
        }
      }
    },
    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: actions => {
          const color = (() => {
            if (actions.fufill === false) return "success";
            if (actions.cancel === false) return "error";
            if (actions.pend === false) return "warning";
          })()

          return (
            <ButtonGroup>
              {actions.fufill && <Button
                variant="outlined"
                color={color}
                startIcon={<DoneOutlineIcon />}
                children="Fulfill"
                onClick={async () => {
                  await actions.fufill()
                  getOrders(startTime, endTime, setData);
                }}
              />}
              {actions.pend && <Button
                variant="outlined"
                color={color}
                startIcon={<PendingActionsIcon />}
                children="Pending"
                onClick={async () => {
                  await actions.pend()
                  getOrders(startTime, endTime, setData);
                }}
              />}
              {actions.cancel && <Button
                variant="outlined"
                color={color}
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
      <Stack sx={{ paddingBottom: 2 }} direction={'row'} spacing={2}>
        <Button 
          onClick={() => setDatetimeOpen(true)}
          children="Choose Time Frame"
          color="warning"
          variant="contained"
          startIcon={<AccessTimeIcon />}
        />
        <Button 
          sx={{paddingLeft: 2}}
          onClick={async () => {
            await deleteAllCanceled();
            getOrders(startTime, endTime, setData);
          }}
          startIcon={<DeleteForeverIcon />}
          children="Delete Canceled Orders"
          color="error"
          variant="contained"
        />
      </Stack>
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

/**
 * Fetches a list of orders within a specified time frame from the server.
 *
 * @param {Date} startTime - The start time of the time frame.
 * @param {Date} endTime - The end time of the time frame.
 * @param {function} callback - A callback function to handle the retrieved data.
 */
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

/**
 * Component for inputting and generating a time frame for transaction filtering.
 * It allows users to select a start and end time for filtering transactions and provides buttons to generate the filter and close the modal.
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the card.
 * @param {function} props.onGenerate - The callback function to generate the filter with selected time frame.
 * @param {function} props.onClose - The callback function to close the modal.
 * @returns {JSX.Element} The rendered React component.
 */
function PageInputCard({ title, onGenerate, onClose }) {  
  const [startTime, setStartTime] = useState((() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    return startOfToday;
  })());
  const [endTime, setEndTime] = useState((() => {
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    return endOfToday;
  })());

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