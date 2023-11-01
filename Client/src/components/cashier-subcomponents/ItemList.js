import React from "react";

function ItemList({items, clickHandler}) {
    var itemButtons = items.map((item) => <li><button onClick={clickHandler(item)}>{item.item_name}</button></li>);

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
