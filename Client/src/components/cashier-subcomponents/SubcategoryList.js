import React from "react";
import Button from '@mui/material/Button';

function SubcatetgoryList({subcategories, clickHandler, selected}) {
    // var subcategoryButtons = subcategories.map((item) => <li><button onClick={clickHandler(item.sub_category)}>{item.sub_category}</button></li>);
    var subcategoryButtons = subcategories.map((item) => (
        <Button 
          variant={(selected === item.sub_category) ? "contained": "outlined"} 
          disableElevation 
          onClick={clickHandler(item.sub_category)}
        >
            {item.sub_category}
        </Button>)
    );

    if (subcategories.length > 0 && subcategories[0].sub_category === "Error retrieving subcategories") {
        subcategoryButtons = [<li>{subcategories[0].sub_category}</li>]
    }

    return (
        <div className="SubcategoryList">
            <h2>This is the SubcategoryList</h2>
            <ul>
                {subcategoryButtons}
            </ul>
        </div>
    );
}

export default SubcatetgoryList;
