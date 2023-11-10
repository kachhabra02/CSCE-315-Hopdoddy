import { Button, Card, CardActions, CardContent, Container, Stack, TextField, Typography } from '@mui/material';

import React, { useState } from 'react';

function Reports() {
    return (
        <Container>
            <Typography variant='h3'>
                Report Generation
            </Typography>
            <Stack direction='row' spacing={2}>
                <ExcessReport />
                <ExcessReport />
                <ExcessReport />
            </Stack>
        </Container>
    )
}

function ExcessReport() {
    const [startTime, setStartTime] = useState('');
    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleButtonClick = () => {
        console.log('Button clicked with text field value:', startTime);
    };

    return (
        <Card>
            <CardContent>
                <TextField
                    label="Start Time"
                    variant="outlined"
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
            </CardContent>
            <CardActions>
                <Button onClick={handleButtonClick}>Generate</Button>
            </CardActions>
        </Card>
    );
}

// const makeCard = (onClick) => ({ children }) =>
//     <Card sx={{ minWidth: 275 }}>
//         <CardContent>{children}</CardContent>
//         <CardActions>
//             <Button onClick={onClick}>Generate</Button>
//         </CardActions>
//     </Card>

export default Reports;