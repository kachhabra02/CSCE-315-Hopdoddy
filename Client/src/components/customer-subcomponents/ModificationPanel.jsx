import React from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ItemButton from "../cashier-subcomponents/ItemButton";

function ModificationPanel({open, onClose, modifications}) {
    console.log(modifications)

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{"min-width": 250}}>
                Modifications
            </DialogTitle>
            <DialogContent dividers>
                <List> { modifications?.map((item) => (
                    <ListItem>
                        <ItemButton width={100} height={50} fontSize={15}>{item.item_name}</ItemButton>
                    </ListItem>
                ))} </List>
            </DialogContent>
        </Dialog>
    ); 
}

export default ModificationPanel
