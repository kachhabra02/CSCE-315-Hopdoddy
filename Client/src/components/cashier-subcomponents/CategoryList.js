import React from "react";

function CategoryList({categories, clickHandler}) {
    const categoryButtons = categories.map((item) => <li><button onClick={clickHandler(item.category)}>{item.category}</button></li>);
    
    if (categories.length == 0) {
        
    }

    return (
        <div className="CategoryList">
            <h2>This is the CategoryList</h2>
            <ul>
                {categoryButtons}
            </ul>
        </div>
    );
}

export default CategoryList;
