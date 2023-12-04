import React from "react";
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import ItemButton from "./ItemButton";

import { DynamicButtonGrid } from './cashierContainers'

function ItemList({items, clickHandler}) {
    var itemButtons = items.map((item) => 
        <Grid item>
            <ItemButton onClick={clickHandler(item)}>
                {item.item_name}
            </ItemButton>
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
