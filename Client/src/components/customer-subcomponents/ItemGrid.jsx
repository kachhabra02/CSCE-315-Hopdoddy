import React, { useLayoutEffect, useState } from "react";

import Grid from '@mui/material/Grid';

import ItemCard from "./ItemCard";

function ItemGrid({items, onUpdate, sx, id}) {
    const [spacing, setSpacing] = useState(0);
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            const width = document.getElementById("ItemGrid").getBoundingClientRect().width - 16;
            setSize([window.innerWidth, window.innerHeight]);
            const whiteSpace = width % 416;
            const numCards = (width - whiteSpace) / 416;
            setSpacing(whiteSpace / numCards);
        }
        var timeout = false;
        window.addEventListener('resize', () => {clearTimeout(timeout); setTimeout(updateSize, 250)});
        setTimeout(updateSize, 250);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <Grid container spacing={2} sx={{...sx, "padding-right": 16, "padding-bottom": 16, width: window.innerWidth - 266}} id="ItemGrid">{
            items?.map(item => (
                <Grid item >
                    <ItemCard item={item} onUpdate={onUpdate} width={400 + spacing}/>
                </Grid>
            ))
        } </Grid>
    )
}

export default ItemGrid;