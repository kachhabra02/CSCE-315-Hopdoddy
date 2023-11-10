import React from "react";
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ItemButton from "./ItemButton";

function SubcatetgoryList({subcategories, clickHandler, selected}) {
    // var subcategoryButtons = subcategories.map((item) => <li><button onClick={clickHandler(item.sub_category)}>{item.sub_category}</button></li>);
    var subcategoryButtons = subcategories.map((item) => (
        // <Button 
        //   variant={(selected === item.sub_category) ? "contained": "outlined"} 
        //   disableElevation 
        //   onClick={clickHandler(item.sub_category)}
        // >
        //     {item.sub_category}
        // </Button>

        <ItemButton
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
        <div className="SubcategoryList">
            <h2>This is the SubcategoryList</h2>
            <Stack direction="row" spacing={1} justifyContent="center">
                {subcategoryButtons}
            </Stack>
        </div>
    );
}

export default SubcatetgoryList;
