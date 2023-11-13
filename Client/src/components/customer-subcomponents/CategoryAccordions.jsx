import React, { useEffect, useLayoutEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

import useAPI from "../useAPI";

function CategoryAccordions({categories}) {
    return categories.map((item) => (
        <Accordion>
            <AccordionSummary expandIcon={<MdExpandMore/>}>
                {item.category}
            </AccordionSummary>
            <AccordionDetails>
                <SubcategoryAccordions category={item.category}/>    
            </AccordionDetails>
        </Accordion>
    ));
}

function SubcategoryAccordions({category}) {
    const [{subcategories}, {getSubcategories}] = useAPI();

    useEffect(() => {
        getSubcategories(category)();
    }, [])
    
    // console.log(subcategories)
    return (
        subcategories == null
            ? <CircularProgress/>
            : subcategories.map(item => (<ItemAccordions category={category} subcategory={item.sub_category}/>))
    )
}

function ItemAccordions({category, subcategory}) {
    const [{items}, {getItems}] = useAPI();

    // useEffect(getItemsBySubcategory(subcategory, category), []);

    const itemLoader = (event, expanded) => {
        if (expanded) {
            getItems(subcategory, category)()
        }
    }

    return (
        <Accordion onChange={itemLoader}>
            <AccordionSummary expandIcon={<MdExpandMore/>}>
                {subcategory}
            </AccordionSummary>
            <AccordionDetails>
                {items === null
                    ? <CircularProgress/>
                    : items.map(item => (
                        <div>{item.item_name}</div>
                    ))
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default CategoryAccordions;
