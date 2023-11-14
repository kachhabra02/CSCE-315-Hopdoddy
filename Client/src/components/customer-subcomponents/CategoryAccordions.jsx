import React, {useEffect} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";

import useAPI from "../useAPI";
import ItemCard from "./ItemCard";

function CategoryAccordions({categories, updater}) {
    return categories.map((item) => (
        <Accordion>
            <AccordionSummary expandIcon={<MdExpandMore/>}>
                {item.category}
            </AccordionSummary>
            <AccordionDetails>
                <SubcategoryAccordions category={item.category} updater={updater}/>    
            </AccordionDetails>
        </Accordion>
    ));
}

function SubcategoryAccordions({category, updater}) {
    const [{subcategories}, {getSubcategories}] = useAPI();

    useEffect(() => {
        getSubcategories(category)();
    }, [])
    
    // console.log(subcategories)
    return (
        subcategories == null
            ? <CircularProgress/>
            : subcategories.map(item => (<ItemAccordions category={category} subcategory={item.sub_category} updater={updater}/>))
    )
}

function ItemAccordions({category, subcategory, updater}) {
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
                    : <Stack direction="row">
                        {items.map(item => <ItemCard item={item} updater={updater}/>)}
                      </Stack>
                }
            </AccordionDetails>
        </Accordion>
    )
}

export default CategoryAccordions;
