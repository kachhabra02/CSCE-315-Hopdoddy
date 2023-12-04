import React from "react";
import Stack from '@mui/material/Stack';
import ItemButton from "./ItemButton";

import { DynamicButtonGrid } from './cashierContainers'

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
