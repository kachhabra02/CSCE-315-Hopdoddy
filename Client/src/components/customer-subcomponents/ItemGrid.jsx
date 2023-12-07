import React, { useLayoutEffect, useState } from "react";

import Grid from '@mui/material/Grid';

import ItemCard from "./ItemCard";

/**
 * This module provides a React component for displaying a grid of item cards. 
 * It adjusts the spacing between cards based on the container width and window size.
 * @module ItemGrid
 */

/**
 * @param {Object} props - Component props.
 * @param {Array} props.items - An array of item data to be displayed as cards.
 * @param {Function} props.onUpdate - Function to call when an update is needed - is drilled from App which forces a rerender of the NavBar and ShoppingCart.
 * @param {Object} props.sx - Additional styles to apply to the grid container.
 * @param {Function} props.modifier - Function to execute when an item card is clicked - is drilled to ItemCard.
 * @returns {React.Component} A grid of item cards with dynamic spacing.
 */
function ItemGrid({items, onUpdate, sx, modifier}) {
    const [spacing, setSpacing] = useState(0);
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    useLayoutEffect(() => {
        function updateSize() {
            const width = document.getElementById("ItemGrid").getBoundingClientRect().width - 16;
            setSize([window.innerWidth, window.innerHeight]);
            const whiteSpace = width % 416;
            const numCards = (width - whiteSpace) / 416;
            setSpacing(whiteSpace / numCards);
            // console.log(width)
        }
        var timeout = false;
        window.addEventListener('resize', () => {clearTimeout(timeout); setTimeout(updateSize, 250)});
        setTimeout(updateSize, 250);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <Grid container spacing={2} sx={{...sx, width: size[0] - 266}} id="ItemGrid">{
            items?.map((item, i) => (
                <Grid item key={i}>
                    <ItemCard item={item} onUpdate={onUpdate} width={400 + spacing} modifier={modifier}/>
                </Grid>
            ))
        } </Grid>
    )
}

export default ItemGrid;