import React, { useLayoutEffect, useState } from "react";

import Grid from '@mui/material/Grid';

import ItemCard from "./ItemCard";

function ItemGrid({items, onUpdate, sx, id}) {
    const [spacing, setSpacing] = useState(2);

    useLayoutEffect(() => {
        const width = document.getElementById("ItemGrid").getBoundingClientRect().width - 16;
        const whiteSpace = width % 416
        const numCards = (width - whiteSpace) / 416
        // console.log(numCards)
        // setSpacing(whiteSpace / ((numCards + 1) * 8))
        setSpacing(whiteSpace / numCards)
        // console.log(spacing)
    })

    return (
        <Grid container spacing={2} sx={{...sx, "padding-right": 16, "padding-bottom": 16}} id="ItemGrid">{
            items?.map(item => (
                <Grid item >
                    <ItemCard item={item} onUpdate={onUpdate} width={400 + spacing}/>
                </Grid>
            ))
        } </Grid>
    )
}

export default ItemGrid;