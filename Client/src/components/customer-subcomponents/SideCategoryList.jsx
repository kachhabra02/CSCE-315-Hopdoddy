import { useState, useEffect, useLayoutEffect } from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

import useAPI from "../useAPI";

function SideCategoryList({ categories, itemGetter, sx, subcategorySelector }) {
    const [expanded, setExpanded] = useState([true]);
    const [selected, setSelected] = useState([0, -1]);
    // console.log(expanded)

    return (
        <List sx={sx}> {
            categories.map((item, i) => (
              <>
                <ListItemButton onClick={() =>  {
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
              </>
            ))
        } </List>
    );
}

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
            : subcategories.map((item, i) => (
                <List sx={{pl: 4}} disablePadding>
                    <ListItemButton
                      selected={currSelected[0] === index && currSelected[1] === i}
                      onClick={() => {
                        setSelected([index, i]);
                        itemGetter(item.sub_category, category)();
                        subcategorySelector({category: category, subcategory: item.sub_category});
                      }}
                    >
                        <ListItemText primary={item.sub_category}/>
                    </ListItemButton>
                </List>
            ))
    )
}

export default SideCategoryList;
