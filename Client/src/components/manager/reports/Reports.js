import { Button, Card, CardActions, CardContent, Box, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import React, { useState } from 'react';

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
                        <WSTReportInput />
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <HistoryReportInput />
                        <UsageReportInput />
                    </Stack>
                </Stack>
            </LocalizationProvider>
        </Box>
    )
}

const makeReportInput = (title, needsStart, needsEnd, destination) =>
function ReportInput() {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
    };

    const handleEndTimeChange = (newValue) => {
        setEndTime(newValue);
    };

    const handleGenerate = () => {
        console.log('Button clicked with on report with title ' + title);
    };

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

const ExcessReportInput = makeReportInput('Excess Report', true, false, '/manager/excess');
const SalesReportInput = makeReportInput('Sales Report', true, true, '/manager/sales');
const WSTReportInput = makeReportInput('What Sells Together', false, false, '/manager/what-sells-together');
const HistoryReportInput = makeReportInput('Order History', true, true, '/manager/history');
const UsageReportInput = makeReportInput('Product Usage Report', true, true, '/manager/history');

export default Reports;