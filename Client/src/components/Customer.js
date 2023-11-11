import React from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MdExpandMore } from "react-icons/md";

import useAPI from "./useAPI";

function Customer() {
    const [{categories, subcategories, items, currCategory, currSubcategory}, {getItems, getSubcategories}] = useAPI();

    const categoryAccordions = () => categories.map(item => (
        <Accordion>
            <AccordionSummary expandIcon={<MdExpandMore/>}>
                {item.category}
            </AccordionSummary>
            <AccordionDetails>
                Testing, Testing, 1 2 3...
            </AccordionDetails>
        </Accordion>
    ));

    return (
        <div className="Customer">
            {(categories === undefined) 
                ? <div>Loading...</div>
                : categoryAccordions()
            }
        </div>
    );
}

export default Customer;