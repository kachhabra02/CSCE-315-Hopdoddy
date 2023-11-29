import React from "react";
// import Button from '@mui/material/Button';
import ItemButton from "./ItemButton";
import { Stack, Button } from "@mui/material";
// import ButtonGroup from '@mui/material/ButtonGroup';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { DynamicButtonGrid } from './cashierContainers'

function CategoryList({categories, clickHandler, selected}) {
    var categoryButtons = categories.map((item) => (
        <ItemButton
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
        // <div className="CategoryList">
        //     <h2>This is the CategoryList</h2>
        //     <ul>
        //         {categoryButtons}
        //     </ul>
        // </div>

        <DynamicButtonGrid shouldScroll={true}>
            {categoryButtons}
        </DynamicButtonGrid>
    );
}

export default CategoryList;
