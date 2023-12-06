import React from "react";
import Grid from '@mui/material/Grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import ItemButton from "./ItemButton";
import IconOnClickElement from "./IconOnClickElement";

import { DynamicButtonGrid } from './cashierContainers'

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
