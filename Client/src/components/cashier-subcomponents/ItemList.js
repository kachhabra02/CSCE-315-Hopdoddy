import React from "react";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ItemButton from "./ItemButton";
import IconOnClickElement from "./IconOnClickElement";

import { DynamicButtonGrid } from './cashierContainers'

/**
 * This module contains the ItemList component, which displays a list of items as buttons.
 * Each item can be clicked to add it to the cart. It also handles error cases when retrieving items.
 *
 * @module ItemList
 */

/**
 * Renders a list of items as buttons. Each item can be clicked to add it to the cart.
 * Handles error cases when retrieving items and displays an error message.
 *
 * @param {Object[]} items - The list of items to display as buttons.
 * @param {function} clickHandler - The function to handle item clicks.
 * @returns {JSX.Element} The rendered ItemList component.
 */
function ItemList({items, clickHandler}) {
    var itemButtons = items.map((item, index) => 
        <Grid item key={index}>
            <IconOnClickElement 
                Element={ItemButton} 
                onClick={clickHandler(item)} 
                duration={2000}
                icon={<AddCircleIcon color="success" sx={{fontSize: '2em'}} />}
                children={item.item_name}
            />
        </Grid>
    );

    if (items.length > 0 && items[0].item_name === "Error retrieving items") {
        itemButtons = [<li>{items[0].item_name}</li>]
    }

    return (
        <DynamicButtonGrid shouldScroll={false} sx={{ height: '100%', overflow: 'scroll' }}>
            {itemButtons}
        </DynamicButtonGrid>
    );
}

export default ItemList;
