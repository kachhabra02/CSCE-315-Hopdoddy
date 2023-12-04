import { Button, Card, CardActions, CardContent, Box, Stack, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StartIcon from '@mui/icons-material/Start';

import React, { useState } from 'react';
import { useNavigate, Route, useParams, Link } from 'react-router-dom';
import { ManagerGuard } from '../../../credentials/RouteGuards';
var pathIdToInputMap = {};

function PageInput() {
    const { inputPathID } = useParams();

    const PageInputCard = pathIdToInputMap[inputPathID] ?? (() => <>NotFound</>)

    return (
        <Box sx={{
            display: 'flex',          // Enable flex container
            flexDirection: 'column',  // Stack children vertically
            justifyContent: 'center', // Center children along the vertical axis
            alignItems: 'center',     // Center children along the horizontal axis
            height: '80vh',           // Set the height of the container (e.g., full viewport height)
        }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <PageInputCard />
            </LocalizationProvider>
        </Box>
    )
}

const makePageInputCard = ({ title, needsStart, needsEnd, pathRoot }) =>
function PageInputCard() {
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(new Date(new Date().toDateString()));
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
                        variant='contained' 
                        color='success' 
                        onClick={handleGenerate}
                        children={<StartIcon />}
                    />
                </Box>
                <Button 
                    variant='contained' 
                    color='error' 
                    component={Link} 
                    to='/manager'
                    children={<ExitToAppIcon />}
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
    pathIdToInputMap[pathID] = makePageInputCard(Report);
}

const routePageInput = (Report) => (
    <Route path={Report.routePath} element={<ManagerGuard> <Report /> </ManagerGuard>} />
);


export { assignReportProperties as registerDateTimePage, routePageInput };
export default PageInput;