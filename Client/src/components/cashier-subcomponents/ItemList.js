import React from "react";

function ItemList({items}) {
    const itemButtons = items.map((item) => <li><button>{item.item_name}</button></li>);

    return (
        <div className="ItemList">
            <h2>This is the ItemList</h2>
            <ul>
                {/* <li>Test Classic</li>
                <li>Test Goodnight</li> */}
                {itemButtons}
            </ul>
        </div>
    );
}

export default ItemList;
