import React, {useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";

import useAPI from "../useAPI";
import ItemCard from "./ItemCard";

/**
 * This module provides components for rendering a nested accordion structure in a React application. 
 * It includes CategoryAccordions, SubcategoryAccordions, and ItemAccordions components, 
 * which display hierarchical data in an expandable format.
 * @deprecated Use SideCategoryList instead
 * @module CategoryAccordions
 */

/**
 * Renders accordions for each category. Each accordion contains subcategory accordions.
 * 
 * @deprecated Use SideCategoryList instead.
 * @param {Object} props - Component props.
 * @param {Array} props.categories - Array of category objects.
 * @param {Function} props.onUpdate - Function to call when an update is needed - is drilled from App which forces a rerender of the NavBar and ShoppingCart.
 * @returns {React.Component} A list of category accordions.
 */
function CategoryAccordions({categories, onUpdate}) {
  return categories.map((item, i) => (
    <Accordion defaultExpanded={i === 0}>
      <AccordionSummary expandIcon={<MdExpandMore/>}>
        {item.category}
      </AccordionSummary>
      <AccordionDetails>
        <SubcategoryAccordions category={item.category} onUpdate={onUpdate} defaultExpanded={i === 0}/>   
      </AccordionDetails>
    </Accordion>
  ));
}

/**
 * Renders accordions for each subcategory under a category. Each accordion contains item accordions.
 * 
 * @deprecated Use SideCategoryList instead.
 * @param {Object} props - Component props.
 * @param {string} props.category - The parent category name.
 * @param {Function} props.onUpdate - Function to call when an update is needed.
 * @param {boolean} props.defaultExpanded - Determines if the accordion is expanded by default.
 * @returns {React.Component} A list of subcategory accordions.
 */
function SubcategoryAccordions({category, onUpdate, defaultExpanded}) {
  const [{subcategories}, {getSubcategories}] = useAPI();

  useEffect(getSubcategories(category), [])
  
  // console.log(subcategories)
  return (
    subcategories == null
      ? <CircularProgress/>
      : subcategories.map((item, i) => (
        <ItemAccordions 
          category={category} 
          subcategory={item.sub_category} 
          onUpdate={onUpdate} 
          defaultExpanded={defaultExpanded && i === 0}
        />
        ))
  )
}

/**
 * Renders an accordion for a subcategory containing items.
 * 
 * @deprecated Use SideCategoryList instead.
 * @param {Object} props - Component props.
 * @param {string} props.category - The parent category name.
 * @param {string} props.subcategory - The subcategory name.
 * @param {Function} props.onUpdate - Function to call when an update is needed.
 * @param {boolean} props.defaultExpanded - Determines if the accordion is expanded by default.
 * @returns {React.Component} An accordion of items within a subcategory.
 */
function ItemAccordions({category, subcategory, onUpdate, defaultExpanded}) {
  const [{items}, {getItems}] = useAPI();

  useEffect(() => {defaultExpanded && itemLoader(null, true)}, []);

  const itemLoader = (event, expanded) => {
    if (expanded) {
      getItems(subcategory, category)()
    }
  }

  return (
    <Accordion onChange={itemLoader} defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<MdExpandMore/>}>
        {subcategory}
      </AccordionSummary>
      <AccordionDetails>
        {items === null
          ? <CircularProgress/>
          : <Stack direction="row" spacing={2} sx={{overflow: "auto"}}>
            {items.map(item => <ItemCard item={item} onUpdate={onUpdate}/>)}
            </Stack>
        }
      </AccordionDetails>
    </Accordion>
  )
}

export default CategoryAccordions;
