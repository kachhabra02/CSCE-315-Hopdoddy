import { useState, useEffect } from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import { MdExpandMore, MdExpandLess } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

import useAPI from "../useAPI";

function SideCategoryList({ categories, sx }) {
    const [expanded, setExpanded] = useState([true]);
    const [selected, setSelected] = useState([0, 0]);
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
                    <SideSubcategoryList category={item.category} currSelected={selected} index={i} setSelected={setSelected}/>
                </Collapse>
              </>
            ))
        } </List>
    );
}

function SideSubcategoryList({category, currSelected, index, setSelected}) {
    const [{subcategories}, {getSubcategories}] = useAPI();
    useEffect(getSubcategories(category), []);

    return (
        subcategories == null
            ? <CircularProgress/>
            : subcategories.map((item, i) => (
                <List sx={{pl: 4}}>
                    <ListItemButton
                      selected={currSelected[0] === index && currSelected[1] === i}
                      onClick={() => setSelected([index, i])}
                    >
                        <ListItemText primary={item.sub_category}/>
                    </ListItemButton>
                </List>
            ))
    )
}

export default SideCategoryList;
