import React from "react";
import ItemButton from "./ItemButton";

import { DynamicButtonGrid } from './cashierContainers'

function CategoryList({categories, clickHandler, selected}) {
    var categoryButtons = categories.map((item, index) => (
        <ItemButton key={index}
          selected={selected === item.category}
          onClick={clickHandler(item.category)}
        >
            {item.category}
        </ItemButton>
    ));
    
    if (categories.length > 0 && categories[0].category === "Error retrieving categories") {
        categoryButtons = [<li>{categories[0].category}</li>]
    }

    return (
        <DynamicButtonGrid shouldScroll={true}>
            {categoryButtons}
        </DynamicButtonGrid>
    );
}

export default CategoryList;
