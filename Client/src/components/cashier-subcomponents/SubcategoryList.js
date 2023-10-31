import React from "react";

function SubcatetgoryList({subcategories, clickHandler}) {
    const subcategoryButtons = subcategories.map((item) => <li><button onClick={clickHandler(item.sub_category)}>{item.sub_category}</button></li>);

    return (
        <div className="SubcategoryList">
            <h2>This is the SubcategoryList</h2>
            <ul>
                {/* <li>Test Regular</li>
                <li>Test Regenerative</li>
                <li>Test Specialty</li> */}
                {subcategoryButtons}
            </ul>
        </div>
    );
}

export default SubcatetgoryList;
