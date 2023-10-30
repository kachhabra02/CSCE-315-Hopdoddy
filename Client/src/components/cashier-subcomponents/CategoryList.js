import React from "react";

function CategoryList(props) {
    const categoryButtons = props.categories.map((name) => <li><button>{name}</button></li>)

    return (
        <div className="CategoryList">
            <h2>This is the CategoryList</h2>
            <ul>
                {/* list items in here */}
                {/* <li>Test Burgers</li>
                <li>Test Fries</li>
                <li>Test Drinks</li> */}
                {categoryButtons}
            </ul>
        </div>
    );
}

export default CategoryList;
