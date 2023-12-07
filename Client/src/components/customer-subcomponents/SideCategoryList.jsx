import { useState, useEffect } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

import useAPI from "../useAPI";

/**
 * This module provides a React component for displaying a list of categories and their subcategories.
 * Users can expand and collapse categories to view subcategories.
 * @module SideCategoryList
 */

/**
 * @param {Object} props - Component props.
 * @param {Array} props.categories - List of category objects with 'category' property.
 * @param {Function} props.itemGetter - Function to retrieve items based on selected subcategory and category.
 * @param {Object} props.sx - Additional styles for the component.
 * @param {Function} props.subcategorySelector - Function to select a subcategory.
 * @returns {React.Component} A list of expandable categories with subcategories.
 */
function SideCategoryList({ categories, itemGetter, sx, subcategorySelector }) {
    const [expanded, setExpanded] = useState([true]);
    const [selected, setSelected] = useState([0, -1]);
    // console.log(expanded)

    return (
        <List sx={sx}> {
            categories.map((item, i) => (
              <li key={i}>
                <ListItemButton key={i} onClick={() =>  {
                    let temp = [...expanded];
                    temp[i] = !temp[i];
                    setExpanded(temp);
                  }}
                >
                    <ListItemText primary={item.category} />
                    {expanded[i] ? <MdExpandLess/> : <MdExpandMore/>}
                </ListItemButton>
                <Collapse timeout="auto" in={expanded[i]}>
                    <SideSubcategoryList category={item.category} currSelected={selected} index={i} 
                      setSelected={setSelected} itemGetter={itemGetter} subcategorySelector={subcategorySelector}
                    />
                </Collapse>
              </li>
            ))
        } </List>
    );
}

/**
 * This function provides a React component for displaying a list of subcategories for a given category.
 * Users can select a subcategory, triggering item retrieval and subcategory selection.
 *
 * @param {Object} props - Component props.
 * @param {string} props.category - The current category.
 * @param {Array} props.currSelected - The currently selected category and subcategory indices.
 * @param {number} props.index - The index of the current category.
 * @param {Function} props.setSelected - Function to set the selected category and subcategory.
 * @param {Function} props.itemGetter - Function to retrieve items based on selected subcategory and category.
 * @param {Function} props.subcategorySelector - Function to select a subcategory.
 * @returns {React.Component} A list of subcategories for the specified category.
 */
function SideSubcategoryList({category, currSelected, index, setSelected, itemGetter, subcategorySelector}) {
    const [{subcategories}, {getSubcategories}] = useAPI();
    useEffect(getSubcategories(category), []);

    if (subcategories?.length > 0 && currSelected[1] === -1 && currSelected[0] === index) {
        setSelected([0, 0]);
        itemGetter(subcategories[0]?.sub_category, category)()
        subcategorySelector({category: category, subcategory: subcategories[0]?.sub_category})
    }

    return (
        subcategories == null
            ? <CircularProgress/>
            : <List sx={{pl: 4}}> {subcategories.map((item, i) => (
                    <ListItemButton
                      key={i}
                      selected={currSelected[0] === index && currSelected[1] === i}
                      onClick={() => {
                        setSelected([index, i]);
                        itemGetter(item.sub_category, category)();
                        subcategorySelector({category: category, subcategory: item.sub_category});
                      }}
                    >
                        <ListItemText primary={item.sub_category}/>
                    </ListItemButton>
              ))} </List>
    )
}

export default SideCategoryList;
