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
  timeout: 30000 // 30 second timeout
});


const title = 'Popular Pairs Report';

const columns = [
    {
      name: 'First Item ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'First Item Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Second Item ID',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Second Item Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'Number of Orders',
      options: {
        filter: true,
        sort: true
      }
    }
];

const options = {
  filterType: 'multiselect',
  selectableRows: 'none',
  downloadOptions: { filename: 'popularPairsReport.csv', serparator: ',' },
  draggableColumns: { enabled: true },
  resizableColumns: true
};


function WhatSellsTogether() {
  const { startTime, endTime } = useParams();
  const [data, setData] = useState(undefined);
    
  API.get(`/reports/popular-pairs?startTime=${(new Date(startTime)).toISOString()}&endTime=${(new Date(endTime)).toISOString()}`)
    .then((res) => {
      if (res.status < 300) {
        console.log('Success');
        setData(res.data.map((item) => [item.first_item_id, item.first_item_name, item.second_item_id,
                                        item.second_item_name, item.num_orders]));
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
  WhatSellsTogether,
  'What Sells Together',
  'what-sells-together',
  true, true
);

export default WhatSellsTogether