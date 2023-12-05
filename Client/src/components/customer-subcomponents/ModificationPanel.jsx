import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from "@mui/material/Button";
import { MdShoppingCartCheckout } from "react-icons/md";

// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';

import ItemButton from "../cashier-subcomponents/ItemButton";

function ModificationPanel({open, onClose, modifications, item, onUpdate}) {
    // console.log(modifications)
    const [modsSelected, setModsSelected] = useState([false]);
    const selectButton = (i) => () => {
        let temp = [...modsSelected];
        temp[i] = !temp[i];
        setModsSelected(temp);
    }
    const onExit = () => {
        setModsSelected([false]);
        onClose();
    }
    
    function sendToCart() {
        const orders = JSON.parse(localStorage.getItem("cart"));
        // const orders = localStorage.getItem("cart");
        // console.log(orders);
        const newOrders = (orders?.concat([item]) ?? [item]).concat(
            modifications.map((item, i) => modsSelected[i] && item)
            .filter(item => item)
        );
        // console.log(newOrders)
        onUpdate({});
        localStorage.setItem("cart", JSON.stringify(newOrders));
    }

    return (
        <Dialog open={open} onClose={onExit}>
            <DialogTitle sx={{"min-width": 250}}>
                Modifications for {item.item_name}
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} sx={{width: 464}}> { 
                    modifications?.map((item, i) => (
                        <Grid item>
                            <ItemButton width={100} height={50} fontSize={15} selected={modsSelected[i]} onClick={selectButton(i)}>
                                {item.item_name}
                            </ItemButton>
                        </Grid>
                    ))
                } </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={sendToCart} endIcon={<MdShoppingCartCheckout/>}>Send to cart</Button>
            </DialogActions>
        </Dialog>
    ); 
}

export default ModificationPanel
