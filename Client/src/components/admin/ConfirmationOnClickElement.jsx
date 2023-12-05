import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';

const ConfirmationOnClickElement = ({ Element, title='Confirm Action', body, children, onClick, ...subProps }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    if (subProps.onClick) {
      subProps.onClick();
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    if (onClick) {
      onClick();
    }
    else {
      console.log("no onClick for target element");
    }
  };

  return (
    <>
      <Element
        children={children}
        onClick={handleOpen}
        {...subProps}
      />
      <Modal
        open={open}
        aria-labelledby="confirm-modal"
        aria-describedby="confirm-modal-confirms-things"
      >
        <Box sx={{
          display: 'flex',          // Enable flex container
          flexDirection: 'column',  // Stack children vertically
          justifyContent: 'center', // Center children along the vertical axis
          alignItems: 'center',     // Center children along the horizontal axis
          height: '80vh',           // Set the height of the container (e.g., full viewport height)
        }}>
          <Card>
            <CardContent>
              <Typography variant='h6'>
                {title}
              </Typography>
              {body && <Typography variant='body'>
                {body}
              </Typography>}
            </CardContent>
            <CardActions>
              <Box sx={{ textAlign: 'left', flexGrow: 1, paddingRight: 1 }}>    
                <Button 
                  variant='contained' 
                  color='primary' 
                  onClick={handleConfirm}
                  children={'PROCEED'}
                />
              </Box>
              <Button 
                variant='contained' 
                color='inherit' 
                onClick={handleCancel}
                children={'CANCEL'}
              />
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationOnClickElement;