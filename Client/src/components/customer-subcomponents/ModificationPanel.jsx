import React from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

function ModificationPanel({open, onClose, modifications}) {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{"min-width": 250}}>
                {/* {modifications} */}
            </DialogTitle>
        </Dialog>
    ); 
}

export default ModificationPanel
