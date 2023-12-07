import React from "react";
import ItemButton from "./ItemButton";

import { DynamicButtonGrid } from './cashierContainers'

/**
 * Component for rendering a list of categories as buttons.
 * @module CategoryList
 */

/**
 * Component for rendering a list of categories as buttons.
 *
 * @param {Object[]} categories - An array of category objects.
 * @param {string} categories[].category - The name of the category.
 * @param {function} clickHandler - A callback function to handle category button clicks.
 * @param {string} selected - The selected category name.
 * @returns {React.Component} The CategoryList component.
 */
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
