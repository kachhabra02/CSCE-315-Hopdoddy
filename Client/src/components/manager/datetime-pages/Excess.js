import React from 'react'
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { registerDateTimePage } from './PageInput';

// import {useEffect, useState} from "react";
import axios from "axios";

const API = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api`,
    timeout: 10000 // 10 second timeout
});


function getExcessRport(startTime) {
    API.get(`/reports/excess?startTime=${startTime}`)
        .then((res) => {
            if (res.status < 300) {
                console.log(res.data);
                return res.data;
            }
            else {
                console.log(res.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function Excess() {
  const { startTime } = useParams();

  return (
    <Box>
      {Excess.title}<br/>
      {startTime.toLocaleUpperCase()}<br/>
      {getExcessRport(new Date(startTime).toISOString())}
    </Box>
  )
}

registerDateTimePage(
  Excess,
  'Excess Report',
  'excess',
  true, false
);

export default Excess