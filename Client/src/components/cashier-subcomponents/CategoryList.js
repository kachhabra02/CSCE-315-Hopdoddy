import React from "react";
import Button from '@mui/material/Button';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

function CategoryList({categories, clickHandler, selected}) {
    // var categoryButtons = categories.map((item) => <li><button onClick={clickHandler(item.category)}>{item.category}</button></li>);
    var categoryButtons = categories.map((item) => (
        <Button 
          variant={(selected === item.category) ? "contained": "outlined"} 
          disableElevation 
          onClick={clickHandler(item.category)}
        //   sx={{bgcolor: "#500000", 
        //        color: "green",
        //        "&:hover": {
        //             bgcolor: "yellow"
        //        }
        //     }}
        >
            {item.category}
        </Button>)
    );
    
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

        <div exclusive className="CategoryList">
            {categoryButtons}
        </div>
    );
}

export default CategoryList;
