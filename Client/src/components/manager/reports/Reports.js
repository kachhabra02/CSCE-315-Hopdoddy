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
                <Stack direction='row' spacing={2}>
                    <SalesReportInput />
                    <ExcessReportInput />
                    <ExcessReportInput />
                </Stack>
            </LocalizationProvider>
        </Box>
    )
}

const reportTitle = (title) => (
    <Typography variant='h6' paddingBottom={3}>
        {title}
    </Typography>
);

function SalesReportInput() {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
    };

    const handleEndTimeChange = (newValue) => {
        setEndTime(newValue);
    };

    const handleButtonClick = () => {
        console.log('Button clicked with date time picker value:', startTime);
    };

    return (
        <Card>
            <CardContent>
                {reportTitle('Sales Report')}
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
                <Button onClick={handleButtonClick}>Generate</Button>
            </CardActions>
        </Card>
    );
}

function ExcessReportInput() {
    const [startTime, setStartTime] = useState(new Date());

    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
    };

    const handleButtonClick = () => {
        console.log('Button clicked with date time picker value:', startTime);
    };

    return (
        <Card>
            <CardContent>
                {reportTitle('Excess Report')}
                <DateTimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                    textField={(params) => <TextField {...params} />}
                />
            </CardContent>
            <CardActions>
                <Button onClick={handleButtonClick}>Generate</Button>
            </CardActions>
        </Card>
    );
}

export default Reports;