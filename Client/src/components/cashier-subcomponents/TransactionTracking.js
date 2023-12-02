import React, { useEffect } from 'react';
import { useState } from 'react';

import { Box, Modal, Button, Card, CardContent, Stack, TextField, CardActions, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MUIDataTable from "mui-datatables";

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  timeout: 60000 // 30 second timeout
});

const title = 'Current Transactions';

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
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'orderHistoryReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function TransactionTracking() {
  const [data, setData] = useState(undefined);
  const [datetimeOpen, setDatetimeOpen] = React.useState(false);

  const [startTime, setStartTime] = useState(new Date(1920,0,1));
  const [endTime, setEndTime] = useState(new Date());
  
  useEffect(() => {
    getOrders(setData)
  }, []);

  const handleClose = () => {
    setDatetimeOpen(false);
  };

  const handleGenerate = () => {
    getOrders(startTime, endTime, setData);
  };

  return (
    <Box>
      <Button onClick={() => setDatetimeOpen(true)}>fdsa</Button>
      {data === undefined ? <CircularProgress /> :
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
            <PageInputCard title="Card Bro!" onGenerate={handleGenerate} handleClose={handleClose} />
          </LocalizationProvider>
        </Box>
      </Modal>
    </Box>
  );
}

function getOrders(callback) {
  API.get(`/transactions?startTime=${(new Date(2,3)).toISOString()}&endTime=${(new Date(2,3)).toISOString()}`)
    .then((res) => {
      if (res.status < 300) {
        console.log('Success');
        callback(res.data.map((item) => [
          item.trans_id, 
          (new Date(item.transaction_time)).toLocaleString(navigator.language),
          item.employee_id, item.total_price, item.item_names.join(', ')
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

function PageInputCard({ title, handleGenerate, handleClose }) {
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
              variant='outlined' 
              color='success' 
              onClick={handleGenerate}
              children='Generate'
            />
          </Box>
          <Button 
            variant='outlined' 
            color='error' 
            onClick={handleClose}
            children='Cancel'
          />
      </CardActions>
    </Card>
  );
}


export default TransactionTracking