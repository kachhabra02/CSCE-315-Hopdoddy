import React from "react";
import Stack from '@mui/material/Stack';
import ItemButton from "./ItemButton";

import { DynamicButtonGrid } from './cashierContainers'

/**
 * SubcatetgoryList Module
 *
 * This module provides the SubcatetgoryList component, which renders a list of subcategories as buttons.
 * Each subcategory can be clicked to filter items. It also handles error cases when retrieving subcategories
 * and displays an error message.
 *
 * @module SubcatetgoryList
 */

/**
 * Renders a list of subcategories as buttons. Each subcategory can be clicked to filter items.
 * Handles error cases when retrieving subcategories and displays an error message.
 *
 * @param {Object[]} subcategories - The list of subcategories to display as buttons.
 * @param {function} clickHandler - The function to handle subcategory clicks.
 * @param {string} selected - The currently selected subcategory.
 * @returns {JSX.Element} The rendered SubcatetgoryList component.
 */
function SubcatetgoryList({subcategories, clickHandler, selected}) {
    var subcategoryButtons = subcategories.map((item, index) => (
        <ItemButton key={index}
          selected={selected === item.sub_category}
          onClick={clickHandler(item.sub_category)}
        >
            {item.sub_category}
        </ItemButton>
    ));

    if (subcategories.length > 0 && subcategories[0].sub_category === "Error retrieving subcategories") {
        subcategoryButtons = [<li>{subcategories[0].sub_category}</li>]
    }

    return (
        <DynamicButtonGrid shouldScroll={true}>
            <Stack direction="row" spacing={1} justifyContent="center">
                {subcategoryButtons}
            </Stack>
        </DynamicButtonGrid>
    );
}

export default SubcatetgoryList;
