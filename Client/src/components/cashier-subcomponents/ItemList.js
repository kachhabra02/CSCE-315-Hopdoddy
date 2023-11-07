import React from "react";
import Button from '@mui/material/Button';

function ItemList({items, clickHandler}) {
    // var itemButtons = items.map((item) => <li><button onClick={clickHandler(item)}>{item.item_name}</button></li>);
    var itemButtons = items.map((item) => <Button variant="outlined" disableElevation onClick={clickHandler(item)}>{item.item_name}</Button>);

    if (items.length > 0 && items[0].item_name === "Error retrieving items") {
        itemButtons = [<li>{items[0].item_name}</li>]
    }

    return (
        <div className="ItemList">
            <h2>This is the ItemList</h2>
            <ul>
                {itemButtons}
            </ul>
        </div>
    );
}

export default ItemList;
