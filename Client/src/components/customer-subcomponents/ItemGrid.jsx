import React from "react";

import Grid from '@mui/material/Grid';

import ItemCard from "./ItemCard";

function ItemGrid({items, onUpdate, sx}) {
    return (
        <Grid container spacing={2} sx={sx} >{
            items?.map(item => (
                <Grid item >
                    <ItemCard item={item} onUpdate={onUpdate}/>
                </Grid>
            ))
        } </Grid>
    )
}

export default ItemGrid;