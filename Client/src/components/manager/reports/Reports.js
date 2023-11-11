import { Button, Card, CardActions, CardContent, Box, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import React, { useState } from 'react';
import { useNavigate, Route, useParams, Link } from 'react-router-dom';
import { ManagerGuard } from '../../../credentials/RouteGuards';

var pathIdToInputMap = {};

function Reports() {
    const { reportPathID } = useParams();

    const ReportInput = pathIdToInputMap[reportPathID] ?? (() => <>NotFound</>)

    return (
        <Box sx={{
            display: 'flex',          // Enable flex container
            flexDirection: 'column',  // Stack children vertically
            justifyContent: 'center', // Center children along the vertical axis
            alignItems: 'center',     // Center children along the horizontal axis
            height: '80vh',           // Set the height of the container (e.g., full viewport height)
        }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ReportInput />
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
                    component={Link} 
                    to='/manager'
                    children='Cancel'
                />
            </CardActions>
        </Card>
    );
}

function assignReportProperties(Report, title, pathID, needsStart, needsEnd) {
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
    pathIdToInputMap[pathID] = makeReportInput(Report);
}

const routeReport = (Report) => (
    <Route path={Report.routePath} element={<ManagerGuard> <Report /> </ManagerGuard>} />
);


export { assignReportProperties, routeReport };
export default Reports;