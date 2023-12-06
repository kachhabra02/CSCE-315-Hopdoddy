import React, {useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";

import useAPI from "../useAPI";
import ItemCard from "./ItemCard";

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
