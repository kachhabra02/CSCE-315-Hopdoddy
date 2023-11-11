import { Button, Card, CardActions, CardContent, Box, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import React, { useState } from 'react';
import { useNavigate, Route } from 'react-router-dom';
import Excess from './Excess';
import Sales from './Sales';
import Restock from './Restock';
import WhatSellsTogether from './WhatSellsTogether';
import History from './History';
import Usage from './Usage';
import { ManagerGuard } from '../../../credentials/RouteGuards';

function Reports() {
    return (
        <Box sx={{
            display: 'flex',          // Enable flex container
            flexDirection: 'column',  // Stack children vertically
            justifyContent: 'center', // Center children along the vertical axis
            alignItems: 'center',     // Center children along the horizontal axis
            height: '80vh',           // Set the height of the container (e.g., full viewport height)
        }}>
            <Typography variant='h3' padding={3}>
                Report Generation
            </Typography>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={2}>
                    <Stack direction='row' spacing={2}>
                        <SalesReportInput />
                        <ExcessReportInput />
                        <RestockReportInput />
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <WSTReportInput />
                        <HistoryReportInput />
                        <UsageReportInput />
                    </Stack>
                </Stack>
            </LocalizationProvider>
        </Box>
    )
}

const makeReportInput = ({ title, needsStart, needsEnd, pathRoot }) =>
function ReportInput() {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(new Date(1920,0,1));
    const [endTime, setEndTime] = useState(new Date());

    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
    };

    const handleEndTimeChange = (newValue) => {
        setEndTime(newValue);
    };

    const handleGenerate = (
        needsStart && needsEnd ? () => {
            navigate(pathRoot + `/${startTime}/${endTime}`);
        } : needsStart ? () => {
            navigate(pathRoot + `/${startTime}`);
        } : needsEnd ? () => {
            navigate(pathRoot + `/${endTime}`);
        } : () => {
            navigate(pathRoot);
        }
    );

    return (
        <Card sx={{ minWidth: 345 }}>
            <CardContent>
                <Typography variant='h6' paddingBottom={3}>
                    {title}
                </Typography>
                <Stack spacing={4}>
                    {needsStart && <DateTimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        textField={(params) => <TextField {...params} />}
                    />}
                    {needsEnd && <DateTimePicker
                        label="End Time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        textField={(params) => <TextField {...params} />}
                    />}
                </Stack>
            </CardContent>
            <CardActions>
                <Button variant='contained' onClick={handleGenerate}>Generate</Button>
            </CardActions>
        </Card>
    );
}

const ExcessReportInput = makeReportInput(Excess);
const SalesReportInput = makeReportInput(Sales);
const RestockReportInput = makeReportInput(Restock);
const WSTReportInput = makeReportInput(WhatSellsTogether);
const HistoryReportInput = makeReportInput(History);
const UsageReportInput = makeReportInput(Usage);

export function assignReportProperties(Report, title, pathID, needsStart, needsEnd) {
    Report.title = title;
    Report.needsStart = needsStart;
    Report.needsEnd = needsEnd;
    Report.pathID = pathID;
    Report.pathRoot = `/manager/${pathID}`;
    Report.routePath = Report.pathRoot;
    if (Report.needsStart) {
        Report.routePath += '/:startTime'
    }
    if (Report.needsEnd) {
        Report.routePath += '/:endTime'
    }
}

const routeReport = (Report) => (
    <Route path={Report.routePath} element={<ManagerGuard> <Report /> </ManagerGuard>} />
);

export { routeReport, Sales, Excess, Restock, WhatSellsTogether, History, Usage };
export default Reports;