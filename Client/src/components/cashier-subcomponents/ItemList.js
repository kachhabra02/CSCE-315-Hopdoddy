import React from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import ItemButton from "./ItemButton";

function ItemList({items, clickHandler}) {
    // var itemButtons = items.map((item) => <li><button onClick={clickHandler(item)}>{item.item_name}</button></li>);
    var itemButtons = items.map((item) => 
        // <Button 
        //   variant="outlined" 
        //   disableElevation 
        //   onClick={clickHandler(item)}
        //   sx={{
        //     // whiteSpace: "nowrap",
        //     // overflow: "hidden",
        //     // "text-overflow": "clip",
        //     maxHeight: "3.3em"
        //   }}
        // >
        //     {/* <span style={{overflow: "hidden", whiteSpace: "nowrap", "text-overflow": "ellipsis"}}>{item.item_name}</span> */}
        //     {item.item_name}
        // </Button>

        <ItemButton onClick={clickHandler(item)}>
            {item.item_name}
        </ItemButton>
    );

    if (items.length > 0 && items[0].item_name === "Error retrieving items") {
        itemButtons = [<li>{items[0].item_name}</li>]
    }

    return (
        <div className="ItemList">
            <h2>This is the ItemList</h2>
            <Stack direction="row" spacing={1} justifyContent="center">
                {itemButtons}
            </Stack>
        </div>
    );
}

export default ItemList;
