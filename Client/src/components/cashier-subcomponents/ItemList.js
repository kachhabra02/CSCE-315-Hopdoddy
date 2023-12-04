import React from "react";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ItemButton from "./ItemButton";
import IconOnClickElement from "./IconOnClickElement";

import { DynamicButtonGrid } from './cashierContainers'

function ItemList({items, clickHandler}) {
    var itemButtons = items.map((item, index) => 
        <Grid item key={index}>
            <IconOnClickElement Element={ItemButton} onClick={clickHandler(item)} icon={<AddCircleIcon color="success" sx={{fontSize: '2em'}} />}>
                {item.item_name}
            </IconOnClickElement>
        </Grid>
    );

    if (items.length > 0 && items[0].item_name === "Error retrieving items") {
        itemButtons = [<li>{items[0].item_name}</li>]
    }

    return (
        <DynamicButtonGrid shouldScroll={false}>
            {itemButtons}
        </DynamicButtonGrid>
    );
}

export default ItemList;
