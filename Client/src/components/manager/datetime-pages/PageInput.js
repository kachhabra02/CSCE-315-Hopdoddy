/**
 * This module provides the PageInput component and utility functions for dynamically generating
 * date/time input pages for various reports in the application.
 * It includes a mechanism to register reports and their properties and to create routes for them.
 * @module PageInput
 */

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

/**
 * Renders the PageInput component which dynamically displays a card for date/time input.
 * This component uses a mapping to determine which input form to render based on the URL parameter.
 * 
 * @returns {React.Component} A component that provides a UI for date/time input.
 */
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

/**
 * Factory function to create a closure for a PageInputCard component.
 * The created component includes date/time pickers based on the specified needs.
 * 
 * @param {Object} props - Properties including title, pathRoot, and flags for needing start and end times.
 * @returns {Function} A function returning the PageInputCard component.
 */
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

/**
 * Assigns properties to a report and creates a corresponding PageInputCard.
 * It maps the report to its path ID for routing purposes.
 * 
 * @param {Object} Report - The report component.
 * @param {string} title - Title of the report.
 * @param {string} pathID - Path ID of the report.
 * @param {boolean} needsStart - Flag indicating if the start time is needed.
 * @param {boolean} needsEnd - Flag indicating if the end time is needed.
 */
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

/**
 * Wraps the Report component with a route and ManagerGuard.
 * 
 * @param {React.Component} Report - The report component to be routed.
 * @returns {React.Component} A Route element wrapping the report component.
 */
const routePageInput = (Report) => (
    <Route path={Report.routePath} element={<ManagerGuard> <Report /> </ManagerGuard>} />
);


export { assignReportProperties as registerDateTimePage, routePageInput };
export default PageInput;