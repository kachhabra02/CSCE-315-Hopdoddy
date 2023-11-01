import React from "react";

function CategoryList({categories, clickHandler}) {
    // console.log(props.categories);
    const categoryButtons = categories.map((item) => <li><button onClick={clickHandler(item.category)}>{item.category}</button></li>);

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
