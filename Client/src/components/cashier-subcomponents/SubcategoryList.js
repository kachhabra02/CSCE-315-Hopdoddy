import React from "react";

function SubcatetgoryList({subcategories, clickHandler}) {
    var subcategoryButtons = subcategories.map((item) => <li><button onClick={clickHandler(item.sub_category)}>{item.sub_category}</button></li>);

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
